import './globals.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CookieBanner } from '@/components/cookie-banner'
import { AnnouncementBar } from '@/components/AnnouncementBar'
import { JsonLd } from '@/components/JsonLd'
import { PageTransition } from '@/components/ui/page-transition'
import { IS_DEV, RESEND_API_KEY } from '@/lib/env'
import { devLog } from '@/lib/devLog'
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/jsonLd'
import './globals.css'



// One-time check for missing RESEND_API_KEY in development
if (IS_DEV && !RESEND_API_KEY) {
  console.warn('[Email] RESEND_API_KEY not set — emails will NOT be sent in development.')
}

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/maskable-192.png" }
    ]
  },
  other: {
    'theme-color': '#1A2E4F',
  },
  manifest: "/manifest.webmanifest",
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
  devLog('layout:render:start');
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical images */}
        <link 
          rel="preload" 
          as="image" 
          href="/logo/lexatlas.svg" 
          type="image/svg+xml"
        />
        
        {/* Plausible Analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 antialiased`}>
        <div className="min-h-screen flex flex-col">
          <AnnouncementBar />
          <Header />
          <main className="flex-1 container mx-auto px-4 md:px-6">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </div>
        <CookieBanner />
        <Analytics />
        
        {/* Global JSON-LD Structured Data */}
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema()} />
      </body>
    </html>
  )
  
  devLog('layout:render:done');
}
