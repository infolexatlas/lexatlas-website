'use client'

import { MapPin, Building, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function ContactOffice() {
  return (
    <section className="py-16 md:py-24 bg-brand-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-deep mb-4">
              Company Information
            </h2>
            <p className="text-lg text-brand-textMuted">
              Legal and business details for your reference
            </p>
          </div>

          {/* Office Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft border-brand-gray">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl2 flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-brand-gold" />
                </div>
                <CardTitle className="text-xl font-serif text-brand-deep">
                  Business Details
                </CardTitle>
                <CardDescription>
                  Legal entity and registration information
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-brand-deep mb-1">Company Name</h4>
                  <p className="text-brand-textMuted">LexAtlas</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-deep mb-1">Business Type</h4>
                  <p className="text-brand-textMuted">Digital Legal Services</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-deep mb-1">Service Area</h4>
                  <p className="text-brand-textMuted">International Legal Documentation</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-brand-gray">
              <CardHeader>
                <div className="w-12 h-12 bg-brand-accent/10 rounded-xl2 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-brand-accent" />
                </div>
                <CardTitle className="text-xl font-serif text-brand-deep">
                  Global Reach
                </CardTitle>
                <CardDescription>
                  Serving international clients worldwide
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-brand-deep mb-1">Languages</h4>
                  <p className="text-brand-textMuted">English, French</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-deep mb-1">Coverage</h4>
                  <p className="text-brand-textMuted">EU, North America, Global</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-deep mb-1">Response Time</h4>
                  <p className="text-brand-textMuted">As soon as possible</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-brand-textMuted">
              For legal inquiries or partnership opportunities, please use our contact form above.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
