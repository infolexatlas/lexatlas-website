'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-deep mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
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
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your legal kit is ready for download.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-brand-deep">
                Your Download is Ready
              </CardTitle>
              <CardDescription>
                Session ID: {sessionId}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 p-4 bg-brand-gold/10 rounded-lg">
                  <Download className="h-6 w-6 text-brand-gold" />
                  <span className="font-medium text-brand-deep">
                    Cross-Border Marriage Kit.pdf
                  </span>
                </div>
                
                <Button asChild className="w-full" size="lg">
                  <a href="/documents/cross-border-marriage-kit.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </a>
                </Button>
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
                      Review the country-specific requirements for your situation
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
              <Link href="/kits">
                Browse More Kits
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
