import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { parsePair, getCountryName } from '@/lib/countries'

interface PageProps {
  params: { pair: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pairData = parsePair(params.pair)
  
  if (!pairData) {
    return {
      title: 'Payment Cancelled | LexAtlas',
    }
  }

  const country1Name = getCountryName(pairData.country1)
  const country2Name = getCountryName(pairData.country2)
  
  return {
    title: `Payment Cancelled - ${country1Name} & ${country2Name} | LexAtlas`,
    description: `Your payment was cancelled. You can try again anytime.`,
  }
}

export default async function CancelPage({ params }: PageProps) {
  const pairData = parsePair(params.pair)
  
  if (!pairData) {
    notFound()
  }

  const country1Name = getCountryName(pairData.country1)
  const country2Name = getCountryName(pairData.country2)
  
  if (!country1Name || !country2Name) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <Container className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Cancelled
            </h1>
            <p className="text-lg text-gray-600">
              Your payment was cancelled. No charges were made to your account.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Marriage Kit: {country1Name} & {country2Name}</CardTitle>
              <CardDescription>
                Your kit is still available for purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Don't worry, you can complete your purchase anytime. Your comprehensive marriage guide is waiting for you.
              </p>
              <Link href={`/kits/marriage-kit/${pairData.pair}`}>
                <Button className="w-full">
                  Try Again
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-800 mb-4">
                If you encountered any issues during checkout, our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button variant="ghost" size="sm">
                    View FAQ
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kits/marriage-kit">
                <Button variant="outline">
                  Browse All Kits
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>If you have any questions about your order, please contact our support team.</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
