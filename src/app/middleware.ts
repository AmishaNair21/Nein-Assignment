import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // Add console.log for debugging
  console.log('Token:', token);
  console.log('Path:', request.nextUrl.pathname);

  if (request.nextUrl.pathname.startsWith('/bookings')) {
    if (!token) {
      console.log('No token found');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Add more detailed error handling
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined');
        return NextResponse.redirect(new URL('/login', request.url));
      }

      jwt.verify(token.value, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/bookings/:path*', '/api/bookings/:path*']
};
