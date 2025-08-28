import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { DocDownload } from '@/components/DocDownload'
import { parsePair, getCountryName } from '@/lib/countries'

interface PageProps {
  params: { pair: string }
  searchParams: { session_id?: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pairData = parsePair(params.pair)
  
  if (!pairData) {
    return {
      title: 'Payment Success | LexAtlas',
    }
  }

  const country1Name = getCountryName(pairData.country1)
  const country2Name = getCountryName(pairData.country2)
  
  return {
    title: `Payment Successful - ${country1Name} & ${country2Name} | LexAtlas`,
    description: `Your marriage kit for ${country1Name} and ${country2Name} is ready for download.`,
  }
}

export default async function SuccessPage({ params, searchParams }: PageProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Container className="py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your marriage kit is ready for download.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Marriage Kit: {country1Name} & {country2Name}</CardTitle>
              <CardDescription>
                Your comprehensive guide is ready
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocDownload 
                productId="marriageKit"
                pair={pairData.pair}
                country1={pairData.country1}
                country2={pairData.country2}
                pdfExists={false} // Will be checked by the component
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <ul className="text-left space-y-2 text-sm text-blue-800">
                <li>• Download your comprehensive marriage guide</li>
                <li>• Review the step-by-step procedures</li>
                <li>• Gather required documents</li>
                <li>• Contact us if you need assistance</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/kits/marriage-kit/${pairData.pair}`}>
                <Button variant="outline">
                  View Kit Details
                </Button>
              </Link>
              <Link href="/kits/marriage-kit">
                <Button variant="ghost">
                  Browse More Kits
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost">
                  Get Support
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>Session ID: {searchParams.session_id || 'N/A'}</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
