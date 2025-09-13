'use client'

import { MessageSquare, Shield, Clock, Users, CheckCircle } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'

export function ContactHero() {
  const stats = [
    { icon: Shield, value: '100%', label: 'Expert Verified' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
    { icon: Users, value: '247', label: 'Couples Helped' },
    { icon: CheckCircle, value: '10', label: 'Countries Covered' }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-brand-muted to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Support & Contact
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-deep mb-6">
            Contact <span className="text-brand-gold">Support</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-brand-textMuted mb-12 leading-relaxed">
            Can't find what you need? We're here to help with product questions, 
            orders, and partnership inquiries.
          </p>

          {/* CTA Buttons - Exact same as About page */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a 
                href="/kits"
                className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 bg-brand-navy text-white font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium"
              >
                Explore Legal Kits
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

          {/* Stats Grid - Exact same design as FAQ */}
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="group">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-250">
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
