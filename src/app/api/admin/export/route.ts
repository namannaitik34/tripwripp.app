import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, toCSV as contactToCSV } from '@/lib/contactStore';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), '.data');
const bookingsFile = path.join(dataDir, 'bookings.json');

interface BookingRecord { id: string; destinationId: string; name: string; email: string; phone?: string; gender: string; ageRange: string; createdAt: string; userAgent?: string; archived?: boolean; }

async function getBookings(): Promise<BookingRecord[]> {
  try {
    const raw = await fs.readFile(bookingsFile, 'utf8');
    return JSON.parse(raw || '[]');
  } catch { return []; }
}

function bookingsToCSV(rows: BookingRecord[]) {
  const headers: (keyof BookingRecord)[] = ['id','destinationId','name','email','phone','gender','ageRange','createdAt','archived'];
  const escape = (v: unknown) => '"'+String(v ?? '').replace(/"/g,'""')+'"';
  const lines = [headers.join(',')].concat(rows.map(r => headers.map(h => escape(r[h])).join(',')));
  return lines.join('\n');
}

const querySchema = z.object({
  type: z.enum(['contact','bookings','all']),
  archived: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const adminToken = process.env.CONTACT_ADMIN_TOKEN;
  const header = req.headers.get('authorization');
  const bearer = header?.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : null;
  if (adminToken && (!bearer || bearer !== adminToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const url = new URL(req.url);
  const parse = querySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parse.success) return NextResponse.json({ error: 'Bad query', issues: parse.error.issues }, { status: 400 });
  const { type, archived } = parse.data;
  const includeArchived = archived === 'true';
  if (type === 'contact') {
    const contacts = await getSubmissions(includeArchived);
    const csv = contactToCSV(contacts);
    return new NextResponse(csv, { status:200, headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="contacts.csv"'} });
  }
  if (type === 'bookings') {
    const bookings = await getBookings();
    const filtered = includeArchived? bookings : bookings.filter(b=>!b.archived);
    const csv = bookingsToCSV(filtered);
    return new NextResponse(csv, { status:200, headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="bookings.csv"'} });
  }
  // all
  const contacts = await getSubmissions(includeArchived);
  const bookings = await getBookings();
  const combined = '=== CONTACTS ===\n' + contactToCSV(contacts) + '\n\n=== BOOKINGS ===\n' + bookingsToCSV(includeArchived? bookings : bookings.filter(b=>!b.archived));
  return new NextResponse(combined, { status:200, headers:{'Content-Type':'text/plain; charset=utf-8','Content-Disposition':'attachment; filename="combined.txt"'} });
}
