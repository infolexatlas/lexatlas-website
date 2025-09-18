import './globals.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CookieBanner } from '@/components/cookie-banner'
import { JsonLd } from '@/components/JsonLd'
import { VitalsReporter } from '@/components/VitalsReporter'
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
  metadataBase: new URL('https://lex-atlas.com'),
  title: { 
    default: 'LexAtlas — Cross-Border Marriage Kits', 
    template: '%s' 
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "icon", url: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  other: {
    'theme-color': '#1A2E4F',
  },
  manifest: "/manifest.webmanifest",
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
        {/* Preload flag images for faster kit page loads */}
        <link 
          rel="preload" 
          as="image" 
          href="/flags/fr.svg" 
          type="image/svg+xml"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/flags/it.svg" 
          type="image/svg+xml"
        />
        <link 
          rel="preload" 
          as="image" 
          href="/flags/ch.svg" 
          type="image/svg+xml"
        />
        
        {/* Explicit favicon links for better browser support */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="/_next/static/media/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        
        {/* Additional Open Graph meta tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:site" content="@lexatlas" />
        <meta name="twitter:creator" content="@lexatlas" />
        
        {/* Logo meta tags for better Google visibility */}
        <meta property="og:logo" content="https://lex-atlas.com/logo-180x180.png" />
        <meta name="logo" content="https://lex-atlas.com/logo-180x180.png" />
        <link rel="logo" href="https://lex-atlas.com/logo-180x180.png" />
        
        {/* Plausible Analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 antialiased overflow-x-hidden`}>
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </div>
        <CookieBanner />
        <Analytics />
        <VitalsReporter />
        
        {/* Global JSON-LD Structured Data */}
        <JsonLd data={getOrganizationSchema()} />
        <JsonLd data={getWebsiteSchema()} />
      </body>
    </html>
  )
  
  devLog('layout:render:done');
}
