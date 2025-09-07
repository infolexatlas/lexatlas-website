"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/layout/Logo'
import MainNav from '@/components/layout/MainNav'
import { Button } from '@/components/ui/button'
import MobileNav from '@/components/layout/MobileNav'
import { CTA } from '@/lib/site-nav'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background,backdrop-filter,box-shadow] ${
        scrolled
          ? 'bg-[--la-surface]/70 backdrop-blur supports-[backdrop-filter]:bg-[--la-surface]/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <div className="shrink-0">
          <Logo />
        </div>
        <MainNav />
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="secondary" className="click-ink active:translate-y-px">
            <Link href={CTA.browse.href}>{CTA.browse.label}</Link>
          </Button>
          <Button asChild className="click-ink active:translate-y-px">
            <Link href={CTA.get.href}>{CTA.get.label}</Link>
          </Button>
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export { Header }
