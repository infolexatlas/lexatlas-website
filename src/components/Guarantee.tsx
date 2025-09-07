import { Shield, Clock, MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function Guarantee() {
  return (
    <section role="region" aria-labelledby="guarantee-title" className="bg-gradient-to-b from-brand-ivory to-brand-gray py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 lg:mb-16 animate-reveal">
            <div className="flex items-center justify-center mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-brand-navy to-brand-gold mr-3"></div>
              <h2 id="guarantee-title" className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight">
                Our Commitment to You
              </h2>
            </div>
            <p className="text-xl text-brand-textMuted leading-relaxed">
              Clarity-first, expert-built. We're here to support you every step of the way.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            <div className="animate-reveal" style={{ animationDelay: '0.1s' }}>
              <Card className="h-full p-8 text-center border-0 bg-white rounded-xl2 shadow-soft hover:scale-105 hover:shadow-premium transition-all duration-250 group flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl2 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-250">
                  <Shield className="w-10 h-10 text-brand-navy" />
                </div>
                <h3 className="text-xl font-semibold text-brand-navy mb-3 font-medium">
                  Expert Quality
                </h3>
                <p className="text-brand-textMuted leading-relaxed flex-grow">
                  Every guide is reviewed by legal professionals with international expertise.
                </p>
              </Card>
            </div>
            
            <div className="animate-reveal" style={{ animationDelay: '0.2s' }}>
              <Card className="h-full p-8 text-center border-0 bg-white rounded-xl2 shadow-soft hover:scale-105 hover:shadow-premium transition-all duration-250 group flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl2 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-250">
                  <Clock className="w-10 h-10 text-brand-navy" />
                </div>
                <h3 className="text-xl font-semibold text-brand-navy mb-3 font-medium">
                  7-Day Support
                </h3>
                <p className="text-brand-textMuted leading-relaxed flex-grow">
                  Have questions? Our team responds within 24 hours to help resolve any issues.
                </p>
              </Card>
            </div>
            
            <div className="animate-reveal" style={{ animationDelay: '0.3s' }}>
              <Card className="h-full p-8 text-center border-0 bg-white rounded-xl2 shadow-soft hover:scale-105 hover:shadow-premium transition-all duration-250 group flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-xl2 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-250">
                  <MessageCircle className="w-10 h-10 text-brand-navy" />
                </div>
                <h3 className="text-xl font-semibold text-brand-navy mb-3 font-medium">
                  Clear Communication
                </h3>
                <p className="text-brand-textMuted leading-relaxed flex-grow">
                  Complex procedures explained in simple, actionable steps you can follow.
                </p>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-16 text-center animate-reveal">
            <div className="bg-white rounded-xl2 p-8 shadow-soft max-w-3xl mx-auto border border-brand-gray/50">
              <p className="text-brand-textMuted text-sm leading-relaxed">
                <strong className="text-brand-navy">Important:</strong> Our guides provide general information and guidance. 
                While we strive for accuracy, legal requirements can change. We recommend consulting 
                with a local legal professional for your specific situation. LexAtlas is not a law firm 
                and does not provide legal advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
