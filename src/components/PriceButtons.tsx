'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { parsePair, getCountryName } from '@/lib/countries'

interface PriceButtonsProps {
  productId: string
  pair: string
  country1: string
  country2: string
  price: number
  currency: string
  isDefaultPrice?: boolean
  className?: string
}

export function PriceButtons({ productId, pair, country1, country2, price, currency, isDefaultPrice = false, className }: PriceButtonsProps) {
  const [loading, setLoading] = useState<'single' | 'bundle' | null>(null)

  // Get country names for display
  const country1Name = getCountryName(country1)
  const country2Name = getCountryName(country2)
  const displayName = country1Name && country2Name ? `${country1Name} ↔ ${country2Name}` : pair

  const handleCheckout = async (priceType: 'single' | 'bundle') => {
    setLoading(priceType)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceType === 'single' ? 'marriageKit' : 'bundle',
          country1,
          country2,
          pair,
        }),
      })

      const { url, error } = await response.json()
      
      if (error) {
        console.error('Checkout error:', error)
        alert('Checkout failed. Please try again.')
        return
      }

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className={className}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Single Kit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-full border-2 border-gray-200 hover:border-brand-gold transition-colors">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-brand-deep">
                Single Kit
              </CardTitle>
              <CardDescription>
                Marriage Kit for {displayName}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center space-y-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-brand-deep">
                  {formatPrice(price)}
                </div>
                <p className="text-sm text-gray-600">
                  {isDefaultPrice ? 'Starting at' : 'One-time payment'}
                </p>
                {isDefaultPrice && (
                  <p className="text-xs text-gray-500">
                    Final price may vary by pair
                  </p>
                )}
              </div>

              <ul className="text-left space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  Cross-border guidance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  Step-by-step checklists
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  Document templates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  Lifetime updates
                </li>
              </ul>

              <Button
                onClick={() => handleCheckout('single')}
                disabled={loading !== null}
                className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                size="lg"
              >
                {loading === 'single' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy Single Kit
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bundle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full border-2 border-brand-gold relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-brand-gold text-brand-deep px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            </div>
            
            <CardHeader className="text-center pt-6">
              <CardTitle className="text-2xl font-serif text-brand-deep">
                Bundle (2 Kits)
              </CardTitle>
              <CardDescription>
                Choose any 2 legal kits
              </CardDescription>
            </CardHeader>
            
            <CardContent className="text-center space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-brand-deep">
                    {formatPrice(75)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(100)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Save 50% on second kit</p>
              </div>

              <ul className="text-left space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  Choose any 2 legal kits
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  All features included
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  Lifetime updates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  Flexible selection
                </li>
              </ul>

              <Button
                onClick={() => handleCheckout('bundle')}
                disabled={loading !== null}
                className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                size="lg"
                variant="secondary"
              >
                {loading === 'bundle' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Buy Bundle
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Secure payment processed by Stripe • 30-day money-back guarantee
        </p>
      </div>
    </div>
  )
}
