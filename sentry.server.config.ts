import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || undefined,
  tracesSampleRate: 0.05,
  replaysOnErrorSampleRate: 0.1,
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
});


