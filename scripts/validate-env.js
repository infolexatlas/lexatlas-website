#!/usr/bin/env node
const requiredKeys = [
  'NEXT_PUBLIC_BASE_URL',
  'NEXT_PUBLIC_PLAUSIBLE_DOMAIN',
];

const optionalKeys = [
  'STRIPE_SECRET_KEY',
  'SENTRY_DSN',
  'SENTRY_AUTH_TOKEN',
];

function formatRow(cells, widths) {
  return cells
    .map((cell, i) => String(cell).padEnd(widths[i], ' '))
    .join('  ');
}

function buildTable(rows) {
  const widths = rows[0].map((_, i) =>
    Math.max(...rows.map(r => String(r[i]).length))
  );
  const lines = [];
  lines.push(formatRow(rows[0], widths));
  lines.push(formatRow(widths.map(w => '-'.repeat(w)), widths));
  for (let i = 1; i < rows.length; i++) {
    lines.push(formatRow(rows[i], widths));
  }
  return lines.join('\n');
}

function printContext() {
  const ctx = {
    VERCEL: process.env.VERCEL ?? '',
    VERCEL_ENV: process.env.VERCEL_ENV ?? '',
    NODE_ENV: process.env.NODE_ENV ?? '',
  };
  console.log(`Context: VERCEL=${ctx.VERCEL} VERCEL_ENV=${ctx.VERCEL_ENV} NODE_ENV=${ctx.NODE_ENV}`);
}

function main() {
  const rows = [["Variable", "Required", "Present", "Value"]];
  const missingRequired = [];

  for (const key of requiredKeys) {
    const value = process.env[key];
    const present = value ? 'yes' : 'no';
    if (!value) missingRequired.push(key);
    rows.push([key, 'yes', present, value ? value : '']);
  }

  for (const key of optionalKeys) {
    const value = process.env[key];
    const present = value ? 'yes' : 'no';
    rows.push([key, 'no', present, value ? value : '']);
  }

  printContext();
  console.log(buildTable(rows));

  if (missingRequired.length > 0) {
    console.error(`Missing required env: ${missingRequired.join(', ')}`);
    process.exit(1);
  }
  process.exit(0);
}

main();

#!/usr/bin/env node
/* eslint-disable no-console */

const REQUIRED = ["NEXT_PUBLIC_BASE_URL", "NEXT_PUBLIC_PLAUSIBLE_DOMAIN"];
const OPTIONAL = ["STRIPE_SECRET_KEY", "SENTRY_DSN", "SENTRY_AUTH_TOKEN"];

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true" || !!process.env.VERCEL;
const vercelEnv = process.env.VERCEL_ENV || ""; // production | preview | development (Vercel)
const nodeEnv = process.env.NODE_ENV || ""; // production | development

const missingReq = REQUIRED.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
const missingOpt = OPTIONAL.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");

function pad(s, n) {
  return (s + " ".repeat(n)).slice(0, n);
}

console.log("== ENV VALIDATION ==");
console.log(`Context: VERCEL=${String(!!process.env.VERCEL)} VERCEL_ENV=${vercelEnv} NODE_ENV=${nodeEnv}`);

for (const k of REQUIRED) {
  console.log(`REQ  ${pad(k, 30)} = ${process.env[k] ? "✅ set" : "❌ MISSING"}`);
}
for (const k of OPTIONAL) {
  console.log(`OPT  ${pad(k, 30)} = ${process.env[k] ? "✅ set" : "⚠️  missing (optional)"}`);
}

if (missingReq.length) {
  console.error("\n❌ Missing REQUIRED env vars:", missingReq.join(", "));
  process.exit(1);
}

if (missingOpt.length) {
  console.warn("\n⚠️ Missing OPTIONAL env vars:", missingOpt.join(", "));
  if (isVercel) {
    console.warn("Proceeding on Vercel with optional vars missing.");
  }
}

console.log("\n✅ Environment validation passed.");
process.exit(0);
