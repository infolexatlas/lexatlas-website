import { NextRequest, NextResponse } from 'next/server'
import { normalizeSlug } from '@/lib/kits-slug'
import { kitsDetail } from '@/lib/kits-detail-data'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      )
    }

    // Normalize the slug
    const normalizedSlug = normalizeSlug(slug)
    if (!normalizedSlug) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      )
    }

    // Check if the kit exists in our data
    const kit = kitsDetail[normalizedSlug]
    if (!kit) {
      return NextResponse.json(
        { error: 'Kit not found' },
        { status: 404 }
      )
    }

    // Try to serve the general sample PDF file
    try {
      const fs = require('fs')
      const path = require('path')
      const fileName = 'LEXATLAS-global-sample.pdf'
      const filePath = path.join(process.cwd(), 'public', 'downloads', 'samples', fileName)
      
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath)
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="LEXATLAS-Global-Sample.pdf"`,
            'Cache-Control': 'no-cache',
          },
        })
      }
    } catch (error) {
      console.log('Sample PDF file not found, generating placeholder')
    }

    // Generate a placeholder sample PDF content
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
/Length 150
>>
stream
BT
/F1 16 Tf
72 720 Td
(LexAtlas Marriage Kit Sample) Tj
0 -50 Td
/F1 12 Tf
(This is a sample preview of our marriage kits.) Tj
0 -30 Td
(Get the complete guide for just ${kit.priceEUR}€) Tj
0 -50 Td
(Visit lexatlas.com for full kits) Tj
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
403
%%EOF`

    return new NextResponse(placeholderContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="LEXATLAS-Global-Sample.pdf"`,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Sample download error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}