'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CancelPage() {
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
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-deep mb-4">
              Payment Cancelled
            </h1>
            <p className="text-xl text-gray-600">
              No worries! Your payment was cancelled and you haven't been charged.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-brand-deep">
                What happened?
              </CardTitle>
              <CardDescription>
                Your payment process was interrupted or cancelled
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-brand-deep">No charges made</h4>
                    <p className="text-sm text-gray-600">
                      Your payment was not processed and no charges were made to your account.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-brand-deep">Try again anytime</h4>
                    <p className="text-sm text-gray-600">
                      You can complete your purchase at any time. Your cart items are still available.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-brand-deep">Need help?</h4>
                    <p className="text-sm text-gray-600">
                      If you encountered any issues, our support team is here to help.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/checkout">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Try Again
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link href="/kits">
                  Browse Kits
                </Link>
              </Button>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>
                Questions? Contact us at{' '}
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
