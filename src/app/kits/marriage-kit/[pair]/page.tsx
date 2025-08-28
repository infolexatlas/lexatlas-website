import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { PriceButtons } from '@/components/PriceButtons'
import { DocDownload } from '@/components/DocDownload'
import { ALL_PAIRS, parsePair, getCountryName } from '@/lib/countries'
import { getProduct } from '@/data/products'
import { getPriceForPair, hasSpecificPricing } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'
import { getKitContent } from '@/lib/kits'

interface PageProps {
  params: { pair: string }
}

export async function generateStaticParams() {
  return ALL_PAIRS.map((pair) => ({
    pair,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pairData = parsePair(params.pair)
  
  if (!pairData) {
    return {
      title: 'Country Pair Not Found | LexAtlas',
    }
  }

  const country1Name = getCountryName(pairData.country1)
  const country2Name = getCountryName(pairData.country2)
  
  const title = `Marriage Kit: ${country1Name} & ${country2Name} | LexAtlas`
  const description = `Get comprehensive guidance for international marriage between ${country1Name} and ${country2Name}. Expert-built PDF guide with step-by-step instructions, document requirements, and processing timelines.`

  // Check for custom OG images
  const customOgSvg = `/og/marriage/${params.pair.toLowerCase()}.svg`
  const customOgPng = `/og/marriage/${params.pair.toLowerCase()}.png`
  const defaultOgSvg = '/og/marriage/default.svg'
  const defaultOgPng = '/og/marriage/default.png'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: customOgSvg,
          width: 1200,
          height: 630,
          alt: `Marriage Kit: ${country1Name} & ${country2Name}`,
        },
        {
          url: customOgPng,
          width: 1200,
          height: 630,
          alt: `Marriage Kit: ${country1Name} & ${country2Name}`,
        },
        {
          url: defaultOgSvg,
          width: 1200,
          height: 630,
          alt: `Marriage Kit: ${country1Name} & ${country2Name}`,
        },
        {
          url: defaultOgPng,
          width: 1200,
          height: 630,
          alt: `Marriage Kit: ${country1Name} & ${country2Name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

async function getMdxContent(pair: string) {
  // For now, return null to avoid MDX build issues
  // This can be implemented later with proper MDX configuration
  return null
}

async function checkPdfExists(pair: string): Promise<boolean> {
  try {
    const fs = await import('fs/promises')
    await fs.access(`public/downloads/marriage/${pair}.pdf`)
    return true
  } catch {
    return false
  }
}

export default async function MarriageKitPairPage({ params }: PageProps) {
  const pairData = parsePair(params.pair)
  
  if (!pairData) {
    notFound()
  }

  const country1Name = getCountryName(pairData.country1)
  const country2Name = getCountryName(pairData.country2)
  
  if (!country1Name || !country2Name) {
    notFound()
  }

  const kitContent = await getKitContent(params.pair)
  
  if (!kitContent) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Marriage Kit: {kitContent.country1Name} & {kitContent.country2Name}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {kitContent.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>Country Pair: {pairData.pair}</span>
              <span>•</span>
              <span>Expert-reviewed content</span>
              <span>•</span>
              <span>Instant download</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Content Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Marriage Requirements & Procedures</CardTitle>
                  <CardDescription>
                    Detailed guide for marriage between {country1Name} and {country2Name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {kitContent.hasMdx ? (
                    <div className="prose prose-lg max-w-none">
                      {/* MDX content would be rendered here */}
                      <div className="text-center py-8">
                        <p className="text-gray-600">MDX content would be rendered here when configured.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Brief Coming Soon
                        </h3>
                        <p className="text-gray-600 mb-6">
                          We're currently preparing the detailed guide for {kitContent.country1Name} and {kitContent.country2Name}. 
                          This will include step-by-step procedures, document requirements, and processing timelines.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">What to Expect:</h4>
                        <ul className="text-left space-y-2 text-gray-600">
                          <li>• Required documents and certificates</li>
                          <li>• Translation and legalization requirements</li>
                          <li>• Embassy/consulate procedures</li>
                          <li>• Processing timelines and fees</li>
                          <li>• Common pitfalls and expert tips</li>
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                          <Button variant="outline">
                            Request This Guide
                          </Button>
                        </Link>
                        <Link href="/kits/marriage-kit">
                          <Button variant="ghost">
                            Choose Different Countries
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Download Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Download Your Guide</CardTitle>
                  <CardDescription>
                    Get instant access to the complete PDF guide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocDownload 
                    productId="marriageKit"
                    pair={kitContent.pair}
                    country1={kitContent.country1}
                    country2={kitContent.country2}
                    pdfExists={kitContent.hasPdf}
                    pdfUrl={kitContent.pdfUrl}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Get Your Guide</CardTitle>
                  <CardDescription>
                    Instant access to comprehensive marriage guidance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                                      <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(kitContent.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {kitContent.isDefaultPrice ? 'Starting at' : 'One-time purchase'}
                  </div>
                  {kitContent.isDefaultPrice && (
                    <div className="text-xs text-gray-400 mt-1">
                      Final price may vary by pair
                    </div>
                  )}
                  </div>
                  
                  <PriceButtons 
                    productId="marriageKit"
                    pair={kitContent.pair}
                    country1={kitContent.country1}
                    country2={kitContent.country2}
                    price={kitContent.price}
                    currency={kitContent.currency}
                    isDefaultPrice={kitContent.isDefaultPrice}
                  />

                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Instant download</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Expert-reviewed content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Country Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Countries Covered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">{kitContent.country1Name}</span>
                      <span className="text-sm text-gray-500 font-mono">{kitContent.country1}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">{kitContent.country2Name}</span>
                      <span className="text-sm text-gray-500 font-mono">{kitContent.country2}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Have questions about this marriage kit or need assistance?
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
