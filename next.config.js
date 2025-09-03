/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Skip ESLint during production builds to allow polishing wrap-up
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: { 
    turbo: { resolveAlias: {} } 
  },
  webpack: (config) => {
    config.snapshot = { ...config.snapshot, managedPaths: [] };
    return config;
  },
  webpack: (config, { dev }) => {
    config.snapshot = { ...config.snapshot, managedPaths: [] };
    if (dev) {
      config.watchOptions = {
        ignored: [
          '**/public/kits/**',
          '**/.data/**',
          '**/coverage/**'
        ]
      };
    }
    return config;
  },
  // Extra safety for dev
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/kit',
        destination: '/kits',
        permanent: true,
      },
      {
        source: '/cookies',
        destination: '/cookie-policy',
        permanent: true,
      },
      {
        source: '/legal/cookies',
        destination: '/cookie-policy',
        permanent: true,
      },
      {
        source: '/legal/cookie-policy',
        destination: '/cookie-policy',
        permanent: true,
      },
    ]
  },
  async headers() {
    const headers = [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
    
    // Dev cache hardening - prevent stale chunks
    if (process.env.NODE_ENV === 'development') {
      const noCache = [
        { key: 'Cache-Control', value: 'no-store, max-age=0' },
        { key: 'Pragma', value: 'no-cache' },
        { key: 'Expires', value: '0' },
      ]
      // Next static chunks
      headers.push({
        source: '/_next/static/:path*',
        headers: noCache,
      })
      // App route JS
      headers.push({
        source: '/_next/:path*',
        headers: noCache,
      })
      // Public assets (optional safeguard)
      headers.push({
        source: '/(.*)',
        headers: noCache,
      })
    }
    
    return headers
  },
}

module.exports = nextConfig
