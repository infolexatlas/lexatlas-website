#!/usr/bin/env node
'use strict';

/**
 * Soft-but-clear env validator for CI/Vercel.
 * Fails ONLY if required public envs are missing.
 */

const REQUIRED = ['NEXT_PUBLIC_BASE_URL', 'NEXT_PUBLIC_PLAUSIBLE_DOMAIN'];
const OPTIONAL = ['STRIPE_SECRET_KEY', 'SENTRY_DSN', 'SENTRY_AUTH_TOKEN'];
const STRIPE_PRICE_IDS = [
  'STRIPE_PRICE_FRA_USA', 'STRIPE_PRICE_FRA_CAN', 'STRIPE_PRICE_FRA_GBR',
  'STRIPE_PRICE_FRA_DEU', 'STRIPE_PRICE_FRA_ESP', 'STRIPE_PRICE_FRA_ITA',
  'STRIPE_PRICE_FRA_PRT', 'STRIPE_PRICE_FRA_CHE', 'STRIPE_PRICE_FRA_BEL',
  'STRIPE_PRICE_FRA_AUS'
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

  console.log('== ENV VALIDATION ==');
  console.log(`Context: VERCEL=${ctx.VERCEL} VERCEL_ENV=${ctx.VERCEL_ENV} NODE_ENV=${ctx.NODE_ENV}`);

  const rows = [];
  const missing = [];

  // Auto-populate on Vercel if REQUIRED are missing but VERCEL_URL is available
  if (!process.env.NEXT_PUBLIC_BASE_URL && process.env.VERCEL_URL) {
    process.env.NEXT_PUBLIC_BASE_URL = `https://${process.env.VERCEL_URL}`;
  }
  if (!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && process.env.NEXT_PUBLIC_BASE_URL) {
    try {
      const u = new URL(process.env.NEXT_PUBLIC_BASE_URL);
      process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN = u.hostname;
    } catch {}
  }

  // Provide sensible defaults for version strip envs if not set
  if (!process.env.NEXT_PUBLIC_COMMIT_SHA) {
    process.env.NEXT_PUBLIC_COMMIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || 'dev';
  }
  if (!process.env.NEXT_PUBLIC_BRANCH) {
    process.env.NEXT_PUBLIC_BRANCH = process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_REF_NAME || process.env.GITHUB_REF || 'dev';
  }
  if (!process.env.NEXT_PUBLIC_BUILD_TIME) {
    process.env.NEXT_PUBLIC_BUILD_TIME = new Date().toISOString();
  }

  for (const key of REQUIRED) {
    const ok = truthy(process.env[key]);
    rows.push([`REQ  ${key}`, ok ? '✅ present' : '❌ MISSING', '']);
    if (!ok) missing.push(key);
  }

  for (const key of OPTIONAL) {
    const ok = truthy(process.env[key]);
    rows.push([`OPT  ${key}`, ok ? '✅ present' : '⚠️  missing (optional)', '']);
  }

  // Check Stripe price IDs
  const missingPriceIds = [];
  for (const key of STRIPE_PRICE_IDS) {
    const ok = truthy(process.env[key]);
    rows.push([`PRICE ${key}`, ok ? '✅ present' : '⚠️  missing (optional)', '']);
    if (!ok) missingPriceIds.push(key);
  }

  printTable(rows);

  // Log missing price IDs for visibility
  if (missingPriceIds.length > 0) {
    console.log(`\n⚠️  Missing Stripe price IDs (${missingPriceIds.length}/${STRIPE_PRICE_IDS.length}): ${missingPriceIds.join(', ')}`);
    console.log('   These are optional but needed for checkout functionality.');
  }

  if (missing.length) {
    console.error(`\n❌ Missing REQUIRED env vars: ${missing.join(', ')}`);
    process.exit(1);
  } else {
    console.log('\n✅ Env validation passed.');
  }
})();
