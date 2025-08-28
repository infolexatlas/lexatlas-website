import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { 
  slugToPairKey, 
  expandPairTitle, 
  isValidPrioritySlug,
  PRIORITY_SLUGS 
} from '@/lib/kits.config'
import { getSinglePriceForPair } from '@/lib/pricing'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { TrustBadges } from '@/components/TrustBadges'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return PRIORITY_SLUGS.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const pairKey = slugToPairKey(slug)
  
  if (!pairKey) {
    return {
      title: 'Kit Not Found',
      description: 'The requested marriage kit could not be found.'
    }
  }

  const title = expandPairTitle(pairKey)
  const description = `Complete marriage guide for ${title}. Step-by-step procedures, document requirements, and expert legal guidance.`
  
  return {
    title: `Marriage Kit ${title} - LexAtlas`,
    description,
    openGraph: {
      title: `Marriage Kit ${title}`,
      description,
      images: [`/og/pairs/${slug}.png`],
    },
  }
}

export default async function KitPage({ params }: PageProps) {
  const { slug } = params
  
  // Validate slug
  if (!isValidPrioritySlug(slug)) {
    notFound()
  }

  const pairKey = slugToPairKey(slug)
  if (!pairKey) {
    notFound()
  }

  const title = expandPairTitle(pairKey)
  const priceInfo = getSinglePriceForPair(pairKey)
  
  // Check if PDF exists
  const pdfPath = path.join(process.cwd(), 'public', 'kits', `${slug.toUpperCase()}.pdf`)
  const hasPdf = fs.existsSync(pdfPath)
  
  // Check if sample PDF exists
  const samplePath = path.join(process.cwd(), 'public', 'kits', 'samples', `${slug.toUpperCase()}-sample.pdf`)
  const hasSample = fs.existsSync(samplePath)

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Marriage Kit {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Complete step-by-step guide for international marriage between {title}
          </p>
          <div className="text-3xl font-bold text-primary">
            {priceInfo.price / 100} €
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Kit Details */}
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Complete marriage procedure guide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Required documents checklist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Legal requirements and timelines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Expert legal guidance and tips</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Contact information for authorities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Instant download after purchase</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Right Column - Purchase */}
          <Card>
            <CardHeader>
              <CardTitle>Get Your Kit</CardTitle>
              <CardDescription>
                Instant access to comprehensive marriage guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {priceInfo.price / 100} €
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  One-time payment • Lifetime access
                </p>
              </div>
              
              <form action="/api/checkout/single" method="POST">
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="pairKey" value={pairKey} />
                <Button type="submit" className="w-full" size="lg">
                  Buy Now – {priceInfo.price / 100} €
                </Button>
              </form>

              {hasSample && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Not sure? Try our free preview
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <a href={`/preview/${slug}`}>
                      Free Preview
                    </a>
                  </Button>
                </div>
              )}

              {!hasSample && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Free preview coming soon
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trust Section */}
        <TrustBadges data-testid="trust-badges" />

        {/* Additional Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About This Kit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This comprehensive marriage kit provides everything you need to navigate the 
              international marriage process between {title}. Our expert team has compiled 
              the most up-to-date information, procedures, and requirements to ensure your 
              marriage process goes smoothly.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
