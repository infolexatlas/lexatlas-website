import { Metadata } from 'next'
import { 
  ContactHero, 
  ContactForm, 
  ContactOptions, 
  ContactCTA, 
  ContactSchema 
} from '@/components/la'
import { PageTransition } from '@/components/ui/page-transition'

export const metadata: Metadata = {
  title: 'Contact Support - LexAtlas',
  description: 'Get in touch with LexAtlas support team. We\'re here to help with product questions, orders, and partnership inquiries. Response within 24 hours.',
  keywords: ['contact', 'support', 'help', 'customer service', 'lexatlas'],
  openGraph: {
    title: 'Contact Support - LexAtlas',
    description: 'Get in touch with LexAtlas support team. We\'re here to help with product questions, orders, and partnership inquiries.',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <PageTransition>
      {/* JSON-LD Schema */}
      <ContactSchema />
      
      <div className="min-h-screen bg-brand-muted">
        {/* Hero Section */}
        <ContactHero />

        {/* Contact Form Section */}
        <section className="py-4 md:py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <ContactForm />
          </div>
        </section>

        {/* Contact Options Section */}
        <ContactOptions />

        {/* CTA Section */}
        <ContactCTA />
      </div>
    </PageTransition>
  )
}
