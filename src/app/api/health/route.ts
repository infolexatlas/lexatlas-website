import { NextResponse } from 'next/server';
import { COMMIT_SHA, BRANCH, BUILD_TIME } from '@/lib/version';

export const runtime = 'nodejs'; // avoids edge-specific surprises

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      commit: COMMIT_SHA,
      branch: BRANCH,
      buildTime: BUILD_TIME,
      uptime: process.uptime(),
      ts: new Date().toISOString(),
    },
    { status: 200 }
  );
}


