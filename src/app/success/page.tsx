import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { stripe, useFakeCheckout } from '@/lib/stripe'
import { expandPairTitle } from '@/lib/kits.config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { CheckCircle } from 'lucide-react'

interface PageProps {
  searchParams: { session_id?: string }
}

export const metadata: Metadata = {
  title: 'Purchase Successful - LexAtlas',
  description: 'Your marriage kit purchase was successful. Download your files below.',
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { session_id } = searchParams

  if (!session_id) {
    notFound()
  }

  let session: any = null
  let purchasedItems: string[] = []
  let purchaseKind = ''

  if (useFakeCheckout && session_id.startsWith('fake_')) {
    // Handle fake checkout for testing
    if (session_id.includes('bundle3')) {
      purchasedItems = ['fra-usa', 'fra-gbr', 'fra-can']
      purchaseKind = 'bundle_3'
    } else if (session_id.includes('bundle10')) {
      purchasedItems = ['fra-usa', 'fra-gbr', 'fra-can', 'fra-mar', 'fra-deu', 'fra-che', 'fra-bel', 'fra-esp', 'fra-ita', 'fra-prt']
      purchaseKind = 'bundle_10'
    } else {
      purchasedItems = ['fra-usa']
      purchaseKind = 'single'
    }
  } else {
    try {
      session = await stripe.checkout.sessions.retrieve(session_id)
      
      if (session.payment_status !== 'paid') {
        notFound()
      }

      purchaseKind = session.metadata?.kind || ''
      const slugs = session.metadata?.slugs || session.metadata?.slug || ''
      
      if (purchaseKind === 'single') {
        purchasedItems = [slugs]
      } else {
        purchasedItems = slugs.split(',').filter(Boolean)
      }
    } catch (error) {
      console.error('Error retrieving session:', error)
      notFound()
    }
  }

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            Purchase Successful!
          </h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your marriage kits are ready for download.
          </p>
        </div>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Downloads</CardTitle>
            <CardDescription>
              Click the buttons below to download your marriage kits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchasedItems.map((slug) => {
                const pairKey = slug.replace('-', '-').toUpperCase()
                const title = expandPairTitle(pairKey)
                
                return (
                  <div key={slug} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Marriage Kit {title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete guide for {title}
                      </p>
                    </div>
                    <Button asChild>
                      <a href={`/kits/${slug.toUpperCase()}.pdf`} download>
                        Download PDF
                      </a>
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">📖 Read Your Guide</h4>
              <p className="text-muted-foreground">
                Start by reading through your marriage kit to understand the complete process.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📋 Prepare Documents</h4>
              <p className="text-muted-foreground">
                Use the included checklist to gather all required documents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📞 Get Support</h4>
              <p className="text-muted-foreground">
                If you have questions, don't hesitate to contact our support team.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Button variant="outline" asChild>
            <a href="/kits">Browse More Kits</a>
          </Button>
          <Button asChild>
            <a href="/contact">Contact Support</a>
          </Button>
        </div>
      </div>
    </Container>
  )
}
