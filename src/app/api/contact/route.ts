import { NextRequest, NextResponse } from 'next/server';
import { addSubmission, getSubmissions, toCSV, setArchived } from '@/lib/contactStore';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimiter';

const submissionSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(2).max(120),
  message: z.string().min(5).max(2000)
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local';
    if (!rateLimit(`contact:${ip}`, 5, 0.5)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
    }
    const data = await req.json();
    const parsed = submissionSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 422 });
    }
    const { name, email, subject, message } = parsed.data;
    const userAgent = req.headers.get('user-agent') || undefined;
    const saved = await addSubmission({ name, email, subject, message, userAgent });
    return NextResponse.json({ success: true, submission: saved }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const authToken = process.env.CONTACT_ADMIN_TOKEN;
  const url = new URL(req.url);
  const tokenQuery = url.searchParams.get('token');
  const authHeader = req.headers.get('authorization');
  const bearer = authHeader?.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : null;
  const token = bearer || tokenQuery; // header takes precedence
  const isAuthed = !authToken || (!!token && token === authToken);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = Math.min(100, parseInt(url.searchParams.get('pageSize') || '50', 10));
  const q = (url.searchParams.get('q') || '').toLowerCase();
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const includeArchived = url.searchParams.get('includeArchived') === 'true';
  const all = await getSubmissions(!!includeArchived && isAuthed); // only allow archived view if authed
  const filtered = all.filter(r => {
    if (q) {
      const blob = (r.name + ' ' + r.email + ' ' + r.subject + ' ' + r.message).toLowerCase();
      if (!blob.includes(q)) return false;
    }
    if (from && new Date(r.createdAt) < new Date(from)) return false;
    if (to && new Date(r.createdAt) > new Date(to + 'T23:59:59.999Z')) return false;
    return true;
  });
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);
  if (url.searchParams.get('format') === 'csv') {
    if (!isAuthed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const csv = toCSV(filtered); // export filtered set
    return new NextResponse(csv, { status: 200, headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="contact_submissions.csv"' } });
  }
  if (!isAuthed) return NextResponse.json({ count: total });
  return NextResponse.json({ submissions: pageItems, page, pageSize, total });
}

// PATCH /api/contact?id=...&archived=true (admin only)
export async function PATCH(req: NextRequest) {
  const authToken = process.env.CONTACT_ADMIN_TOKEN;
  const url = new URL(req.url);
  const tokenQuery = url.searchParams.get('token');
  const authHeader = req.headers.get('authorization');
  const bearer = authHeader?.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : null;
  const token = bearer || tokenQuery;
  const isAuthed = !authToken || (token && token === authToken);
  if (!isAuthed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = url.searchParams.get('id');
  const archivedParam = url.searchParams.get('archived');
  if (!id || archivedParam == null) return NextResponse.json({ error: 'Missing id or archived param' }, { status: 400 });
  const archived = archivedParam === 'true';
  const ok = await setArchived(id, archived);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}

