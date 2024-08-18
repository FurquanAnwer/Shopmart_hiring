// app/middleware.ts
import { NextResponse } from 'next/server';
import { supabase } from './lib/supabaseClient';

export async function middleware(req) {
  const session = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect('/auth/signin');
  }

  return NextResponse.next();
}

// Only run the middleware on specific routes
export const config = {
  matcher: '/products/:path*',
};
