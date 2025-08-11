import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimiter';
import fs from 'fs/promises';
import path from 'path';

const bookingSchema = z.object({
  destinationId: z.string().min(1),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().optional(),
  gender: z.string().min(1),
  ageRange: z.string().min(1)
});

const dataDir = path.join(process.cwd(), '.data');
const filePath = path.join(dataDir, 'bookings.json');

async function ensureFile() {
  try { await fs.mkdir(dataDir, { recursive: true }); } catch {}
  try { await fs.access(filePath); } catch { await fs.writeFile(filePath, '[]', 'utf8'); }
}

interface BookingRecord extends z.infer<typeof bookingSchema> { id: string; createdAt: string; userAgent?: string; archived?: boolean; }

async function getBookings(): Promise<BookingRecord[]> {
  await ensureFile();
  const raw = await fs.readFile(filePath, 'utf8');
  return (JSON.parse(raw) as BookingRecord[]).map(r => ({ ...r, archived: r.archived ?? false }));
}
async function addBooking(b: Omit<BookingRecord,'id'|'createdAt'> & { userAgent?: string }): Promise<BookingRecord> {
  const all = await getBookings();
  const record: BookingRecord = { ...b, id: crypto.randomUUID(), createdAt: new Date().toISOString(), archived: false };
  all.push(record);
  await fs.writeFile(filePath, JSON.stringify(all, null, 2));
  return record;
}
function toCSV(rows: BookingRecord[]) {
  const headers: (keyof BookingRecord)[] = ['id','destinationId','name','email','phone','gender','ageRange','createdAt','archived'];
  const escape = (v: unknown) => '"'+String(v ?? '').replace(/"/g,'""')+'"';
  const lines = [headers.join(',')].concat(
    rows.map(r => headers.map(h => escape(r[h])).join(','))
  );
  return lines.join('\n');
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local';
    if (!rateLimit(`booking:${ip}`, 5, 0.5)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    const json = await req.json();
    const parsed = bookingSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 422 });
    const saved = await addBooking({ ...parsed.data, userAgent: req.headers.get('user-agent') || undefined });
    return NextResponse.json({ success: true, booking: saved }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const authToken = process.env.CONTACT_ADMIN_TOKEN; // reuse same admin token
  const url = new URL(req.url);
  const tokenQuery = url.searchParams.get('token');
  const authHeader = req.headers.get('authorization');
  const bearer = authHeader?.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : null;
  const token = bearer || tokenQuery;
  const isAuthed = !authToken || (!!token && token === authToken);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = Math.min(100, parseInt(url.searchParams.get('pageSize') || '50', 10));
  const q = (url.searchParams.get('q') || '').toLowerCase();
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const destination = url.searchParams.get('destination');
  const includeArchived = url.searchParams.get('includeArchived') === 'true';
  const all = await getBookings();
  const filtered = all.filter(r => {
    if (!includeArchived && r.archived) return false;
    if (destination && r.destinationId !== destination) return false;
    if (q) {
      const blob = (r.name + ' ' + r.email + ' ' + r.destinationId).toLowerCase();
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
    const csv = toCSV(filtered);
    return new NextResponse(csv, { status: 200, headers: { 'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="bookings.csv"' }});
  }
  if (!isAuthed) return NextResponse.json({ count: total });
  return NextResponse.json({ bookings: pageItems, page, pageSize, total });
}

export async function PATCH(req: NextRequest) {
  const authToken = process.env.CONTACT_ADMIN_TOKEN;
  const url = new URL(req.url);
  const tokenQuery = url.searchParams.get('token');
  const authHeader = req.headers.get('authorization');
  const bearer = authHeader?.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : null;
  const token = bearer || tokenQuery;
  const isAuthed = !authToken || (!!token && token === authToken);
  if (!isAuthed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = url.searchParams.get('id');
  const archivedParam = url.searchParams.get('archived');
  if (!id || archivedParam == null) return NextResponse.json({ error: 'Missing id or archived param' }, { status: 400 });
  const archived = archivedParam === 'true';
  const all = await getBookings();
  const idx = all.findIndex(r => r.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  all[idx].archived = archived;
  await fs.writeFile(filePath, JSON.stringify(all, null, 2));
  return NextResponse.json({ success: true });
}
