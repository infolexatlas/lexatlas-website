import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payment Cancelled - LexAtlas',
  description: 'Your payment was cancelled. You can try again or contact support.',
}

export default function CancelPage() {
  return (
    <Container className="py-12">
      <div className="max-w-2xl mx-auto text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Cancelled</CardTitle>
            <CardDescription>
              Your payment was not completed. No charges were made to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Don't worry - you can try again anytime. If you're having trouble with the payment process, 
              our support team is here to help.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <a href="/pricing">Try Again</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/contact">Contact Support</a>
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
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
