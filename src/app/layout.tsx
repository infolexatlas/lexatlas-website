import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CookieBanner } from '@/components/cookie-banner'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LexAtlas - Your Global Legal Compass',
  description: 'Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.',
  keywords: ['legal', 'international', 'marriage', 'cross-border', 'pdf', 'kits'],
  authors: [{ name: 'LexAtlas Team' }],
  creator: 'LexAtlas',
  publisher: 'LexAtlas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://lexatlas.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  other: {
    'theme-color': '#0A2342',
  },
  openGraph: {
    title: 'LexAtlas - Your Global Legal Compass',
    description: 'Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.',
    url: '/',
    siteName: 'LexAtlas',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'LexAtlas - Your Global Legal Compass',
      },
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: 'LexAtlas - Your Global Legal Compass',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexAtlas - Your Global Legal Compass',
    description: 'Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.',
    images: ['/og/home.svg', '/og/home.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 antialiased`}>
        <div className="min-h-screen flex flex-col">
          <AnnouncementBar />
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            {children}
          </main>
          <Footer />
        </div>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
