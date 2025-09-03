import { NextResponse } from 'next/server'
import { getEmailEnv } from '@/lib/emailEnv'
import { IS_DEV } from '@/lib/env'

export const revalidate = 0

export async function GET() {
  // Only allow in development
  if (!IS_DEV) {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 404 }
    )
  }

  return NextResponse.json(getEmailEnv())
}
