'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CTA, NAV } from '@/lib/site-nav'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open main menu"
        className="click-ink inline-flex items-center justify-center rounded-xl2 p-2 text-brand-navy border border-transparent hover:border-brand-navy/20"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden">
            <div className="fixed inset-0 z-50" onClick={() => setOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-xl2 p-2 text-brand-navy"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="space-y-2 py-6">
                    {NAV.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-brand-navy hover:bg-brand-muted"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6 space-y-3">
                    <Button asChild variant="secondary" className="w-full">
                      <Link href={CTA.browse.href}>{CTA.browse.label}</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href={CTA.get.href}>{CTA.get.label}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


