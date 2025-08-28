import { Metadata } from 'next'
import FAQ from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | LexAtlas',
  description: 'Clear answers about cross-border marriage kits, timelines, costs, recognition, translations, and delivery.',
  openGraph: {
    title: 'Frequently Asked Questions | LexAtlas',
    description: 'Clear answers about cross-border marriage kits, timelines, costs, recognition, translations, and delivery.',
    images: [
      {
        url: '/og/about.svg',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - LexAtlas',
      },
      {
        url: '/og/about.png',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - LexAtlas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | LexAtlas',
    description: 'Clear answers about cross-border marriage kits, timelines, costs, recognition, translations, and delivery.',
    images: ['/og/about.svg', '/og/about.png'],
  },
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-brand-muted">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find clear answers to common questions about international marriage procedures, 
              our legal kits, and the services we provide.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <FAQ />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-deep mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-brand-deep text-white rounded-md hover:bg-brand-deep/90 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/kits/marriage-kit"
                className="inline-flex items-center justify-center px-8 py-3 border border-brand-deep text-brand-deep rounded-md hover:bg-brand-deep hover:text-white transition-colors"
              >
                Browse Marriage Kits
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
