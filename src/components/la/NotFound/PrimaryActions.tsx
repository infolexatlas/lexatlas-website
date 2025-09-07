'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/motion'
import { track } from '@/lib/analytics'

export function NotFoundPrimaryActions() {
  const onClick = (action: string) => () => track('404_action_click', { action })
  return (
    <section className="pb-6">
      <FadeIn>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/kits" onClick={onClick('browse_kits')}>
            <Button size="lg" className="px-6 hover:shadow-gold-glow active:translate-y-[1px] transition-premium">Browse Kits</Button>
          </Link>
          <Link href="/pricing" onClick={onClick('pricing')}>
            <Button size="lg" className="px-6 hover:shadow-gold-glow active:translate-y-[1px] transition-premium">Pricing</Button>
          </Link>
          <Link href="/faq" onClick={onClick('faq')}>
            <Button size="lg" className="px-6 hover:shadow-gold-glow active:translate-y-[1px] transition-premium">FAQ</Button>
          </Link>
          <Link href="/contact" onClick={onClick('contact')}>
            <Button size="lg" className="px-6 hover:shadow-gold-glow active:translate-y-[1px] transition-premium">Contact Support</Button>
          </Link>
        </div>
      </FadeIn>
    </section>
  )
}


