import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // avoids edge-specific surprises

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      uptime: process.uptime(),
      ts: new Date().toISOString(),
    },
    { status: 200 }
  );
}


