import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
// Sentry plugin wrapper (disabled for now - causing API errors)
const maybeWithSentry = (config: NextConfig) => config;

/**
 * Minimal config to debug API errors
 */
const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
    ],
    localPatterns: [
      {
        pathname: '/logo/.*',
        search: '',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default maybeWithSentry(withBundleAnalyzer(nextConfig));
