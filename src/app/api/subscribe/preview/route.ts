import { NextResponse } from 'next/server'
import { FREE_GUIDE_SUBJECT, renderLeadMagnetEmailHTML } from '@/emails/leadmagnet-simple'

export const dynamic = 'force-dynamic'

export async function GET() {
  const html = renderLeadMagnetEmailHTML()
  return NextResponse.json({
    subject: FREE_GUIDE_SUBJECT,
    hasMarker: html.includes('LEXATLAS:FREEGUIDE:v3'),
    preview: html.slice(0, 400)
  })
}
