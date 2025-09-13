'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'

export default function ClosingCTA() {
  return (
    <section aria-labelledby="closing-cta-title" className="py-20 lg:py-28 bg-brand-navy relative overflow-hidden">
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
      <div className="container">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="mb-6">
            <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">Ready to Get Started?</span>
          </div>

          <h2 id="closing-cta-title" className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white tracking-tight mb-6">
            Cross-Border Marriage Kits, <span className="text-brand-gold">Done Right</span>.
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Professional, verified legal guidance for international couples. Instant download. Lifetime access.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/kits" className="inline-flex items-center justify-center px-8 py-3 rounded-xl2 text-base font-semibold bg-white text-brand-navy border-2 border-white hover:bg-gray-100 hover:scale-[1.02] shadow-lg transition-premium focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2">
              Browse Kits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-xl2 text-base font-semibold border-2 border-brand-gold bg-brand-gold text-brand-navy hover:bg-brand-gold/90 hover:scale-[1.02] shadow-lg transition-premium focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2">
              Contact Support
              <Mail className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


