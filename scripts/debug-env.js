#!/usr/bin/env node
/* eslint-disable no-console */

const REQUIRED = ["NEXT_PUBLIC_BASE_URL", "NEXT_PUBLIC_PLAUSIBLE_DOMAIN"];
const OPTIONAL = ["STRIPE_SECRET_KEY", "SENTRY_DSN", "SENTRY_AUTH_TOKEN"];

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true" || !!process.env.VERCEL;
const vercelEnv = process.env.VERCEL_ENV || "";
const nodeEnv = process.env.NODE_ENV || "";

function pad(s, n) { return (s + " ".repeat(n)).slice(0, n); }

console.log("== ENV DEBUG (NO-FAIL) ==");
console.log(`Context: VERCEL=${String(!!process.env.VERCEL)} VERCEL_ENV=${vercelEnv} NODE_ENV=${nodeEnv}`);
for (const k of REQUIRED) {
  console.log(`REQ  ${pad(k,30)} = ${process.env[k] ? "✅ set" : "❌ MISSING"}`);
}
for (const k of OPTIONAL) {
  console.log(`OPT  ${pad(k,30)} = ${process.env[k] ? "✅ set" : "⚠️  missing (optional)"}`);
}
console.log("\nDone. This script never exits non-zero.");

