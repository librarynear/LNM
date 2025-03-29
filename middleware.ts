import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { getUser, createClient } from '@/utils/supabase/server';
import { getUserType } from './utils/supabase/getUserType';

export async function middleware(request: NextRequest) {
  // Update session to keep auth state in sync
  const supabaseResponse = await updateSession(request);

  // Get the current user
  const user = await getUser();
  if (!user) return supabaseResponse; // No user, let updateSession handle the redirection

  // Check if the user is a librarian and profile completion status
  const supabase = await createClient();
  const { data: librarian, error } = await supabase
    .from('Librarian')
    .select('profileCompleted')
    .eq('email', user.email) // Assuming email is unique across tables
    .single();
  const userType = await getUserType();
  if (error) {
    console.error('Error fetching librarian profile:', error);
    return supabaseResponse;
  }

  // Redirect librarian to onboarding if profile is incomplete
  if (librarian && !librarian.profileCompleted && request.nextUrl.pathname !== '/onboarding') {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  if(userType.type !== "admin" && request.nextUrl.pathname === '/admin/dashboard') {
    return NextResponse.redirect(new URL('/', request.url));
  }


  return supabaseResponse;
}

// Exclude API routes and static assets from middleware
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
