import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/app/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Update the session without restricting access
  await updateSession(request);
  return NextResponse.next(); // Allow all requests to proceed
}

export const config = {
  matcher: '/:path*', // Match all routes without restrictions
};