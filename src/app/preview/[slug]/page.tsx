import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { slugToPairKey, expandPairTitle, isValidPrioritySlug, getFullPairNameFromSlug } from '@/lib/kits.config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { LeadMagnetBanner } from '@/components/LeadMagnetBanner'
import { JsonLd } from '@/components/JsonLd'
import { getPreviewPageSchema } from '@/lib/jsonLd'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  
  // Get full pair name with France-first ordering
  const { fullName } = getFullPairNameFromSlug(slug)
  
  // Build metadata
  const title = `Preview – ${fullName} Marriage Kit – LexAtlas`
  const description = `Get a free preview of the ${fullName} marriage kit. See what's inside before you buy.`
  
  // Build URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const url = new URL(`/preview/${slug}`, baseUrl)
  
  // Use /og/kits.png as fallback since /og/preview.png doesn't exist
  const ogImage = '/og/kits.png'
  
  return {
    title,
    description,
    alternates: { canonical: url.toString() },
    openGraph: {
      type: 'website',
      url: url.toString(),
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function PreviewPage({ params }: PageProps) {
  const { slug } = params
  
  // Validate slug is one of the 10 FRA-X pairs
  if (!isValidPrioritySlug(slug)) {
    return (
      <Container className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-brand-deep">
                Preview Not Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">
                This pair isn't available yet. More kits are in production and released daily.
              </p>
              <Button asChild>
                <a href="/preview">
                  Browse Available Previews
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Container>
    )
  }

  const pairKey = slugToPairKey(slug)
  if (!pairKey) {
    notFound()
  }

  const title = expandPairTitle(pairKey)

  // Generate JSON-LD structured data
  const previewSchema = getPreviewPageSchema({
    pairNameFull: title,
    slug
  })

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={previewSchema} />
      
      <Container className="py-12 space-y-8">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-brand-deep">
          Free Preview: {title}
        </h1>
        <p className="text-lg text-slate-600">
          Get a free sample of our comprehensive {title} marriage guide
        </p>
      </div>

      {/* Lead Magnet Form */}
      <div className="max-w-2xl mx-auto">
        <LeadMagnetBanner source={`preview-${slug}`} />
      </div>

      {/* Global Sample Link */}
      <div className="text-center max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <p className="text-slate-600 mb-4">
              Or download our global sample to see what's included in our guides
            </p>
            <Button asChild>
              <a href="/kits/samples/LEXATLAS-global-sample.pdf" download>
                Download Global Sample (PDF)
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
      </Container>
    </>
  )
}
