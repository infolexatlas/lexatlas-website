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
    default: 'Lex Atlas — Cross-Border Marriage Kits', 
    template: '%s' 
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="/_next/static/media/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        
        {/* Additional Open Graph meta tags */}
        <meta property="og:image" content="https://lex-atlas.com/og/home.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:site" content="@lexatlas" />
        <meta name="twitter:creator" content="@lexatlas" />
        
        {/* Logo meta tags for better Google visibility */}
        <meta property="og:logo" content="https://lex-atlas.com/logo-192x192.png" />
        <meta name="logo" content="https://lex-atlas.com/logo-192x192.png" />
        <link rel="logo" href="https://lex-atlas.com/logo-192x192.png" />
        
        {/* Google Search Console specific meta tags */}
        <meta name="google-site-verification" content="" />
        <meta name="application-name" content="Lex Atlas" />
        <meta name="msapplication-TileImage" content="/logo-192x192.png" />
        
        {/* Additional favicon and logo meta tags for Google Search */}
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-512x512.png" />
        <meta name="msapplication-TileColor" content="#1A2E4F" />
        
        {/* Apple specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lex Atlas" />
        
        {/* Windows/IE browser config */}
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
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
        <Header />
        <main className="min-h-screen w-full overflow-x-hidden pt-20">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
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
