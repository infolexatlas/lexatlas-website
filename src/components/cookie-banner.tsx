'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HydrationGate } from './HydrationGate'

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  return (
    <HydrationGate>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="h-6 w-6 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p>
                      We use cookies to enhance your experience and analyze site usage. 
                      By continuing to use our site, you consent to our use of cookies.{' '}
                      <Link href="/legal/cookies" className="text-brand-gold underline underline-offset-2 hover:text-brand-gold/90">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={declineCookies}
                    className="text-sm"
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    onClick={acceptCookies}
                    className="text-sm"
                  >
                    Accept
                  </Button>
                  <button
                    onClick={declineCookies}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close cookie banner"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </HydrationGate>
  )
}
