'use client'

import { Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ContactCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-deep to-brand-navyEdge">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6">
            <Clock className="h-8 w-8 text-brand-gold" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            We Reply Within One Business Day
          </h2>

          {/* Description */}
          <p className="text-xl text-brand-ivory/90 mb-8 leading-relaxed">
            Your message is important to us. We're committed to providing timely, 
            helpful responses to all inquiries during business hours.
          </p>

          {/* Action Buttons - Fixed visibility like CTASticky */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/faq">
              <Button 
                size="lg" 
                variant="premium" 
                className="text-base px-8 py-3 bg-white text-white border-2 border-white hover:bg-gray-100 hover:scale-105 shadow-lg"
              >
                Browse FAQ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/kits">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-3 border-2 border-brand-gold bg-brand-gold text-brand-navy hover:bg-brand-gold/90 hover:scale-105 shadow-lg"
              >
                Explore Marriage Kits
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-brand-gold/20">
            <p className="text-sm text-brand-ivory/70">
              Business hours: Monday to Friday, 9:00 AM - 6:00 PM (CET)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
