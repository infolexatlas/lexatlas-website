'use client'

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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trusted by International Couples
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your security and privacy are our top priorities. Every transaction is protected with industry-leading security measures.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {badges.map((badge, index) => (
            <Card key={index} className="p-6 text-center border-0 shadow-sm bg-white">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {badge.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <img 
              src="https://stripe.com/img/v3/home/social.png" 
              alt="Secure payments by Stripe" 
              className="h-6 w-auto"
            />
            <span className="text-sm text-gray-600">Secure payments by Stripe</span>
          </div>
        </div>
      </div>
    </section>
  )
}
