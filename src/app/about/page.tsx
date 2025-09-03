import { Metadata } from 'next'
import { HeroAbout } from '@/components/la/HeroAbout'
import { ValuesGrid } from '@/components/la/ValuesGrid'
import { Timeline } from '@/components/la/Timeline'
import { CTASticky } from '@/components/la/CTASticky'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About LexAtlas – Your Global Legal Compass for Cross-Border Marriage',
  description:
    'LexAtlas creates trusted, step-by-step marriage kits for international couples. Clear guidance, official sources, and instant downloads.',
  openGraph: {
    title: 'About LexAtlas – Your Global Legal Compass for Cross-Border Marriage',
    description:
      'LexAtlas creates trusted, step-by-step marriage kits for international couples. Clear guidance, official sources, and instant downloads.',
    url: '/about',
    type: 'website',
    images: ['/og/about.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About LexAtlas – Your Global Legal Compass for Cross-Border Marriage',
    description:
      'LexAtlas creates trusted, step-by-step marriage kits for international couples. Clear guidance, official sources, and instant downloads.',
    images: ['/og/about.png'],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroAbout />

      {/* Mission Section */}
      <Section spacing="lg" className="bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">
                Our Mission
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight mb-6">
              Democratizing Access to International Legal Information
            </h2>
            <p className="text-xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed">
              We believe that international legal procedures shouldn't be overwhelming or inaccessible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-brand-textMuted leading-relaxed">
                At LexAtlas, we combine deep legal expertise with clear, actionable guidance to help you save time, 
                avoid costly mistakes, and proceed with confidence in your international legal journey.
              </p>
              <p className="text-lg text-brand-textMuted leading-relaxed">
                Our mission is to provide expert-built, country-specific guidance that empowers individuals and couples 
                to navigate complex legal requirements with confidence and clarity.
              </p>
              <div className="flex items-center gap-3 text-brand-gold">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Expert-built and legally verified</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-brand-navy/5 to-brand-gold/5 rounded-2xl p-8 lg:p-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-gold rounded-full" />
                  <span className="font-medium text-brand-navy">Step-by-step guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-gold rounded-full" />
                  <span className="font-medium text-brand-navy">Official sources only</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-gold rounded-full" />
                  <span className="font-medium text-brand-navy">Instant digital access</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-gold rounded-full" />
                  <span className="font-medium text-brand-navy">Lifetime updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-brand-gold rounded-full" />
                  <span className="font-medium text-brand-navy">Expert support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values Grid */}
      <ValuesGrid />

      {/* Timeline */}
      <Timeline />

      {/* Legal Disclaimer */}
      <Section spacing="md" className="bg-brand-ivory">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-brand-gold/20 bg-brand-gold/5">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-brand-navy flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-gold" />
                Important Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-brand-textMuted">
                <p className="font-medium text-brand-navy">
                  LexAtlas provides educational content and guidance, not legal advice.
                </p>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Educational Purpose:</strong> Our guides are designed to provide general information and 
                    educational content about international legal procedures. They are not a substitute for 
                    personalized legal advice from a qualified attorney.
                  </p>
                  <p>
                    <strong>Not a Law Firm:</strong> LexAtlas is not a law firm and does not provide legal services. 
                    We do not establish attorney-client relationships or provide legal representation.
                  </p>
                  <p>
                    <strong>Professional Consultation:</strong> For complex legal matters or situations requiring 
                    personalized advice, we strongly recommend consulting with a qualified legal professional 
                    in your jurisdiction.
                  </p>
                  <p>
                    <strong>Accuracy:</strong> While we strive for accuracy and regularly update our content, 
                    laws and procedures can change. We recommend verifying current requirements with relevant 
                    authorities before proceeding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Closing CTA */}
      <CTASticky />
    </main>
  )
}
