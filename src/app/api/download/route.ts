import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { parsePair, isValidCode } from '@/lib/countries'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country1 = searchParams.get('country1')
    const country2 = searchParams.get('country2')
    const pair = searchParams.get('pair')
    const sessionId = searchParams.get('session_id')

    // Validate parameters
    if (!country1 || !country2 || !isValidCode(country1) || !isValidCode(country2)) {
      return NextResponse.json(
        { error: 'Valid country codes are required' },
        { status: 400 }
      )
    }

    if (country1 === country2) {
      return NextResponse.json(
        { error: 'Countries must be different' },
        { status: 400 }
      )
    }

    // Parse and validate the pair
    const pairData = parsePair(pair || `${country1}-${country2}`)
    if (!pairData) {
      return NextResponse.json(
        { error: 'Invalid country pair' },
        { status: 400 }
      )
    }

    // Check if user has paid (multiple methods)
    const cookieStore = cookies()
    const hasPaidCookie = cookieStore.get('x-paid')?.value === '1'
    const referer = request.headers.get('referer')
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Enhanced anti-hotlink check
    if (referer && !referer.startsWith(baseUrl)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      )
    }

    // Verify payment: check cookie OR verify session with Stripe
    let hasValidPayment = hasPaidCookie
    
    if (!hasValidPayment && sessionId) {
      try {
        const verifyResponse = await fetch(`${baseUrl}/api/verify-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            sessionId, 
            country1, 
            country2, 
            pair: pairData.pair 
          }),
        })
        hasValidPayment = verifyResponse.ok
      } catch (error) {
        console.error('Session verification failed:', error)
      }
    }

    if (!hasValidPayment) {
      return NextResponse.json(
        { error: 'Payment required' },
        { status: 403 }
      )
    }

    // Try to serve the actual PDF file first
    try {
      const fs = require('fs')
      const path = require('path')
      const fileName = `${pairData.pair}.pdf`
      const filePath = path.join(process.cwd(), 'public', 'downloads', 'marriage', fileName)
      
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath)
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="LexAtlas-Marriage-${pairData.pair}.pdf"`,
            'Cache-Control': 'no-cache',
          },
        })
      }
    } catch (error) {
      console.log('PDF file not found, generating placeholder')
    }

    // Generate a placeholder PDF content
    const placeholderContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Marriage Kit - ${pairData.pair} - Placeholder) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000204 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
297
%%EOF`

    return new NextResponse(placeholderContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="LexAtlas-Marriage-${pairData.pair}.pdf"`,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
