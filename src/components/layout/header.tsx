'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Kits', href: '/kits' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between" aria-label="Top">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo-lexatlas.svg" 
                alt="LexAtlas" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-brand-deep hover:text-brand-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA and mobile menu button */}
          <div className="flex items-center gap-x-4">
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/kits">Browse Kits</Link>
            </Button>
            <Button asChild className="hidden sm:flex">
              <Link href="/kits/marriage-kit">Get Marriage Kit</Link>
            </Button>
            
            <button
              type="button"
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brand-deep"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden"
            >
              <div className="fixed inset-0 z-50" />
              <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <img 
                      src="/logo-lexatlas.svg" 
                      alt="LexAtlas" 
                      className="h-8 w-auto"
                    />
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-brand-deep"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-brand-deep hover:bg-brand-muted"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="py-6 space-y-3">
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/kits">Browse Kits</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/kits/marriage-kit">Get Marriage Kit</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
