import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimiter';
import fs from 'fs/promises';
import path from 'path';

// Web booking form (regular packages/destinations)
const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  destination: z.string().min(2, { message: 'Destination is required.' }),
  travelDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Please enter a valid date.'
  }),
  adults: z.number().int().min(1, { message: 'At least 1 adult is required.' }).or(z.string().transform(val => parseInt(val, 10))),
  children: z.number().int().min(0).or(z.string().transform(val => parseInt(val, 10))).optional(),
  specialRequests: z.string().optional(),
});

// Live trek booking form (North ABC, Khumai, etc.)
const liveBookingSchema = z.object({
  destinationId: z.string().min(1, { message: 'Destination is required.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(80),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  gender: z.string().min(1, { message: 'Gender is required.' }),
  ageRange: z.string().min(1, { message: 'Age range is required.' })
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

export async function POST(req: Request) {
  try {
    console.log('Booking request received');
    
    // Enable CORS
    const origin = req.headers.get('origin') || '';

    // Parse the request body
    const body = await req.json();
    console.log('Request body:', body);

    // Try regular booking schema first
    const regularResult = bookingFormSchema.safeParse(body);
    const liveResult = !regularResult.success ? liveBookingSchema.safeParse(body) : null;

    if (!regularResult.success && (!liveResult || !liveResult.success)) {
      const errors = regularResult.success ? {} : regularResult.error.flatten().fieldErrors;
      const liveErrors = liveResult && !liveResult.success ? liveResult.error.flatten().fieldErrors : {};
      const mergedErrors = { ...errors, ...liveErrors };
      console.log('Validation errors:', mergedErrors);
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: mergedErrors
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true'
          }
        }
      );
    }

    // Regular web booking flow
    if (regularResult.success) {
      const { fullName, email, phone, destination, travelDate, adults, children, specialRequests } = regularResult.data;
      console.log('Booking request (regular):', { fullName, email, phone, destination, travelDate, adults, children, specialRequests });

      return NextResponse.json(
        { 
          success: true, 
          message: "Your booking request has been received! We'll contact you soon to confirm details.",
          bookingId: `BK-${Date.now().toString().slice(-8)}`
        },
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
    }

    // Live trek booking flow (North ABC, Khumai, etc.)
    if (liveResult && liveResult.success) {
      const { destinationId, name, email, phone, gender, ageRange } = liveResult.data;
      console.log('Booking request (live):', { destinationId, name, email, phone, gender, ageRange });

      return NextResponse.json(
        {
          success: true,
          message: "Your booking request has been received! We'll contact you soon to confirm details.",
          bookingId: `BK-${Date.now().toString().slice(-8)}`
        },
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
    }
  } catch (error) {
    console.error('Booking form error:', error);

    // Return a friendly error message
    return NextResponse.json(
      { 
        success: false, 
        message: 'We encountered an issue processing your booking. Please try again later.' 
      },
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

// GET handler for admin access to bookings
export async function GET(req: NextRequest) {
  const authToken = process.env.CONTACT_ADMIN_TOKEN;
  const url = new URL(req.url);
  const tokenQuery = url.searchParams.get('token');
  const authHeader = req.headers.get('authorization');
  const bearer = authHeader?.toLowerCase().startsWith('bearer ') ? authHeader.slice(7).trim() : null;
  const token = bearer || tokenQuery;
  const isAuthed = !authToken || (!!token && token === authToken);
  
  if (!isAuthed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // In a real app, fetch bookings from database
  // For now, return mock data
  return NextResponse.json({
    bookings: [],
    total: 0,
    page: 1,
    pageSize: 10
  });
}
