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

/**
 * Add modern security headers.
 * Note: CSP is set to Report-Only initially so we can observe violations in production
 * without breaking functionality. Once stable, switch to enforcing by replacing
 * the 'Content-Security-Policy-Report-Only' header key with 'Content-Security-Policy'.
 */
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          // Transport & MIME hardening
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Privacy & permissions
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // CSP (report-only for first rollout)
          // To enforce later: replace the key below with 'Content-Security-Policy'
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              // Scripts: Next, Plausible, Stripe; allow inline/eval for Next dev features (can tighten later)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' plausible.io js.stripe.com",
              // XHR / fetch endpoints
              "connect-src 'self' plausible.io api.stripe.com",
              // Images (allow data/blob for Next/Image placeholders)
              "img-src 'self' data: blob:",
              // Styles (inline for Next/Tailwind injection)
              "style-src 'self' 'unsafe-inline'",
              // Fonts
              "font-src 'self' data:",
              // Frames (Stripe Checkout)
              "frame-src js.stripe.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default maybeWithSentry(withBundleAnalyzer(nextConfig));
