import { NextRequest, NextResponse } from 'next/server'
import { parsePair, getCountryName } from '@/lib/countries'
import { getPriceForPair } from '@/lib/pricing'

export async function GET(
  request: NextRequest,
  { params }: { params: { pair: string } }
) {
  try {
    const pairData = parsePair(params.pair)
    
    if (!pairData) {
      return NextResponse.json(
        { error: 'Invalid country pair' },
        { status: 400 }
      )
    }

    const country1Name = getCountryName(pairData.country1)
    const country2Name = getCountryName(pairData.country2)
    
    if (!country1Name || !country2Name) {
      return NextResponse.json(
        { error: 'Invalid country codes' },
        { status: 400 }
      )
    }

    const priceInfo = getPriceForPair(params.pair)

    // Generate a simple HTML placeholder that can be converted to PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Marriage Kit: ${country1Name} & ${country2Name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 40px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 16px; color: #666; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
            .price { font-size: 20px; color: #2563eb; font-weight: bold; }
            .coming-soon { background: #fef3c7; padding: 20px; border-radius: 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Marriage Kit: ${country1Name} & ${country2Name}</div>
            <div class="subtitle">Comprehensive International Marriage Guide</div>
            <div class="price">Price: $${priceInfo.price} ${priceInfo.currency}</div>
          </div>
          
          <div class="coming-soon">
            <div class="section-title">🚧 Coming Soon</div>
            <p>This comprehensive marriage guide for ${country1Name} and ${country2Name} is currently being prepared by our legal experts.</p>
            <p>It will include:</p>
            <ul>
              <li>Step-by-step marriage procedures</li>
              <li>Required documents and certificates</li>
              <li>Translation and legalization requirements</li>
              <li>Embassy/consulate procedures</li>
              <li>Processing timelines and fees</li>
              <li>Common pitfalls and expert tips</li>
            </ul>
          </div>
          
          <div class="section">
            <div class="section-title">About This Kit</div>
            <p>This guide will provide comprehensive legal guidance for international marriage between ${country1Name} and ${country2Name}, ensuring you have all the information needed for a smooth process.</p>
          </div>
          
          <div class="section">
            <div class="section-title">Contact</div>
            <p>For questions about this guide or to request early access, please contact us at support@lexatlas.com</p>
          </div>
        </body>
      </html>
    `

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="marriage-kit-${params.pair}.html"`,
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
