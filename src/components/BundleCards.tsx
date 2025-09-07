'use client'

import { useState } from 'react'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PRICE_BUNDLE_3, PRICE_BUNDLE_10 } from '@/lib/pricing'
import { formatPrice } from '@/lib/utils'

export function BundleCards() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleBundleCheckout = async (bundleType: 'bundle3' | 'bundle10') => {
    setLoading(bundleType)
    
    try {
      const response = await fetch(`/api/checkout/${bundleType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success_url: `${window.location.origin}/kits/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/kits/cancel`,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      // Show fallback message for development
      if (process.env.NEXT_PUBLIC_FAKE_CHECKOUT === '1') {
        alert('⚠️ Stripe test mode – checkout disabled.')
      } else {
        alert('Checkout temporarily unavailable. Please try again.')
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
      {/* Bundle of 3 - Most Popular */}
      <Card className="h-full rounded-2xl bg-white/75 backdrop-blur ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all duration-250 flex flex-col relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-brand-gold text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 h-6">
          <Star className="h-4 w-4" />
          Most Popular
        </div>
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-2xl font-serif text-[#1A2E4F]">
            Bundle of 3 Kits
          </CardTitle>
          <CardDescription className="text-lg text-[#444444]">
            Perfect for couples with multiple country options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex-grow flex flex-col">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#1A2E4F]">
                {formatPrice(PRICE_BUNDLE_3.price)}
              </span>
              <span className="text-lg text-[#444444] line-through">
                87 €
              </span>
            </div>
            <p className="text-sm text-brand-gold font-medium">
              Save 15% compared to buying separately
            </p>
          </div>

          <div className="space-y-3 flex-grow">
            <h4 className="font-semibold text-[#1A2E4F]">What's included:</h4>
            <ul className="space-y-2 text-sm text-[#444444]">
              <li>• 3 complete marriage kits of your choice</li>
              <li>• All required documents and procedures</li>
              <li>• Step-by-step legal guidance</li>
              <li>• Lifetime access to updates</li>
            </ul>
          </div>

          <div className="mt-auto pt-4">
            <Button 
              onClick={() => handleBundleCheckout('bundle3')}
              disabled={loading === 'bundle3'}
              className="w-full bg-[#1A2E4F] hover:bg-[#1A2E4F]/90 text-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-250 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              size="lg"
            >
              {loading === 'bundle3' ? (
                'Processing...'
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Bundle of 3
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Full Pack */}
      <Card className="h-full rounded-2xl bg-white/75 backdrop-blur ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all duration-250 flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-2xl font-serif text-[#1A2E4F]">
            Full Pack (10 Kits)
          </CardTitle>
          <CardDescription className="text-lg text-[#444444]">
            Complete collection for maximum flexibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex-grow flex flex-col">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#1A2E4F]">
                {formatPrice(PRICE_BUNDLE_10.price)}
              </span>
              <span className="text-lg text-[#444444] line-through">
                290 €
              </span>
            </div>
            <p className="text-sm text-brand-gold font-medium">
              Best value (≈20 €/kit)
            </p>
          </div>

          <div className="space-y-3 flex-grow">
            <h4 className="font-semibold text-[#1A2E4F]">What's included:</h4>
            <ul className="space-y-2 text-sm text-[#444444]">
              <li>• All 10 priority country marriage kits</li>
              <li>• France + USA, UK, Canada, Morocco, Germany</li>
              <li>• Switzerland, Belgium, Spain, Italy, Portugal</li>
              <li>• Lifetime access to all updates</li>
              <li>• Priority customer support</li>
            </ul>
          </div>

          <div className="mt-auto pt-4">
            <Button 
              onClick={() => handleBundleCheckout('bundle10')}
              disabled={loading === 'bundle10'}
              className="w-full bg-[#1A2E4F] hover:bg-[#1A2E4F]/90 text-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-250 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              size="lg"
            >
              {loading === 'bundle10' ? (
                'Processing...'
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Buy Full Pack
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
