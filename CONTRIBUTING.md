# Contributing to LexAtlas

## PR Rules
- **Do not merge** unless all checks are green:
  - `ci (20.11.1)` — lint → typecheck → build
  - `e2e (20.11.1)` — Playwright smoke tests
  - `lighthouse` — performance and accessibility guardrails
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


