'use client'

import { useState, useEffect } from 'react'
import { X, Gift } from 'lucide-react'
import { HydrationGate } from './HydrationGate'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed')
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('announcement-dismissed', 'true')
  }

  return (
    <HydrationGate>
      {isVisible && (
        <div className="bg-brand-navy text-white shadow-soft">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-brand-gold/20 to-brand-softGold/20 rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-brand-gold" />
              </div>
              <span className="text-sm font-medium">
                🎉 New: Get 50% off your second kit when you buy the bundle!
              </span>
              <button
                onClick={handleDismiss}
                className="ml-4 p-2 hover:bg-white/10 rounded-full transition-all duration-250 hover:scale-110"
                aria-label="Dismiss announcement"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </HydrationGate>
  )
}
