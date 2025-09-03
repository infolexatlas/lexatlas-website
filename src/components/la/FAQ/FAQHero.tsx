'use client'

import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { Shield, Clock, Users, CheckCircle } from 'lucide-react'

/**
 * Hero section for FAQ page with premium styling
 * Features elegant typography, subtle animations, and trust indicators
 */
export const FAQHero = () => {
  const stats = [
    { icon: Shield, value: '100%', label: 'Expert Verified' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
    { icon: Users, value: '247', label: 'Couples Helped' },
    { icon: CheckCircle, value: '10', label: 'Countries Covered' }
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
                Support & Guidance
              </span>
            </div>
          </FadeIn>

          {/* Main headline */}
          <FadeIn delay={0.2}>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-brand-navy tracking-tight mb-6 leading-tight">
              Frequently Asked{' '}
              <span className="text-brand-gold">Questions</span>
            </h1>
          </FadeIn>

          {/* Subheading */}
          <FadeIn delay={0.3}>
            <p className="text-xl lg:text-2xl text-brand-textMuted max-w-3xl mx-auto mb-12 leading-relaxed">
              Find clear answers to common questions about international marriage procedures, 
              our legal kits, and the services we provide.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button size="lg" variant="premium" className="text-base px-8 py-3" asChild>
                <a href="/contact">Contact Support</a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-3" asChild>
                <a href="/kits">Browse Marriage Kits</a>
              </Button>
            </div>
          </FadeIn>

          {/* Stats Grid */}
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-250">
                    <stat.icon className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />
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
