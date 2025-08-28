'use client'

import { useState, useEffect } from 'react'
import { X, Gift } from 'lucide-react'

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

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center space-x-2">
          <Gift className="w-4 h-4" />
          <span className="text-sm font-medium">
            🎉 New: Get 50% off your second kit when you buy the bundle!
          </span>
          <button
            onClick={handleDismiss}
            className="ml-4 p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
