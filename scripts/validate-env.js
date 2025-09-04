#!/usr/bin/env node
/* eslint-disable no-console */

const requiredForAll = [
  // Sentry DSN is optional locally but required on Preview/Prod per guardrails
];

const requiredForPreviewAndProd = [
  "SENTRY_DSN",
  // Add other critical secrets used at runtime
  // Example Stripe server key if used server-side
  "STRIPE_SECRET_KEY",
];

const vercelEnv = process.env.VERCEL_ENV || ""; // production | preview | development (for Vercel)
const nodeEnv = process.env.NODE_ENV || ""; // production | development

const isVercel = !!process.env.VERCEL;
const isPreviewOrProd = vercelEnv === "preview" || vercelEnv === "production";

const missing = [];

for (const key of requiredForAll) {
  if (!process.env[key]) missing.push(key);
}

if (isVercel && isPreviewOrProd) {
  for (const key of requiredForPreviewAndProd) {
    if (!process.env[key]) missing.push(key);
  }
}

if (missing.length > 0) {
  console.error(
    `\nEnvironment validation failed. Missing required variables: ${missing.join(", ")}\n` +
      `VERCEL_ENV=${vercelEnv} NODE_ENV=${nodeEnv} VERCEL=${String(isVercel)}\n`
  );
  process.exit(1);
} else {
  console.log("Environment validation passed.");
}


