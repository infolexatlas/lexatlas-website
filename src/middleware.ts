import { NextResponse, NextRequest } from 'next/server';

const IGNORE_PREFIXES = [
  '/_next',
  '/static',
  '/assets',
  '/api',
  '/favicon',
  '/robots.txt',
  '/sitemap.xml',
];

function normalizeKitsPath(pathname: string): string | null {
  if (!pathname.startsWith('/kits/')) return null;

  // Collapse multiple slashes in the path portion
  let collapsed = pathname.replace(/\/+/g, '/');

  // Extract slug part after /kits/
  const rest = collapsed.slice('/kits/'.length);

  // Remove trailing slashes from slug (but not removing /kits/ root itself)
  let slug = rest.replace(/\/+$/, '');

  // Lowercase and convert underscores to hyphens; collapse multiple hyphens; trim hyphens
  slug = slug
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Special legacy alias: FRA-6CAN -> fra-can
  if (slug === 'fra-6can') slug = 'fra-can';

  const normalizedPath = '/kits/' + slug;
  return normalizedPath;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore non-app/static routes explicitly
  if (IGNORE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  if (!pathname.startsWith('/kits/')) return NextResponse.next();

  const normalized = normalizeKitsPath(pathname);
  // Compare against pathname without trailing slashes
  const current = pathname.replace(/\/+$/, '');

  if (normalized && normalized !== current) {
    const url = req.nextUrl.clone();
    url.pathname = normalized;
    // Query string is preserved by cloning. Fragments are not available server-side.
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Restrict to app paths, but we still guard inside to only act on /kits/
  matcher: ['/((?!_next|static|assets|api|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)'],
};


