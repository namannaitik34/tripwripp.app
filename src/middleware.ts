import { NextRequest, NextResponse } from 'next/server';

// Middleware to enforce auth for CSV exports hitting legacy endpoints directly.
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const isDataCsv = (pathname === '/api/contact' || pathname === '/api/bookings') && searchParams.get('format') === 'csv';
  if (isDataCsv) {
    const header = req.headers.get('authorization');
    const bearer = header?.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : null;
    const queryToken = searchParams.get('token');
    const adminToken = process.env.CONTACT_ADMIN_TOKEN;
    const supplied = bearer || queryToken;
    if (adminToken && (!supplied || supplied !== adminToken)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
};
