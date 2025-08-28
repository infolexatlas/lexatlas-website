'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCountryName } from '@/lib/countries'

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
  }, [country1, country2, pair])

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

  if (!isPaid) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Lock className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Purchase Required
              </h3>
              <p className="text-sm text-gray-600">
                Complete your purchase to download the {fileName} for {displayName}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!pdfExists) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                PDF Not Available
              </h3>
              <p className="text-sm text-gray-600">
                The PDF guide for {displayName} is not uploaded yet. Please contact us for assistance.
              </p>
            </div>
            <Button variant="outline" asChild>
              <a href="/contact">Contact Support</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Download Ready
              </h3>
              <p className="text-sm text-gray-600">
                Your {fileName} for {displayName} is ready for download
              </p>
            </div>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
