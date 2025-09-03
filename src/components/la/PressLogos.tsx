'use client'

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import Image from 'next/image'

/**
 * Press/Trust section with monochrome logos
 * Features opacity hover effects and fixed aspect boxes to prevent CLS
 */
export const PressLogos = () => {
  const pressLogos = [
    {
      name: 'Legal Times',
      logo: '/api/placeholder/200/80',
      url: '#'
    },
    {
      name: 'International Law Review',
      logo: '/api/placeholder/200/80',
      url: '#'
    },
    {
      name: 'Global Legal Network',
      logo: '/api/placeholder/200/80',
      url: '#'
    },
    {
      name: 'Cross-Border Legal',
      logo: '/api/placeholder/200/80',
      url: '#'
    },
    {
      name: 'Legal Innovation Today',
      logo: '/api/placeholder/200/80',
      url: '#'
    },
    {
      name: 'International Family Law',
      logo: '/api/placeholder/200/80',
      url: '#'
    }
  ]

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">
                Recognition
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight mb-6">
              Trusted by Legal Professionals
            </h2>
            <p className="text-xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed">
              Our work has been recognized and featured by leading legal publications worldwide.
            </p>
          </div>
        </FadeIn>

        {/* Logos Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {pressLogos.map((logo, index) => (
            <StaggerItem key={logo.name}>
              <div className="group">
                <a
                  href={logo.url}
                  className="block aspect-[2.5/1] relative bg-white/75 backdrop-blur rounded-xl ring-1 ring-black/5 shadow-soft hover:shadow-premium transition-all duration-250 group-hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${logo.name} coverage`}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="w-full h-full bg-gradient-to-br from-brand-navy/5 to-brand-gold/5 rounded-lg flex items-center justify-center group-hover:opacity-80 transition-opacity duration-250">
                      <span className="text-sm font-medium text-brand-navy text-center">
                        {logo.name}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust Indicators */}
        <FadeIn delay={0.3}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 text-sm text-brand-textMuted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-gold rounded-full" />
                <span>Expert Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-gold rounded-full" />
                <span>Regularly Updated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-gold rounded-full" />
                <span>Customer Supported</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
