import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/kits/')) return NextResponse.next();

  const [, , raw = ''] = pathname.split('/');
  if (!raw) return NextResponse.next();

  const normalized = raw
    .toLowerCase()
    .replaceAll('_', '-')
    .replace(/[–—]/g, '-')
    .replace(/(^[a-z]{3})-6([a-z]{3}$)/i, '$1-$2');

  if (normalized !== raw) {
    const url = req.nextUrl.clone();
    url.pathname = `/kits/${normalized}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/kits/:path*'],
};


