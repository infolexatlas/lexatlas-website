'use client'

import { Button } from '@/components/ui/button'
import { FadeIn, HoverLift } from '@/components/ui/motion'
import { MessageCircle, BookOpen } from 'lucide-react'

/**
 * Premium CTA section for FAQ page
 * Features elegant card design and clear call-to-action buttons
 */
export const FAQCTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <HoverLift className="bg-gradient-to-br from-brand-ivory via-white to-brand-ivory rounded-3xl ring-1 ring-black/5 shadow-premium p-8 md:p-12">
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />
                </div>

                {/* Headline */}
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy mb-6">
                  Still Have Questions?
                </h2>

                {/* Description */}
                <p className="text-xl text-brand-textMuted max-w-2xl mx-auto mb-8 leading-relaxed">
                  Can't find what you're looking for? Our support team is here to help 
                  you navigate your international marriage journey with confidence.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    variant="premium" 
                    className="text-base px-8 py-3 group" 
                    asChild
                  >
                    <a href="/contact" className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-250" />
                      Contact Support
                    </a>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-base px-8 py-3 group" 
                    asChild
                  >
                    <a href="/kits" className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-250" />
                      Browse Marriage Kits
                    </a>
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-8 border-t border-brand-gray/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-brand-textMuted">
                    <div className="text-center">
                      <div className="font-medium text-brand-navy mb-1">24/7 Support</div>
                      <div>Get help anytime, anywhere</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-brand-navy mb-1">Expert Guidance</div>
                      <div>Legal professionals at your service</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-brand-navy mb-1">Quick Response</div>
                      <div>Usually within 2-4 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </HoverLift>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
