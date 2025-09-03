'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV } from '@/lib/site-nav'

export default function MainNav() {
  const pathname = usePathname()
  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
      {NAV.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-underline click-ink text-sm transition-transform hover:-translate-y-0.5 active:translate-y-px`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}


