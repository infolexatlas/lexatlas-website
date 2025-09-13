import { Metadata } from 'next'
import { KitCatalogueClient } from '@/components/la/Kit/KitCatalogueClient'
import { KitTrustStrip } from '@/components/la/Kit/KitTrustStrip'
import { KitSampleCTA } from '@/components/la/Kit/KitSampleCTA'
import { KitFAQExtract } from '@/components/la/Kit/KitFAQExtract'
import PricingCTAComponent from '@/components/la/Pricing/PricingCTA'
import { countryPairs } from '@/lib/kits-country-data'
import { JsonLd } from '@/components/JsonLd'
import { ROUTES } from '@/lib/kit-routes'
import { PageTransition } from '@/components/ui/page-transition'

export const metadata: Metadata = {
  title: 'LexAtlas Kits – Cross-Border Marriage Kits by Country Pair',
  description: 'Explore ready-to-use legal kits for international marriages. Official sources, step-by-step guidance, instant download.',
  openGraph: {
    title: 'LexAtlas Kits – Cross-Border Marriage Kits by Country Pair',
    description: 'Explore ready-to-use legal kits for international marriages. Official sources, step-by-step guidance, instant download.',
    images: ['/og/kits.png'],
  },
  twitter: {
    title: 'LexAtlas Kits – Cross-Border Marriage Kits by Country Pair',
    description: 'Explore ready-to-use legal kits for international marriages. Official sources, step-by-step guidance, instant download.',
    images: ['/og/kits.png'],
  },
}

export default function KitsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-brand-ivory">
      {/* 1. Page Masthead */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-ivory via-white to-brand-gray/30 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-6 lg:pr-8">
              <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-brand-textMuted">
                <a 
                  href="/" 
                  className="hover:text-brand-navy transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 rounded"
                >
                  Home
                </a>
                <span>/</span>
                <span className="text-brand-navy font-medium">Kits</span>
              </nav>
              
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-brand-navy tracking-tight leading-tight break-words animate-reveal" style={{ animationDelay: '0.1s' }}>
                  Find your cross-border <span className="text-brand-gold">marriage kit.</span>
                </h1>
                <p className="text-lg lg:text-xl text-brand-textMuted max-w-2xl leading-relaxed animate-reveal" style={{ animationDelay: '0.2s' }}>
                  Expert-built, country-specific PDF guides for cross-border marriages. 
                  Choose from individual kits or save with our value bundles.
                </p>
              </div>
            </div>

            {/* Right: Premium Illustration */}
            <div className="hidden lg:block relative">
              <div className="relative w-80 h-80 mx-auto animate-reveal group" style={{ animationDelay: '0.3s' }}>
                {/* Navy circular base with radial gradient */}
                <div className="absolute inset-0 rounded-full bg-brand-navy shadow-2xl animate-scaleIn group-hover:shadow-premium transition-all duration-500 group-hover:scale-105">
                  {/* Gold ring highlight on hover */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-brand-gold/30 transition-all duration-500"></div>
                </div>
                
                {/* Glass overlay */}
                <div className="absolute inset-2 rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20 animate-fadeIn" style={{ animationDelay: '0.6s' }}></div>
                
                {/* Legal documents stack */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Document 1 (back) */}
                    <div className="absolute top-0 left-0 w-32 h-40 bg-white/90 rounded-lg shadow-lg transform rotate-[-8deg] border border-brand-gold/20 animate-slideUp group-hover:rotate-[-6deg] transition-all duration-500" style={{ animationDelay: '0.9s' }}></div>
                    
                    {/* Document 2 (middle) */}
                    <div className="absolute top-2 left-2 w-32 h-40 bg-white/95 rounded-lg shadow-lg transform rotate-[4deg] border border-brand-gold/30 animate-slideUp group-hover:rotate-[2deg] transition-all duration-500" style={{ animationDelay: '1.1s' }}></div>
                    
                    {/* Document 3 (front) */}
                    <div className="absolute top-4 left-4 w-32 h-40 bg-white rounded-lg shadow-xl transform rotate-[12deg] border border-brand-gold/40 animate-slideUp group-hover:rotate-[10deg] transition-all duration-500" style={{ animationDelay: '1.3s' }}>
                      {/* Document lines */}
                      <div className="p-4 space-y-2">
                        <div className="h-2 bg-brand-gold/60 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                        <div className="h-2 bg-brand-textMuted/40 rounded-full w-3/4 animate-pulse" style={{ animationDelay: '1.7s' }}></div>
                        <div className="h-2 bg-brand-textMuted/40 rounded-full w-1/2 animate-pulse" style={{ animationDelay: '1.9s' }}></div>
                        <div className="h-2 bg-brand-textMuted/40 rounded-full w-5/6 animate-pulse" style={{ animationDelay: '2.1s' }}></div>
                      </div>
                    </div>
                    
                    {/* Gold seal/stamp */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-brand-gold rounded-full shadow-lg flex items-center justify-center animate-bounce group-hover:scale-110 transition-all duration-300" style={{ animationDelay: '2.3s', animationDuration: '2s' }}>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-brand-gold/5 blur-xl animate-pulse" style={{ animationDelay: '0.8s', animationDuration: '3s' }}></div>
                
                {/* Floating elements */}
                <div className="absolute top-6 left-6 w-2 h-2 bg-brand-gold/60 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-brand-gold/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-8 left-8 w-1 h-1 bg-brand-gold/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search & Filters Bar and Grid */}
      <KitCatalogueClient />

      {/* 3. Trust stats only (before Lead Magnet) */}
      <KitTrustStrip showGrid showLogo={false} />

      {/* 4. Free Sample CTA (Lead Magnet, compact spacing) */}
      <KitSampleCTA compact />

      {/* 5. FAQ Extract */}
      <KitFAQExtract ids={[
        'what-is-lexatlas-kit',
        'are-guides-up-to-date',
        'how-long-international-marriage',
        'how-much-cost',
        'recognition-both-countries',
        'how-receive-kit',
      ]} />

      {/* 6. Closing CTA */}
      <PricingCTAComponent />

      {/* JSON-LD products for cards */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': countryPairs.map(p => ({
          '@type': 'Product',
          name: p.label,
          brand: { '@type': 'Brand', name: 'LexAtlas' },
          sku: `kit-${p.id}`,
          url: ROUTES.getKit(p.id),
          offers: { '@type': 'Offer', priceCurrency: 'EUR', price: p.price.toFixed(2), availability: 'https://schema.org/InStock', url: ROUTES.getKit(p.id) }
        }))
      }} />
      </div>
    </PageTransition>
  )
}
