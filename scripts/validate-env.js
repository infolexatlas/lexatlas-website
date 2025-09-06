// scripts/validate-env.js
'use strict';

/**
 * Soft-but-clear env validator for CI/Vercel.
 * Fails ONLY if required public envs are missing.
 */

const REQUIRED = ['NEXT_PUBLIC_BASE_URL', 'NEXT_PUBLIC_PLAUSIBLE_DOMAIN'];
const OPTIONAL = ['STRIPE_SECRET_KEY', 'SENTRY_DSN', 'SENTRY_AUTH_TOKEN'];

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

  for (const key of REQUIRED) {
    const ok = truthy(process.env[key]);
    rows.push([`REQ  ${key}`, ok ? '✅ present' : '❌ MISSING', '']);
    if (!ok) missing.push(key);
  }

  for (const key of OPTIONAL) {
    const ok = truthy(process.env[key]);
    rows.push([`OPT  ${key}`, ok ? '✅ present' : '⚠️  missing (optional)', '']);
  }

  printTable(rows);

  if (missing.length) {
    console.error(`\n❌ Missing REQUIRED env vars: ${missing.join(', ')}`);
    process.exit(1);
  } else {
    console.log('\n✅ Env validation passed.');
  }
})();
