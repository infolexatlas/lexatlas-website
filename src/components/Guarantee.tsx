'use client'

import { Shield, Clock, MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function Guarantee() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Commitment to You
            </h2>
            <p className="text-gray-600 text-lg">
              Clarity-first, expert-built. We're here to support you every step of the way.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center border-0 shadow-sm bg-white">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Quality
              </h3>
              <p className="text-gray-600">
                Every guide is reviewed by legal professionals with international expertise.
              </p>
            </Card>
            
            <Card className="p-6 text-center border-0 shadow-sm bg-white">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                7-Day Support
              </h3>
              <p className="text-gray-600">
                Have questions? Our team responds within 24 hours to help resolve any issues.
              </p>
            </Card>
            
            <Card className="p-6 text-center border-0 shadow-sm bg-white">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Clear Communication
              </h3>
              <p className="text-gray-600">
                Complex procedures explained in simple, actionable steps you can follow.
              </p>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm max-w-2xl mx-auto">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Important:</strong> Our guides provide general information and guidance. 
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
