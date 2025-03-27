import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  // Routes that are accessible without login
  const publicRoutes = ['/login', '/sign-up', '/auth'];

  if (!user && !publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    // No user and route is not public → Redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
}
