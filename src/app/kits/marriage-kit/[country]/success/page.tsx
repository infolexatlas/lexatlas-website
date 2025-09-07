'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Mail, ArrowRight, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DocDownload } from '@/components/DocDownload'
import { getCountryByCode } from '@/content/marriage/countries'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const sessionId = searchParams.get('session_id')
  const fake = searchParams.get('fake')
  const countryCode = params.country as string
  const [loading, setLoading] = useState(true)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [country, setCountry] = useState<any>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !countryCode) {
        setVerificationStatus('error')
        setLoading(false)
        return
      }

      // If it's a fake checkout, skip Stripe verification
      if (fake === '1') {
        setVerificationStatus('success')
        // Set paid cookie for download access with proper path
        document.cookie = `x-paid=1; Path=/kits/marriage-kit/${countryCode}; Max-Age=86400; SameSite=Strict`
        sessionStorage.setItem('lexatlas-paid', 'true')
        setLoading(false)
        return
      }

      try {
        // Verify the session with Stripe
        const response = await fetch('/api/verify-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            country: countryCode,
          }),
        })

        if (response.ok) {
          setVerificationStatus('success')
          // Set paid cookie for download access with proper path
          document.cookie = `x-paid=1; Path=/kits/marriage-kit/${countryCode}; Max-Age=86400; SameSite=Strict`
          sessionStorage.setItem('lexatlas-paid', 'true')
        } else {
          setVerificationStatus('error')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setVerificationStatus('error')
      } finally {
        setLoading(false)
      }
    }

    const foundCountry = getCountryByCode(countryCode)
    setCountry(foundCountry)

    // Simulate verification delay
    const timer = setTimeout(verifyPayment, 1000)
    return () => clearTimeout(timer)
  }, [sessionId, countryCode, fake])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-deep mx-auto mb-4"></div>
          <p className="text-gray-600">
            {fake === '1' ? 'Processing your order...' : 'Verifying your payment...'}
          </p>
        </div>
      </div>
    )
  }

  if (!country) {
    return (
      <div className="min-h-screen bg-brand-muted flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Country not found</p>
        </div>
      </div>
    )
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen bg-brand-muted py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-red-600" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep mb-4">
                Payment Verification Failed
              </h1>
              <p className="text-xl text-gray-600">
                We couldn't verify your payment. Please contact support.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-700" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep mb-4">
              {fake === '1' ? 'Order Successful!' : 'Payment Successful!'}
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your {country.name} Marriage Kit is ready for download.
              {fake === '1' && (
                <span className="block text-sm text-gray-500 mt-2">
                  (Development mode - no actual payment processed)
                </span>
              )}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-brand-deep">
                Your Download is Ready
              </CardTitle>
              <CardDescription>
                Session ID: {sessionId}
                {fake === '1' && ' (Fake Session)'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 p-4 bg-brand-gold/10 rounded-lg">
                  <Download className="h-6 w-6 text-brand-gold" />
                  <span className="font-medium text-brand-deep">
                    Marriage Kit — {country.name}.pdf
                  </span>
                </div>
                
                <DocDownload 
                  productId="marriage-kit"
                  pair={country.code.toLowerCase()}
                  country1={country.code}
                  country2={country.code}
                  pdfExists={true}
                  fileName="Marriage Kit"
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-brand-deep mb-4">What's next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Check your email for a confirmation with download instructions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Review the country-specific requirements for {country.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                    <span className="text-sm text-gray-700">
                      Contact us if you need any clarification or support
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={`/kits/marriage-kit/${country.code}`}>
                Back to {country.name} Kit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <div className="text-sm text-gray-600">
              <p>
                Need help? Contact us at{' '}
                <a href="mailto:contact.lexatlas@gmail.com" className="text-brand-gold hover:underline">
                  contact.lexatlas@gmail.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
