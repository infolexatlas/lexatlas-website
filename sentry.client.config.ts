import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || undefined;
const vercelEnv = process.env.VERCEL_ENV;
const nodeEnv = process.env.NODE_ENV;
const isPreviewOrProd = vercelEnv === "preview" || vercelEnv === "production" || (!vercelEnv && nodeEnv === "production");

if (dsn && isPreviewOrProd) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.05,
    replaysOnErrorSampleRate: 0.1,
    environment: vercelEnv || nodeEnv,
  });
}


