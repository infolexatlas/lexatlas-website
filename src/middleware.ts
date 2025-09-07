// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Canonicalization ONLY for /kits routes
  if (pathname.startsWith('/kits')) {
    // … keep your kits normalization logic here …
  }

  // Everything else: pass through
  return NextResponse.next();
}

// CRITICAL: do NOT match static assets, images, or files with extensions
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|wp-sitemap.xml|api|images|fonts|assets|.*\\..*).*)',
  ],
};
