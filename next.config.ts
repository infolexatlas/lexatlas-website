import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
// Sentry plugin wrapper (optional)
// We use require here to avoid type dependency when the package is not yet installed
// eslint-disable-next-line @typescript-eslint/no-var-requires
const maybeWithSentry = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { withSentryConfig } = require("@sentry/nextjs");
    return (config: NextConfig) => withSentryConfig(config, { silent: true });
  } catch {
    return (config: NextConfig) => config;
  }
})();

import { getSecurityHeaders } from './src/lib/securityHeaders';

/**
 * Add modern security headers.
 * Note: CSP is set to Report-Only initially so we can observe violations in production
 * without breaking functionality. Once stable, switch to enforcing by replacing
 * the header key via CONTENT_SECURITY_POLICY_MODE=block.
 */
const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Optimize bundle splitting (simplified)
  webpack: (config, { dev }) => {
    if (dev) {
      // Reduce compilation overhead in development
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    return config;
  },
  async headers() {
    const headerTuples = getSecurityHeaders();
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: headerTuples.map(([key, value]) => ({ key, value })),
      },
    ];
  },
};

export default maybeWithSentry(withBundleAnalyzer(nextConfig));
