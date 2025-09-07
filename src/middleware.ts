// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

const PREFERRED_HOST = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'lex-atlas.com';

const KIT_ALIASES: Record<string, string> = {
  'fra_6can': 'fra-can',
  'fra-6can': 'fra-can',
  'fra-can': 'fra-can',
  'fra—usa': 'fra-usa',
  'fra_usa': 'fra-usa',
  'fra-usa': 'fra-usa',
  'fra—can': 'fra-can',
  'fra_can': 'fra-can',
  'FRA-6CAN': 'fra-can',
  'FRA_6CAN': 'fra-can',
  'FRA—USA': 'fra-usa',
  'FRA_USA': 'fra-usa',
  'FRA-USA': 'fra-usa',
};

function canonicalizeKitSlug(input: string) {
  const key = input.trim().toLowerCase();
  const normalized = key.replace(/[_\u2012-\u2015]/g, '-');
  return KIT_ALIASES[normalized] || normalized;
}

export function middleware(req: NextRequest) {
  const url = new URL(req.url);

  // 1) Force preferred host (apex vs www)
  if (url.hostname !== PREFERRED_HOST) {
    url.hostname = PREFERRED_HOST;
    return NextResponse.redirect(url, { status: 308 });
  }

  // 2) Canonicalize /kits slugs
  if (url.pathname.startsWith('/kits/')) {
    const rest = url.pathname.slice('/kits/'.length);
    if (rest.length > 0) {
      const rawSlug = rest.replace(/\/+$/, '');
      const canonical = canonicalizeKitSlug(rawSlug);
      const desiredPath = `/kits/${canonical}`;
      if (`/kits/${rawSlug}` !== desiredPath) {
        url.pathname = desiredPath;
        return NextResponse.redirect(url, { status: 308 });
      }
    }
  }

  return NextResponse.next();
}

// CRITICAL: do NOT match static assets, images, or files with extensions
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|wp-sitemap.xml|api|images|fonts|assets|.*\\..*).*)',
  ],
};
