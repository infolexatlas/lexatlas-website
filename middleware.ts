import { NextResponse, NextRequest } from 'next/server';

// Normalize "kits" slug:
// - lowercase
// - replace "_" with "-"
// - normalize en/em dashes to hyphen
// - collapse "-6" between country codes (e.g., FRA-6CAN -> fra-can)
// - leave invalid patterns alone (pass through)
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/kits/')) return NextResponse.next();

  const [, , raw = ''] = pathname.split('/'); // ["", "kits", "<slug>"]
  if (!raw) {
    const res = NextResponse.next();
    res.headers.set('x-middleware-kits', '1');
    return res;
  }

  const normalized = raw
    .toLowerCase()
    .replaceAll('_', '-')
    .replace(/[–—]/g, '-')
    .replace(/(^[a-z]{3})-6([a-z]{3}$)/i, '$1-$2'); // FRA-6CAN -> fra-can

  if (normalized !== raw) {
    const url = req.nextUrl.clone();
    url.pathname = `/kits/${normalized}`;
    const res = NextResponse.redirect(url, 308);
    res.headers.set('x-middleware-kits', '1');
    return res;
  }

  const res = NextResponse.next();
  res.headers.set('x-middleware-kits', '1');
  return res;
}

export const config = {
  // Match only kits routes explicitly to avoid touching assets or other pages
  matcher: ['/kits/:path*'],
};


