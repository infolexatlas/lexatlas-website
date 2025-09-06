import { execSync } from 'node:child_process';

function env(v){ return process.env[v] && String(process.env[v]).trim(); }

const fromSecret = env('PROD_BASE_URL');
if (fromSecret) { console.log(fromSecret); process.exit(0); }

const fromVercelEnv = env('VERCEL_PROD_URL');
if (fromVercelEnv) { console.log(fromVercelEnv); process.exit(0); }

try {
  // Try vercel CLI list
  const out = execSync('npx --yes vercel ls --prod --json', { stdio: ['ignore','pipe','pipe'] }).toString();
  const j = JSON.parse(out);
  // j.projects[]; each has targets.production.url or try deployments
  // Some orgs return deployments via 'vercel ls'; fallback to 'vercel deployments --prod --limit 1 --json'
  if (Array.isArray(j?.projects) && j.projects.length) {
    const p = j.projects[0];
    const url = p?.targets?.production?.url || p?.latestDeployments?.find?.(d=>d?.target==='production')?.url;
    if (url) { console.log(url.startsWith('http')?url:`https://${url}`); process.exit(0); }
  }
  // fallback
  const out2 = execSync('npx --yes vercel deployments --prod --limit 1 --json', { stdio: ['ignore','pipe','pipe'] }).toString();
  const d = JSON.parse(out2);
  const dep = Array.isArray(d)? d[0]: d?.deployments?.[0];
  const url = dep?.url;
  if (url) { console.log(url.startsWith('http')?url:`https://${url}`); process.exit(0); }
} catch(e) {
  // ignore; we'll fail below
}

console.error('Could not resolve a production BASE_URL. Set a GitHub secret PROD_BASE_URL to your Vercel prod URL (e.g., https://yourapp.vercel.app) or provide VERCEL_PROD_URL. Optionally login vercel CLI.');
process.exit(1);
