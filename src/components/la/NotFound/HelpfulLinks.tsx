'use client'

import Link from 'next/link'

export function HelpfulLinks() {
  return (
    <section className="pt-2 pb-6">
      <div className="text-center text-sm text-[color-mix(in_srgb,var(--la-text),transparent_40%)]">
        <div className="flex flex-wrap justify-center gap-4">
          <Link className="underline hover:no-underline" href="/">Home</Link>
          <Link className="underline hover:no-underline" href="/about">About</Link>
          <Link className="underline hover:no-underline" href="/kits">Marriage Kits</Link>
        </div>
      </div>
    </section>
  )
}


