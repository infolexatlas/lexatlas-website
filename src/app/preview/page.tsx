import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { LeadMagnetBanner } from '@/components/LeadMagnetBanner'
import { SUPPORTED_FRA_SLUGS, expandPairTitle } from '@/lib/kits.config'
import { Download, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Previews • LexAtlas',
  description: 'Get a free sample from our cross-border marriage kits, or preview a specific France–X pair.',
  openGraph: {
    title: 'LexAtlas Previews',
    description: 'Free sample + previews for France–X kits.',
  },
}

export default function PreviewPage() {
  // Create the kit data for the grid
  const kitData = SUPPORTED_FRA_SLUGS.map(slug => {
    const iso3Pair = slug.split('-')
    const country1 = iso3Pair[0].toUpperCase() // FRA
    const country2 = iso3Pair[1].toUpperCase() // USA, GBR, etc.
    
    // Convert to ISO2 for display names
    const iso2Map: Record<string, string> = {
      'FRA': 'FR', 'USA': 'US', 'GBR': 'GB', 'CAN': 'CA', 'MAR': 'MA',
      'DEU': 'DE', 'CHE': 'CH', 'BEL': 'BE', 'ESP': 'ES', 'ITA': 'IT', 'PRT': 'PT'
    }
    
    const country1Code = iso2Map[country1] || country1
    const country2Code = iso2Map[country2] || country2
    
    const title = expandPairTitle(`${country1Code}-${country2Code}`)
    
    return {
      slug,
      title,
      previewUrl: `/preview/${slug}`
    }
  })

  return (
    <Container className="py-12 space-y-8 md:space-y-10">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep">
          Free Previews
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Get a free sample from our cross-border marriage kits, or preview a specific France–X pair by email.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
        <Button asChild size="lg" className="flex items-center gap-2">
          <a href="/kits/samples/LEXATLAS-global-sample.pdf" download>
            <Download className="h-4 w-4" />
            Download global sample (PDF)
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
          <a href="#email">
            <Mail className="h-4 w-4" />
            Get preview by email
          </a>
        </Button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 max-w-2xl mx-auto" />

      {/* Kit Grid Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-deep mb-2">
            Preview a France–X kit
          </h2>
          <p className="text-slate-600">
            Choose a specific country pair to get a preview by email
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {kitData.map((kit) => (
            <Card key={kit.slug} className="hover:shadow-md transition-shadow" data-testid="kit-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-brand-deep">
                  {kit.title}
                </CardTitle>
                <CardDescription className="text-xs">
                  Preview by email
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href={kit.previewUrl}>
                    Open preview
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Lead Magnet Section */}
      <div id="email" className="max-w-2xl mx-auto">
        <LeadMagnetBanner source="preview-index" />
      </div>
    </Container>
  )
}
