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

// Union type for booking records (supports both regular and live bookings)
type BookingRecord = (z.infer<typeof bookingFormSchema> | z.infer<typeof liveBookingSchema>) & { 
  id: string; 
  createdAt: string; 
  userAgent?: string; 
  archived?: boolean; 
};

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
    // API key for Web3Forms
    const apiKey = "484bf319-a4e3-49eb-ae7c-eec4c4865ca2";
    
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

      // Try to send booking email via Web3Forms (non-blocking)
      try {
        const web3Payload = {
          access_key: apiKey,
          name: fullName,
          email: email,
          subject: `New Booking Request - ${destination}`,
          message: `Booking Request:\n\nDestination: ${destination}\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nTravel Date: ${travelDate}\nAdults: ${adults}\nChildren: ${children || 0}\nSpecial Requests: ${specialRequests || 'None'}\n\nSubmitted at: ${new Date().toLocaleString()}`
        };

        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(web3Payload)
        });
        
        const web3Result = await web3Res.json();
        if (!web3Result.success) {
          console.error('Web3Forms error:', web3Result);
        } else {
          console.log('Email sent successfully to:', email);
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue anyway - don't fail the booking
      }

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

      // Try to send booking email via Web3Forms (non-blocking)
      try {
        const web3Payload = {
          access_key: apiKey,
          name: name,
          email: email,
          subject: `New Live Trek Booking - ${destinationId}`,
          message: `Live Trek Booking Request:\n\nDestination: ${destinationId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nGender: ${gender}\nAge Range: ${ageRange}\n\nSubmitted at: ${new Date().toLocaleString()}`
        };

        console.log('Sending to Web3Forms:', JSON.stringify(web3Payload, null, 2));

        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(web3Payload)
        });
        
        console.log('Web3Forms status:', web3Res.status);
        const responseText = await web3Res.text();
        console.log('Web3Forms response (first 500 chars):', responseText.substring(0, 500));
        
        let web3Result;
        try {
          web3Result = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse Web3Forms response as JSON');
          throw parseError;
        }
        
        if (!web3Result.success) {
          console.error('Web3Forms error:', web3Result);
        } else {
          console.log('✓ Email sent successfully!');
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue anyway - don't fail the booking
      }

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
    console.error('Error details:', error instanceof Error ? error.message : String(error));

    // Return a friendly error message with more details
    return NextResponse.json(
      { 
        success: false, 
        message: 'We encountered an issue processing your booking. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
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
