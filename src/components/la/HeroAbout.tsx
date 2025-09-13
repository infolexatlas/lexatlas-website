'use client'

import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { UnderlineLink } from '@/components/ui/underline-link'
import { Globe, Users, FileText, Award } from 'lucide-react'

/**
 * Hero section for About page with premium styling
 * Features elegant typography, subtle animations, and trust indicators
 */
export const HeroAbout = () => {
  const stats = [
    { icon: Globe, value: '10', label: 'Countries Covered' },
    { icon: Users, value: '247', label: 'Couples Helped' },
    { icon: FileText, value: '100%', label: 'Expert Verified' },
    { icon: Award, value: '24/7', label: 'Support Available' }
  ]

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-ivory via-white to-brand-ivory" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <FadeIn delay={0.1}>
            <div className="mb-6">
              <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">
                About LexAtlas
              </span>
            </div>
          </FadeIn>

          {/* Main headline */}
          <FadeIn delay={0.2}>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-brand-navy tracking-tight mb-6 leading-tight">
              Your Global Legal Compass for{' '}
              <span className="text-brand-gold">Cross-Border Marriage</span>
            </h1>
          </FadeIn>

          {/* Subheading */}
          <FadeIn delay={0.3}>
            <p className="text-xl lg:text-2xl text-brand-textMuted max-w-3xl mx-auto mb-12 leading-relaxed">
              Expert-built, step-by-step guides that empower international couples 
              to navigate complex legal requirements with confidence and clarity.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a 
                href="/kits"
                className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 bg-brand-navy text-white font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium"
              >
                Browse kits
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="/faq"
                className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 border-2 border-brand-gold bg-brand-gold text-brand-navy font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium"
              >
                FAQ
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>
          </FadeIn>

          {/* Stats Grid */}
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-gold/10 to-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-250">
                    <stat.icon className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-bold text-brand-navy mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-brand-textMuted font-medium">
                    {stat.label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
