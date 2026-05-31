import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '✅ SET' : '❌ MISSING',
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  })
}
