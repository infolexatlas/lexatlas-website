#!/bin/sh
set -eu

# Compute BASE_URL for Vercel environments so app can form absolute URLs.
# Priority:
# - If BASE_URL already provided, keep it.
# - On Vercel production, use https://$VERCEL_URL
# - On Vercel preview, use https://$VERCEL_URL

if [ -n "${VERCEL:-}" ]; then
  if [ -z "${BASE_URL:-}" ] && [ -n "${VERCEL_URL:-}" ]; then
    export BASE_URL="https://${VERCEL_URL}"
    echo "Computed BASE_URL=${BASE_URL}"
  else
    echo "Using existing BASE_URL=${BASE_URL:-}"
  fi
fi

node ./scripts/validate-env.js

npm run build --workspaces=false --silent || npx --yes next build


