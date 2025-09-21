'use client'

import Link from 'next/link'
import AnimatedLogo from '@/components/brand/AnimatedLogo'
import { LOGO_SRC } from '@/lib/brand'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'


export default function HeaderBrand() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[HeaderBrand] active on path:', pathname)
    }
  }, [pathname])

  return (
    <Link
      href="/"
      aria-label="Lex Atlas home"
      data-testid="header-brand"
      className={clsx(
        'group flex items-center gap-2 font-semibold tracking-tight shrink-0 relative'
      )}
      // TEMP: remove any accidental CSS that might kill hover
      style={{ pointerEvents: 'auto' }}
    >
      {/* Blue chip — make hover visually obvious (temporary) */}
      <span
        className={clsx(
          'relative inline-flex h-9 w-9 items-center justify-center rounded-xl',
          'bg-brand-deep/95 ring-1 ring-black/5 shadow-sm',
          // super clear hover feedback (TEMP)
          'transition-transform duration-200 ease-out',
          'hover:scale-[1.12] hover:shadow-lg hover:ring-2 hover:ring-brand-deep/40',
          'group-hover:scale-[1.12] group-hover:shadow-lg group-hover:ring-2 group-hover:ring-brand-deep/40',
          // ensure this element can receive hover
          'pointer-events-auto'
        )}
        aria-hidden="true"
      >
        <AnimatedLogo
          src={LOGO_SRC}
          alt="Lex Atlas"
          width={22}
          height={22}
          priority
          variant="header"
          className={clsx(
            // allow brightness tweak on hover (logo itself ignores pointer events so parent gets hover)
            'pointer-events-none transition duration-200 ease-out',
            'group-hover:brightness-110'
          )}
        />
      </span>

      {/* brand label */}
      <span className="sr-only md:not-sr-only md:inline">Lex Atlas</span>
    </Link>
  )
}
