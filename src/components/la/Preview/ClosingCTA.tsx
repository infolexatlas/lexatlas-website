'use client'

import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/motion'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export function ClosingCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--la-primary)] to-[#223A63] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(212,175,55,0.3)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="mb-4">
              <span className="text-sm font-medium text-[var(--la-accent)] uppercase tracking-wider">Ready to Get Started?</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white tracking-tight mb-6">Your Cross-Border Marriage Journey Starts Here</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed">Join more than 200 international couples who have successfully navigated their legal requirements with confidence. Get your comprehensive guide today and take the first step towards your future together.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/kits">
                <Button size="lg" variant="outline" className="text-base px-8 py-3 border-2 border-white bg-white text-[var(--la-primary)] hover:bg-white/90 hover:scale-105 shadow-lg">
                  Explore Legal Kits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-base px-8 py-3 border-2 border-[var(--la-accent)] bg-[var(--la-accent)] text-[var(--la-primary)] hover:bg-[color-mix(in_oklab,var(--la-accent)_90%,white)] hover:scale-105 shadow-lg">
                  Contact Our Team
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}


