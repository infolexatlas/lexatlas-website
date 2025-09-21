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
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 min-h-[80px] border-b border-black/10 transition-[background,backdrop-filter,box-shadow] ${
        scrolled
          ? 'bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)]'
          : 'bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-none'
      }`}
      role="banner"
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
