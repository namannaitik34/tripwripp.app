import { NextRequest, NextResponse } from 'next/server';

// Middleware to enforce auth for CSV exports hitting legacy endpoints directly.
export function middleware(req: NextRequest) {
  // Log request information in development to help debug
  if (process.env.NODE_ENV === 'development') {
    console.log(`API Request: ${req.method} ${req.nextUrl.pathname}`);
  }

  const { pathname, searchParams } = req.nextUrl;
  const isDataCsv = (pathname === '/api/contact' || pathname === '/api/bookings') && searchParams.get('format') === 'csv';
  
  // Add CORS headers for API routes
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Configure this to your domains in production
  response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return response;
  }

  // Authentication check for CSV exports
  if (isDataCsv) {
    try {
      const header = req.headers.get('authorization');
      const bearer = header?.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : null;
      const queryToken = searchParams.get('token');
      const adminToken = process.env.CONTACT_ADMIN_TOKEN;
      
      // Debug info for token check (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.log(`Auth check: Bearer ${bearer ? 'present' : 'missing'}, Query token ${queryToken ? 'present' : 'missing'}`);
      }
      
      const supplied = bearer || queryToken;
      
      // Skip token check in development if no token is set
      if (process.env.NODE_ENV === 'production' && adminToken && (!supplied || supplied !== adminToken)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json({ error: 'Server error during authentication' }, { status: 500 });
    }
  }
  
  return response;
}

// Update the matcher to handle OPTIONS requests too
export const config = {
  matcher: ['/api/:path*']
};
