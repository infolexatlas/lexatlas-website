import { NextResponse, NextRequest } from 'next/server';

// Normalize "kits" slug:
// - lowercase
// - replace "_" with "-"
// - collapse "-6" between country codes (e.g., FRA-6CAN -> fra-can)
// - leave invalid patterns alone (pass through)
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/kits/')) return;

  const [, , raw = ''] = pathname.split('/'); // ["", "kits", "<slug>"]
  if (!raw) return;

  const norm = raw
    .toLowerCase()
    .replaceAll('_', '-')
    .replace(/(^[a-z]{3})-6([a-z]{3}$)/i, '$1-$2'); // FRA-6CAN -> fra-can

  if (norm !== raw.toLowerCase()) {
    const url = req.nextUrl.clone();
    url.pathname = `/kits/${norm}`;
    // 308 permanent preserves query automatically in NextResponse.redirect
    return NextResponse.redirect(url, 308);
  }
}

export const config = {
  matcher: ['/kits/:path*'],
};


