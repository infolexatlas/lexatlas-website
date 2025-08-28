'use client'

import { Lock, Shield, CreditCard, Eye } from 'lucide-react'

const safetyFeatures = [
  {
    icon: Lock,
    title: '256-bit SSL Encryption',
    description: 'Your payment data is encrypted and secure',
  },
  {
    icon: Shield,
    title: 'PCI DSS Compliant',
    description: 'We never store your credit card information',
  },
  {
    icon: CreditCard,
    title: 'Secure by Stripe',
    description: 'Trusted by millions of businesses worldwide',
  },
  {
    icon: Eye,
    title: 'Privacy Protected',
    description: 'Your personal data is never shared or sold',
  },
]

export function CheckoutSafety() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Secure Checkout
        </h3>
        <p className="text-sm text-gray-600">
          Your payment is protected by industry-leading security measures
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {safetyFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {feature.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Lock className="w-3 h-3" />
          <span>This is a secure, encrypted connection</span>
        </div>
      </div>
    </div>
  )
}
