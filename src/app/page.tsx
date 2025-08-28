import { Hero } from '@/components/home/hero'
import { Features } from '@/components/home/features'
import { Pricing } from '@/components/home/pricing'
import { TrustBadges } from '@/components/TrustBadges'
import { Testimonials } from '@/components/Testimonials'
import { Guarantee } from '@/components/Guarantee'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import { OrganizationJsonLd } from '@/components/JsonLd'
import FAQ from '@/components/FAQ'

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
      <Hero />
      <Features />
      <Pricing />
      <TrustBadges />
      <Testimonials />
      <Guarantee />
      <FAQPreview />
      <OrganizationJsonLd />
    </div>
  )
}

function FAQPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-deep mb-4">
            Top Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get quick answers to the most common questions about international marriage procedures.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <FAQ showSearch={false} maxItems={3} />
        </div>
        
        <div className="text-center mt-8">
          <a
            href="/faq"
            className="inline-flex items-center justify-center px-8 py-3 border border-brand-deep text-brand-deep rounded-md hover:bg-brand-deep hover:text-white transition-colors"
          >
            View All FAQs
          </a>
        </div>
      </div>
    </section>
  )
}
