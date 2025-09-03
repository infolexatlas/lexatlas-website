'use client'

import Link from 'next/link'

export function SupportLegal() {
  return (
    <section className="pt-4">
      <div className="text-sm text-[color-mix(in_srgb,var(--la-text),transparent_45%)]">
        <p>
          Need help? <Link className="underline hover:no-underline" href="/contact">Contact Support</Link>
        </p>
        <p className="mt-2 flex flex-wrap gap-3">
          <Link className="underline hover:no-underline" href="/terms">Terms</Link>
          <Link className="underline hover:no-underline" href="/privacy">Privacy</Link>
          <Link className="underline hover:no-underline" href="/terms">Refund policy</Link>
        </p>
      </div>
    </section>
  )
}


