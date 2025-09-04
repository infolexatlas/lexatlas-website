This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Security & Maintenance

- **Dependabot**: Automatically monitors and updates dependencies.
  - npm updates run daily at 06:00 UTC with grouped minor/patch updates.
  - GitHub Actions updates run weekly on Mondays at 06:00 UTC.
  - Dependabot PRs are labeled `dependencies`.
- **Security Scanning**: Static analysis for JavaScript/TypeScript.
  - Public/GHAS-enabled repos: CodeQL runs on push/PR to `main` and weekly (Mon 07:00 UTC).
  - Private repos without GHAS: Semgrep (OSS rules) runs on push/PR to `main`.

## CI Performance

- The CI workflow caches Next.js build artifacts at `.next/cache` to speed up subsequent builds. The cache key includes OS, `package-lock.json`, `tsconfig.json`, Next config, and source `.ts/.tsx` files to ensure correctness while maximizing reuse.

## Observability

- **Sentry**: Initialized via `instrumentation.ts` (App Router).
  - **Init**: `src` or project root `instrumentation.ts` implements `export async function register()`.
  - **Env**: Add `SENTRY_DSN` to environment (leave empty for local dev). `environment` derives from `VERCEL_ENV` or `NODE_ENV`.
  - **Sampling**: `tracesSampleRate=0.05`, `replaysOnErrorSampleRate=0.1`.
  - **Global Error Boundary**: `app/global-error.tsx` captures unhandled client errors and reports to Sentry.

## Deployment guardrails (Vercel)

- **Preview BASE_URL injection**: On Vercel, `BASE_URL` is computed as `https://$VERCEL_URL` during build if not already provided. This ensures absolute URLs work reliably in Preview (`VERCEL_ENV=preview`).
- **Healthcheck**: `vercel.json` defines a probe hitting `/api/health` before marking the deployment ready.
- **Env validation**: Build runs `scripts/validate-env.js`.
  - Fails deployment on Preview/Production if any of the following are missing:
    - `SENTRY_DSN`
    - `STRIPE_SECRET_KEY` (if Stripe server calls are used)
- **Sentry environments**:
  - Sentry initializes only when `SENTRY_DSN` is set and environment is Preview or Production.
  - `environment` is set from `VERCEL_ENV` (fallback `NODE_ENV`). Replays/errors are reported in Preview/Prod only.

### Required environment variables

- **Preview (`VERCEL_ENV=preview`)**:
  - `SENTRY_DSN`: required
  - `STRIPE_SECRET_KEY`: required if server-side Stripe is used
  - `BASE_URL`: optional (auto-computed)

- **Production (`VERCEL_ENV=production`)**:
  - `SENTRY_DSN`: required
  - `STRIPE_SECRET_KEY`: required if server-side Stripe is used
  - `BASE_URL`: optional (auto-computed)

## Deployment guardrails (Vercel)

- **Preview BASE_URL injection**: On Vercel, `BASE_URL` is computed as `https://$VERCEL_URL` during build if not already provided. This ensures absolute URLs work reliably in Preview (`VERCEL_ENV=preview`).
- **Healthcheck**: `vercel.json` defines a probe hitting `/api/health` before marking the deployment ready.
- **Env validation**: Build runs `scripts/validate-env.js`.
  - Fails deployment on Preview/Production if any of the following are missing:
    - `SENTRY_DSN`
    - `STRIPE_SECRET_KEY` (if Stripe server calls are used)
- **Sentry environments**:
  - Sentry initializes only when `SENTRY_DSN` is set and environment is Preview or Production.
  - `environment` is set from `VERCEL_ENV` (fallback `NODE_ENV`). Replays/errors are reported in Preview/Prod only.

### Required environment variables

- **Preview (`VERCEL_ENV=preview`)**:
  - `SENTRY_DSN`: required
  - `STRIPE_SECRET_KEY`: required if server-side Stripe is used
  - `BASE_URL`: optional (auto-computed)

- **Production (`VERCEL_ENV=production`)**:
  - `SENTRY_DSN`: required
  - `STRIPE_SECRET_KEY`: required if server-side Stripe is used
  - `BASE_URL`: optional (auto-computed)

