'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'

export function VitalsReporter() {
  useEffect(() => {
    const sendToAnalytics = (metric: any) => {
      // Send to our API endpoint
      if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
        navigator.sendBeacon(
          '/api/vitals',
          JSON.stringify(metric)
        )
      } else {
        // Fallback for older browsers
        fetch('/api/vitals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metric),
        }).catch(console.error)
      }
    }

    // Track Core Web Vitals
    onLCP(sendToAnalytics)
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics)
    onFCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }, [])

  return null
}
