'use client'

import { FadeIn } from '@/components/ui/motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ClosingCTA() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-navy to-brand-navyEdge relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(212,175,55,0.3)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="mb-6">
              <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">
                Ready to Get Started?
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white tracking-tight mb-6">
              Get Your International Marriage Kit Today.
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Expert-built, instantly downloadable guides with official sources, timelines, and checklists.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link href="/kits">
                <Button 
                  size="lg" 
                  variant="premium" 
                  className="text-base px-8 py-3 bg-white text-white border-2 border-white hover:bg-gray-100 hover:scale-105 shadow-lg"
                >
                  Browse Kits
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 py-3 border-2 border-brand-gold bg-brand-gold text-brand-navy hover:bg-brand-gold/90 hover:scale-105 shadow-lg"
                >
                  Contact Support
                </Button>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 lg:p-8 border border-white/20">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-brand-gold mb-2">10</div>
                  <div className="text-white/80 text-sm">Country Pairs Covered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-gold mb-2">247</div>
                  <div className="text-white/80 text-sm">Couples Helped</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-gold mb-2">24/7</div>
                  <div className="text-white/80 text-sm">Support Available</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}


