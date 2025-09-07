import { Shield, Lock, Download, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

const badges = [
  {
    icon: Shield,
    title: 'GDPR Compliant',
    description: 'Your data is protected',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: '256-bit SSL encryption',
  },
  {
    icon: Download,
    title: 'Instant Download',
    description: 'Get your guide immediately',
  },
  {
    icon: CheckCircle,
    title: 'Expert Verified',
    description: 'Legal professionals reviewed',
  },
]

export function TrustBadges() {
  return (
    <section role="region" aria-labelledby="trust-badges-title" className="bg-brand-ivory py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 animate-reveal">
          <div className="flex items-center justify-center mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A2E4F] to-brand-gold mr-3"></div>
            <h2 id="trust-badges-title" className="text-3xl lg:text-4xl font-serif font-bold text-[#1A2E4F] tracking-tight">
              Trusted by International Couples
            </h2>
          </div>
          <p className="text-xl text-[#444444] max-w-3xl mx-auto leading-relaxed">
            Your security and privacy are our top priorities. Every transaction is protected with industry-leading security measures.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <div key={index} className="animate-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="p-6 text-center border-0 bg-white/75 backdrop-blur rounded-2xl ring-1 ring-black/5 shadow-sm hover:scale-105 hover:shadow-lg transition-all duration-250 group h-full">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1A2E4F]/10 to-brand-gold/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-250 flex-shrink-0">
                    <badge.icon className="w-7 h-7 text-[#1A2E4F] flex-shrink-0" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-semibold text-[#1A2E4F] text-base font-medium">
                      {badge.title}
                    </h3>
                    <p className="text-sm text-[#444444] mt-2 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 lg:mt-16 animate-reveal">
          <div className="inline-flex items-center space-x-3 bg-white/75 backdrop-blur px-6 py-3 rounded-2xl ring-1 ring-black/5 shadow-sm border border-brand-gray/50">
            <img 
              src="https://stripe.com/img/v3/home/social.png" 
              alt="Secure payments by Stripe" 
              className="h-6 w-auto"
              loading="lazy"
              width="24"
              height="24"
            />
            <span className="text-sm text-[#444444] font-medium">Secure payments by Stripe</span>
          </div>
        </div>
      </div>
    </section>
  )
}
