import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { isFakeCheckout, stripe } from '@/lib/stripe'
import { expandPairTitle } from '@/lib/kits.config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { CheckCircle } from 'lucide-react'
import { SuccessPageClient } from './SuccessPageClient'

interface PageProps {
  searchParams: { 
    session_id?: string
    fake?: string
    kind?: string
    slug?: string
    pair?: string
  }
}

export const metadata: Metadata = {
  title: 'Purchase Successful - LexAtlas',
  description: 'Your marriage kit purchase was successful. Download your files below.',
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const { session_id, fake, kind, slug, pair } = searchParams

  if (!session_id) {
    notFound()
  }

  let session: any = null
  let purchasedItems: string[] = []
  let purchaseKind = ''

  // Handle fake checkout
  if (fake === '1' || (isFakeCheckout && session_id.startsWith('fake_'))) {
    if (kind === 'bundle3') {
      // For bundle3, we'll use default items since custom selection isn't passed in URL
      purchasedItems = ['fra-usa', 'fra-gbr', 'fra-can']
      purchaseKind = 'bundle3'
    } else if (kind === 'bundle10') {
      purchasedItems = ['fra-usa', 'fra-gbr', 'fra-can', 'fra-mar', 'fra-deu', 'fra-che', 'fra-bel', 'fra-esp', 'fra-ita', 'fra-prt']
      purchaseKind = 'bundle10'
    } else if (kind === 'single' && slug) {
      purchasedItems = [slug]
      purchaseKind = 'single'
    } else if (pair) {
      purchasedItems = [pair]
      purchaseKind = 'single'
    } else {
      purchasedItems = ['fra-usa']
      purchaseKind = 'single'
    }
  } else {
    try {
      session = await stripe!.checkout.sessions.retrieve(session_id)
      
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
    <SuccessPageClient 
      purchasedItems={purchasedItems} 
      purchaseKind={purchaseKind}
      sessionId={session_id}
      isFake={fake === '1'}
    />
  )
}
