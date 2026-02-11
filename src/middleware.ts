import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client for middleware
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    // Get session from cookies
    const session = request.cookies.get('sb-auth-token')?.value

    if (!session) {
      // No session - redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // TODO: Validate session token with Supabase
    // For now, if cookie exists, allow access
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
