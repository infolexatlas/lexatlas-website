import { Metadata } from 'next'
import { Globe, Shield, Users, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - LexAtlas',
  description: 'Learn about LexAtlas, our mission to provide expert legal guidance for international procedures.',
  openGraph: {
    title: 'About - LexAtlas',
    description: 'Learn about LexAtlas, our mission to provide expert legal guidance for international procedures.',
    images: [
      {
        url: '/og/about.svg',
        width: 1200,
        height: 630,
        alt: 'About LexAtlas',
      },
      {
        url: '/og/about.png',
        width: 1200,
        height: 630,
        alt: 'About LexAtlas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - LexAtlas',
    description: 'Learn about LexAtlas, our mission to provide expert legal guidance for international procedures.',
    images: ['/og/about.svg', '/og/about.png'],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-muted">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep mb-6">
              About LexAtlas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your Global Legal Compass - Empowering individuals and families to navigate 
              international legal procedures with confidence and clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-deep mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At LexAtlas, we believe that legal guidance should be accessible, 
                comprehensive, and tailored to your specific situation. Our expert-built 
                legal kits provide the tools and knowledge you need to navigate complex 
                international procedures with confidence.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're planning an international marriage, dealing with 
                cross-border taxes, or facing other international legal challenges, 
                our comprehensive guides are designed to simplify the process and 
                give you peace of mind.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Globe className="h-8 w-8 text-brand-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-brand-deep mb-2">
                      Global Expertise
                    </h3>
                    <p className="text-gray-600">
                      Covering 30+ countries with country-specific legal guidance
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-brand-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-brand-deep mb-2">
                      Trusted & Secure
                    </h3>
                    <p className="text-gray-600">
                      Expert-verified content with secure payment processing
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-brand-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-brand-deep mb-2">
                      User-Focused
                    </h3>
                    <p className="text-gray-600">
                      Designed for real people facing real legal challenges
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-deep mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at LexAtlas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                description: 'We maintain the highest standards in legal research and content creation.'
              },
              {
                icon: Shield,
                title: 'Trust',
                description: 'Your confidence in our guidance is our most valuable asset.'
              },
              {
                icon: Globe,
                title: 'Accessibility',
                description: 'Making complex legal procedures understandable for everyone.'
              }
            ].map((value, index) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-brand-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-deep mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-deep mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore our legal kits and find the guidance you need for your 
              international legal journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kits"
                className="inline-flex items-center justify-center px-8 py-3 bg-brand-deep text-white rounded-md hover:bg-brand-deep/90 transition-colors"
              >
                Browse Kits
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-brand-deep text-brand-deep rounded-md hover:bg-brand-deep hover:text-white transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
