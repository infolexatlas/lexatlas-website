# Contributing to LexAtlas

## PR Rules
- **Do not merge** unless all checks are green:
  - `ci (20.11.1)` — lint → typecheck → build
  - `e2e (20.11.1)` — Playwright smoke tests
  - `lighthouse` — performance and accessibility guardrails
  - `visual (PR)` — Playwright visual regression (PRs are blocking)
- Follow our PR template checklist.
- Prefer small, focused PRs.

## Local Dev
```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:e2e           # Playwright
npm run lighthouse:ci      # optional local run
npm run scan:licenses      # license compliance scan (production deps)
```

## Branches
- feature: `feat/<topic>`
- fix: `fix/<topic>`
- chore/docs/ci/test: `chore/<topic>` / `docs/<topic>` / `ci/<topic>` / `test/<topic>`

## Commit Style
- Conventional commits: `feat`, `fix`, `chore`, `docs`, `ci`, `test`, `refactor`, `perf`

### Commit & PR style (Conventional Commits)

Examples:
- `feat(kits): add XYZ`
- `fix(middleware): handle em dash in slugs`
- `chore(ci): add Size Limit guardrails`
- `docs: update README for Sentry setup`

## Secrets / Safety
- Never commit secrets.
- Use env vars documented in `README` and `.env.local.example`.


## License Scanning

Run a dependency license scan locally to ensure compliance:

```bash
npm run scan:licenses
```

This scans production dependencies, summarizes results, and fails on disallowed licenses (e.g., GPL). Use `--excludePackages` in the script to whitelist specific packages if needed.

---

For vulnerability reporting and response SLAs, see our [Security Policy](./SECURITY.md).

## Visual Regression (local-only)

Visual Regression is disabled in CI. To run locally against a production build:

```bash
npm run build
(npm start & echo $! > .next_pid)
npx wait-on http://127.0.0.1:3000
BASE_URL=http://127.0.0.1:3000 PLAYWRIGHT_VR=1 npm run test:vr
kill -9 $(cat .next_pid) && rm .next_pid
```

Update snapshots after intentional UI changes:

```bash
BASE_URL=http://127.0.0.1:3000 PLAYWRIGHT_VR=1 npx playwright test -g @vr --update-snapshots
```

If tests complain about missing browsers locally, install Playwright browsers:

```bash
npx playwright install
# On Linux with missing system deps:
npx playwright install --with-deps
```

## Bundle size

We enforce JS budgets with Size Limit and provide analyzer reports for PR review.

- Run budgets locally:

```bash
npm run size
```

- Generate analyzer report:

```bash
npm run analyze
```

If a PR fails Size Limit, reduce payload or justify and adjust limits in `.size-limit.json` within the same PR, stating rationale and current measured sizes.


