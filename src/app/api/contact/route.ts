import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { z } from 'zod';

// Define validation schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' })
});

export async function POST(req: Request) {
  try {
    // Get API key from environment
    const apiKey = process.env.CONTACT_BOOKING_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, message: 'API key not configured.' }, { status: 500 });
    }
    // Enable CORS
    const origin = req.headers.get('origin') || '';

    // Parse the request body
    const body = await req.json();

    // Validate the data
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      // Return validation errors
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { fullName, email, subject, message } = result.data;

    // Send contact details to Web3Forms
    const web3formsRes = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_key: apiKey,
        name: fullName,
        email,
        subject,
        message
      })
    });

    const web3formsData = await web3formsRes.json();

    if (web3formsRes.ok && web3formsData.success) {
      return NextResponse.json(
        { success: true, message: "Your message has been received. We'll get back to you soon!" },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);

    // Return a friendly error message
    return NextResponse.json(
      { success: false, message: 'We encountered an issue processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin') || '';

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400' // 24 hours
    }
  });
}

// Helper functions for contact form submissions
interface Submission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  archived: boolean;
}

// Mock function to get submissions
async function getSubmissions(includeArchived: boolean = false): Promise<Submission[]> {
  // In a real app, this would fetch from a database
  // For now, return mock data
  return []; // Return empty array for demo purposes
}

// Mock function to set archived status
async function setArchived(id: string, archived: boolean): Promise<boolean> {
  // In a real app, this would update a database record
  // For now, just return success
  return true;
}

// Helper function to convert submissions to CSV
function toCSV(submissions: Submission[]): string {
  const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Created At', 'Archived'];
  const rows = submissions.map(s => [
    s.id,
    `"${s.name.replace(/"/g, '""')}"`,
    `"${s.email.replace(/"/g, '""')}"`,
    `"${s.subject.replace(/"/g, '""')}"`,
    `"${s.message.replace(/"/g, '""')}"`,
    s.createdAt,
    s.archived ? 'Yes' : 'No'
  ]);
  
  return [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');
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
    return new NextResponse(csv, { 
      status: 200, 
      headers: { 
        'Content-Type': 'text/csv; charset=utf-8', 
        'Content-Disposition': 'attachment; filename="contact_submissions.csv"' 
      } 
    });
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

