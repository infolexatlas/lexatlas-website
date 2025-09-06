// scripts/debug-env.js
'use strict';

const KEYS = [
  'NEXT_PUBLIC_BASE_URL',
  'NEXT_PUBLIC_PLAUSIBLE_DOMAIN',
  'STRIPE_SECRET_KEY',
  'SENTRY_DSN',
  'SENTRY_AUTH_TOKEN',
];

function truthy(v) {
  return v !== undefined && v !== null && String(v).trim() !== '';
}
function pad(s, n) {
  s = String(s);
  return s + ' '.repeat(Math.max(0, n - s.length));
}
function printTable(rows) {
  const col1 = Math.max(...rows.map(r => r[0].length)) + 2;
  const col2 = Math.max(...rows.map(r => r[1].length)) + 2;
  for (const [k, v, note] of rows) {
    console.log(`${pad(k, col1)}| ${pad(v, col2)}${note ?? ''}`);
  }
}

(function main() {
  const ctx = {
    VERCEL: process.env.VERCEL || '',
    VERCEL_ENV: process.env.VERCEL_ENV || '',
    NODE_ENV: process.env.NODE_ENV || '',
    CI: process.env.CI || '',
    GITHUB_ACTIONS: process.env.GITHUB_ACTIONS || '',
  };
  console.log('== ENV DEBUG ==');
  console.log(`Context: VERCEL=${ctx.VERCEL} VERCEL_ENV=${ctx.VERCEL_ENV} NODE_ENV=${ctx.NODE_ENV}`);

  const rows = [];
  for (const key of KEYS) {
    const ok = truthy(process.env[key]);
    rows.push([key, ok ? '✅ present' : '⚠️  missing', '']);
  }
  printTable(rows);
  console.log('\n(Info only; does not fail.)');
})();

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

