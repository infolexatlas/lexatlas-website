import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payment Successful - LexAtlas',
  description: 'Your payment has been processed successfully. You will receive your marriage kit via email shortly.',
  robots: 'noindex, nofollow', // Don't index checkout pages
}

interface SuccessPageProps {
  searchParams: { 
    session_id?: string
    kit?: string
  }
}

export default function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id, kit } = searchParams

  return (
    <main className="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-brand-navy mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-brand-textMuted mb-6">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>

          {/* Email Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">Check your email</span>
            </div>
            <p className="text-sm text-blue-700">
              We've sent you a confirmation email with your marriage kit download link.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {kit && (
              <Button asChild className="w-full gold-hover">
                <Link href={`/kits/${kit}`}>
                  <Download className="w-4 h-4 mr-2" />
                  View Your Kit
                </Link>
              </Button>
            )}
            
            <Button variant="secondary" asChild className="w-full">
              <Link href="/kits">
                Browse More Kits
              </Link>
            </Button>
          </div>

          {/* Session ID for support */}
          {session_id && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Session ID: {session_id}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
