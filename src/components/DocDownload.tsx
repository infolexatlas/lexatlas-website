'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCountryName } from '@/lib/countries'
import { HydrationGate } from './HydrationGate'

interface DocDownloadProps {
  productId: string
  pair: string
  country1: string
  country2: string
  pdfExists: boolean
  pdfUrl?: string
  fileName?: string
  className?: string
}

export function DocDownload({ 
  productId,
  pair, 
  country1,
  country2,
  pdfExists,
  pdfUrl,
  fileName = 'Marriage Kit',
  className 
}: DocDownloadProps) {
  const [isPaid, setIsPaid] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  // Get country names for display
  const country1Name = getCountryName(country1)
  const country2Name = getCountryName(country2)
  const displayName = country1Name && country2Name ? `${country1Name} ↔ ${country2Name}` : pair

  useEffect(() => {
    // Check if user has paid (multiple methods)
    const checkPaymentStatus = () => {
      // Method 1: Check URL parameter
      const urlParams = new URLSearchParams(window.location.search)
      const paidParam = urlParams.get('paid')
      
      // Method 2: Check for paid cookie (set by success page)
      const hasPaidCookie = document.cookie.includes('x-paid=1')
      
      // Method 3: Check session storage (fallback)
      const hasPaidSession = sessionStorage.getItem('lexatlas-paid') === 'true'
      
      if (paidParam === '1' || hasPaidCookie || hasPaidSession) {
        setIsPaid(true)
        // Use provided pdfUrl or fallback to API endpoint
        setDownloadUrl(pdfUrl || `/api/download/${pair}`)
      }
    }

    checkPaymentStatus()
  }, [country1, country2, pair, pdfUrl])

  const handleDownload = async () => {
    if (!isPaid || !downloadUrl) return

    setIsDownloading(true)
    
    try {
      const response = await fetch(downloadUrl, {
        method: 'GET',
        credentials: 'include', // Include cookies
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const downloadFileName = `${fileName}-${pair}.pdf`
        a.download = downloadFileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error('Download failed:', response.statusText)
        alert('Download failed. Please try again or contact support.')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('Download failed. Please try again or contact support.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <HydrationGate>
      {!isPaid ? (
        <Card className={className}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Purchase Required
                </h3>
                <p className="text-gray-600 text-sm">
                  This {displayName} marriage kit requires a valid purchase to download.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={className}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-emerald-700" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Ready to Download
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Your {displayName} marriage kit is ready for download.
                  </p>
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </HydrationGate>
  )
}
