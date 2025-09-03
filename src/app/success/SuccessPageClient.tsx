'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { CheckCircle, Download, FileText } from 'lucide-react'
import { expandPairTitle } from '@/lib/kits.config'
import { pdfPathForSlug, getGlobalSamplePath } from '@/lib/pdfs'

interface SuccessPageClientProps {
  purchasedItems: string[]
  purchaseKind: string
  sessionId: string
  isFake?: boolean
}

export function SuccessPageClient({ purchasedItems, purchaseKind, sessionId, isFake }: SuccessPageClientProps) {
  useEffect(() => {
    // Set paid cookie for download access
    if (typeof window !== 'undefined') {
      document.cookie = 'x-paid=1; path=/; max-age=86400; SameSite=Lax'
    }
    
    // Track checkout success event
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('checkout_success', { 
        props: { 
          type: purchaseKind,
          items_count: purchasedItems.length,
          session_id: sessionId
        } 
      })
    }
  }, [purchaseKind, purchasedItems.length, sessionId])

  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            {isFake ? 'Order Successful!' : 'Purchase Successful!'}
          </h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your marriage kits are ready for download.
            {isFake && (
              <span className="block text-sm text-gray-500 mt-2">
                (Development mode - no actual payment processed)
              </span>
            )}
          </p>
        </div>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Downloads</CardTitle>
            <CardDescription>
              Click the buttons below to download your marriage kits
              {isFake && ' (Fake Session)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchasedItems.map((slug) => {
                const pairKey = slug.replace('-', '-').toUpperCase()
                const title = expandPairTitle(pairKey)
                const pdfPath = pdfPathForSlug(slug)
                
                return (
                  <div key={slug} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Marriage Kit {title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete guide for {title}
                      </p>
                    </div>
                    {pdfPath ? (
                      <Button asChild>
                        <a href={pdfPath} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </a>
                      </Button>
                    ) : (
                      <div className="text-sm text-gray-500">
                        File not found
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Global Sample CTA */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Want to see more?</CardTitle>
            <CardDescription>
              Download our comprehensive sample kit to see what's included
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <a href={getGlobalSamplePath()} download>
                <FileText className="mr-2 h-4 w-4" />
                Download Global Sample Kit
              </a>
            </Button>
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
