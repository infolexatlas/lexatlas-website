/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replaceAll('_', '-')
    .replace(/[–—]/g, '-')
    .replace(/(^[a-z]{3})-6([a-z]{3}$)/i, '$1-$2');
}

export async function GET(request: Request, context: any) {
  const raw = context?.params?.slug || '';
  if (!raw) return new Response('Not Found', { status: 404 });

  const normalized = normalizeSlug(raw);
  if (normalized !== raw) {
    const url = new URL(request.url);
    url.pathname = `/kits/${normalized}`;
    return NextResponse.redirect(url, 308);
  }

  // No redirect; let it be not found to mirror current behavior
  return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}


