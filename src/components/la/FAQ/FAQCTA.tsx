'use client'

import { Button } from '@/components/ui/button'
import { FadeIn, HoverLift } from '@/components/ui/motion'
import { MessageCircle, BookOpen } from 'lucide-react'
import Image from 'next/image'

/**
 * Premium CTA section for FAQ page
 * Features elegant card design and clear call-to-action buttons
 */
export const FAQCTA = () => {
  return (
    <section className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden">
      {/* Logo watermark background */}
      <div className="absolute inset-0 opacity-[0.08] flex items-center justify-center" aria-hidden>
        <Image 
          src="/logo/lexatlas-transparent.svg" 
          alt="" 
          width={400} 
          height={400} 
          className="object-contain"
        />
      </div>
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">Still Have Questions?</span>
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white tracking-tight mb-6">
            Your Cross‑Border Marriage Journey <span className="text-brand-gold">Starts Here</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Can't find what you're looking for? Our support team is here to help you navigate your international marriage journey with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a 
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 bg-white text-brand-navy font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium"
            >
              Contact Support
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a 
              href="/kits"
              className="inline-flex items-center justify-center rounded-xl2 text-base px-8 py-3 border-2 border-brand-gold bg-brand-gold text-brand-navy font-semibold shadow-soft hover:shadow-premium hover:scale-105 transition-premium"
            >
              Browse Marriage Kits
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="border border-white/20 rounded-lg p-4 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-gold/10 to-brand-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-brand-gold mb-2">10</div>
              <div className="text-white/80 text-sm">Countries Covered</div>
            </div>
            <div className="border border-white/20 rounded-lg p-4 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-gold/10 to-brand-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-brand-gold mb-2">247</div>
              <div className="text-white/80 text-sm">Couples Helped</div>
            </div>
            <div className="border border-white/20 rounded-lg p-4 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-gold/10 to-brand-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-brand-gold mb-2">100%</div>
              <div className="text-white/80 text-sm">Expert Verified</div>
            </div>
            <div className="border border-white/20 rounded-lg p-4 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-gold/10 to-brand-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-brand-gold mb-2">24/7</div>
              <div className="text-white/80 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
