import * as Sentry from "@sentry/nextjs";

export async function register() {
  const dsn = process.env.SENTRY_DSN;
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";

  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: env,
    tracesSampleRate: 0.05,
    replaysOnErrorSampleRate: 0.1,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}


