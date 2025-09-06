import { NextResponse, type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '');
  const inferred = `${req.nextUrl.protocol}//${req.nextUrl.host}`.replace(/\/$/, '');
  const base = fromEnv || inferred;

  const body = `User-agent: *\nDisallow: /checkout\nSitemap: ${base}/sitemap.xml\n`;
  return new NextResponse(body, {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}


