import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payment Cancelled - LexAtlas',
  description: 'Your payment was cancelled. You can try again or browse our other marriage kits.',
  robots: 'noindex, nofollow', // Don't index checkout pages
}

interface CancelPageProps {
  searchParams: { 
    kit?: string
  }
}

export default function CheckoutCancelPage({ searchParams }: CancelPageProps) {
  const { kit } = searchParams

  return (
    <main className="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Cancel Icon */}
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-8 h-8 text-orange-600" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-2xl font-bold text-brand-navy mb-4">
            Payment Cancelled
          </h1>
          
          <p className="text-brand-textMuted mb-6">
            Your payment was cancelled. No charges have been made to your account.
          </p>

          {/* Help Text */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              If you encountered any issues during checkout, please try again or contact our support team.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {kit && (
              <Button asChild className="w-full gold-hover">
                <Link href={`/kits/${kit}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Try Again
                </Link>
              </Button>
            )}
            
            <Button variant="secondary" asChild className="w-full">
              <Link href="/kits">
                Browse All Kits
              </Link>
            </Button>
          </div>

          {/* Support Link */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? <Link href="/contact" className="text-brand-gold hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
