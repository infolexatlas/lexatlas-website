#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(pwd)"
LOG_DIR="$ROOT_DIR/.predeploy_logs"
mkdir -p "$LOG_DIR"
RESULTS_TSV="$LOG_DIR/results.tsv"
: > "$RESULTS_TSV"

ok()   { echo "PASS"; }
bad()  { echo "FAIL"; }
skip() { echo "SKIP"; }

have_script() { npm run | sed '1,/available scripts/d' | awk '{print $1}' | sed 's/://g' | grep -qx "$1"; }

run_log() {
  local name="$1"; shift
  local log="$LOG_DIR/$name.log"
  ( "$@" ) >"$log" 2>&1 && echo "PASS" || { echo "FAIL"; return 1; }
}

rec() { echo -e "$1\t$2" >> "$RESULTS_TSV"; }
get() { awk -F"\t" -v k="$1" '$1==k{print $2}' "$RESULTS_TSV" | tail -n1; }

{
  echo "Project root: $ROOT_DIR"
  echo -n "Node: "; node -v || true
  echo -n "npm:  "; npm -v || true
  echo -n "Playwright: "; npx --yes playwright --version || true
  echo -n "size-limit: "; (npx --yes size-limit --version || npm exec --yes size-limit --version) || true
  echo -n "secretlint: "; npx --yes secretlint --version || true
} | tee "$LOG_DIR/01_env_prep.log" >/dev/null

if run_log 02_npm_ci npm ci; then rec env_prep "$(ok)"; else rec env_prep "$(bad)"; fi

if have_script lint;        then if run_log 10_lint npm run lint;        then rec lint        "$(ok)"; else rec lint        "$(bad)"; fi; else rec lint "$(skip)"; fi
if have_script typecheck;  then if run_log 11_typecheck npm run typecheck;  then rec typecheck  "$(ok)"; else rec typecheck  "$(bad)"; fi; else rec typecheck "$(skip)"; fi
if have_script build;      then if run_log 12_build npm run build;          then rec build      "$(ok)"; else rec build      "$(bad)"; fi; else rec build "$(bad)"; fi
if have_script size;       then if run_log 13_size npm run size;            then rec size       "$(ok)"; else rec size       "$(bad)"; fi; else rec size "$(skip)"; fi
if have_script scan:secrets; then if run_log 14_secret_scan npm run scan:secrets; then rec secret_scan "$(ok)"; else rec secret_scan "$(bad)"; fi; else rec secret_scan "$(skip)"; fi
if have_script scan:licenses; then if run_log 15_license_scan npm run scan:licenses; then rec license_scan "$(ok)"; else rec license_scan "$(bad)"; fi; else rec license_scan "$(skip)"; fi

WEB_READY="FAIL"
START_LOG="$LOG_DIR/20_next_start.log"
NEXT_PID_FILE="$ROOT_DIR/.next_pid"
cleanup() { if [[ -f "$NEXT_PID_FILE" ]]; then kill -9 "$(cat "$NEXT_PID_FILE")" 2>/dev/null || true; rm -f "$NEXT_PID_FILE"; fi }
trap cleanup EXIT

if [[ "$(get build || echo FAIL)" == "PASS" ]]; then
  ( npx --yes next start --hostname 127.0.0.1 --port 3000 & echo $! > "$NEXT_PID_FILE" ) >"$START_LOG" 2>&1 || true
  if npx --yes wait-on "http://127.0.0.1:3000" --timeout 180000 >"$LOG_DIR/21_wait_on.log" 2>&1; then WEB_READY="PASS"; else
    echo "wait-on missing or timed out; falling back to curl polling" | tee -a "$LOG_DIR/21_wait_on.log"
    for i in $(seq 1 60); do
      if curl -sS -o /dev/null -w "%{http_code}" "http://127.0.0.1:3000/" | grep -q '^200$'; then WEB_READY="PASS"; break; fi
      sleep 1
    done
  fi
fi
rec web_ready "$WEB_READY"

SANITY="FAIL"
if [[ "$WEB_READY" == "PASS" ]]; then
  code="$(curl -sS -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ || true)"
  echo "$code" > "$LOG_DIR/22_sanity_code.log"
  [[ "$code" == "200" ]] && SANITY="PASS"
fi
rec sanity_root "$SANITY"

REDIRECT="FAIL"
if [[ "$WEB_READY" == "PASS" ]]; then
  hdrs="$(curl -sS -D - -o /dev/null "http://127.0.0.1:3000/kits/FRA-6CAN?utm=x" || true)"
  printf "%s\n" "$hdrs" | tr '[:upper:]' '[:lower:]' > "$LOG_DIR/23_redirect_headers.txt"
  status_line="$(printf "%s" "$hdrs" | head -n1)"
  loc="$(printf "%s" "$hdrs" | grep -i '^Location:' | awk '{sub(/^Location:[[:space:]]*/,"",$0); print}' | tr -d '\r')"
  if echo "$status_line" | grep -qE '308'; then
    if echo "$loc" | grep -iq '/kits/fra-can?utm=x$'; then REDIRECT="PASS"; fi
  fi
fi
rec redirect_fra6can "$REDIRECT"

SEC_HDRS="FAIL"
if [[ "$WEB_READY" == "PASS" ]]; then
  sec="$(curl -sS -D - -o /dev/null -L "http://127.0.0.1:3000/" | tr '[:upper:]' '[:lower:]' || true)"
  printf "%s\n" "$sec" > "$LOG_DIR/24_security_headers.txt"
  need_ok=0
  for h in strict-transport-security x-content-type-options referrer-policy permissions-policy; do
    if echo "$sec" | grep -q "^$h:"; then :; else need_ok=1; fi
  done
  if echo "$sec" | grep -q '^content-security-policy:' || echo "$sec" | grep -q '^content-security-policy-report-only:'; then :; else need_ok=1; fi
  [[ $need_ok -eq 0 ]] && SEC_HDRS="PASS"
fi
rec security_headers "$SEC_HDRS"

ROBOTS="FAIL"; SITEMAP="FAIL"; SITEMAP_COUNT="0"
if [[ "$WEB_READY" == "PASS" ]]; then
  robots="$(curl -sS http://127.0.0.1:3000/robots.txt || true)"
  printf "%s\n" "$robots" > "$LOG_DIR/25_robots.txt"
  if echo "$robots" | grep -q 'Disallow:[[:space:]]*/checkout' && echo "$robots" | grep -q 'Sitemap:[[:space:]]*https://lexatlas.com/sitemap.xml'; then ROBOTS="PASS"; fi
  sm="$(curl -sS http://127.0.0.1:3000/sitemap.xml || true)"
  printf "%s\n" "$sm" > "$LOG_DIR/26_sitemap.xml"
  SITEMAP_COUNT="$(printf "%s" "$sm" | grep -oE '<loc>[^<]*/kits/[^<]*</loc>' | wc -l | awk '{print $1}')"
  [[ "${SITEMAP_COUNT}" =~ ^[0-9]+$ ]] || SITEMAP_COUNT="0"
  [[ "$SITEMAP_COUNT" -ge 10 ]] && SITEMAP="PASS"
fi
rec robots_txt "$ROBOTS"; rec sitemap_xml "$SITEMAP"; echo "$SITEMAP_COUNT" > "$LOG_DIR/sitemap_count.txt"

E2E="SKIP"; if have_script test:e2e; then if BASE_URL="http://127.0.0.1:3000" npm run -s test:e2e >"$LOG_DIR/30_e2e.log" 2>&1; then E2E="PASS"; else E2E="FAIL"; fi; fi; rec e2e "$E2E"
VR="SKIP"; if have_script test:vr; then mkdir -p "$LOG_DIR/vr"; if BASE_URL="http://127.0.0.1:3000" npm run -s test:vr >"$LOG_DIR/31_vr.log" 2>&1; then VR="PASS"; else VR="FAIL"; for d in playwright-visual-diffs playwright-report test-results; do [[ -d "$d" ]] && cp -a "$d" "$LOG_DIR/vr/" 2>/dev/null || true; done; fi; fi; rec vr "$VR"

VERCEL_FILES="FAIL"; [[ -f vercel.json && -f scripts/vercel-build.sh && -f scripts/validate-env.js ]] && VERCEL_FILES="PASS"; rec vercel_files "$VERCEL_FILES"
ENV_VALIDATOR="FAIL"; ENV_MISSING_SIM="FAIL"
if [[ "$VERCEL_FILES" == "PASS" ]]; then
  if SENTRY_DSN="dummy" STRIPE_SECRET_KEY="dummy" node scripts/validate-env.js >"$LOG_DIR/40_env_validate_present.log" 2>&1; then ENV_VALIDATOR="PASS"; fi
  if node scripts/validate-env.js >"$LOG_DIR/41_env_validate_missing.log" 2>&1; then ENV_MISSING_SIM="FAIL"; else ENV_MISSING_SIM="PASS"; fi
fi
rec env_validator_present "$ENV_VALIDATOR"; rec env_validator_missing_sim "$ENV_MISSING_SIM"

SENTRY_FILES="FAIL"; [[ -f instrumentation.ts || -f src/instrumentation.ts ]] && [[ -f src/app/global-error.tsx ]] && SENTRY_FILES="PASS"; rec sentry_files "$SENTRY_FILES"
SENTRY_DUP_INIT="PASS"; if grep -R --line-number --ignore-case 'Sentry\.init' sentry.*.config.ts 2>/dev/null | tee "$LOG_DIR/50_sentry_grep.log" >/dev/null; then SENTRY_DUP_INIT="FAIL"; else echo "(no Sentry.init found in sentry.*.config.ts)" > "$LOG_DIR/50_sentry_grep.log"; fi; rec sentry_no_dup_init "$SENTRY_DUP_INIT"

cleanup

pass_count=0; fail_count=0
row() {
  local key="$1"; local val; val=$(get "$1"); [ -z "$val" ] && val="SKIP"
  case "$val" in PASS) pass_count=$((pass_count+1));; FAIL) fail_count=$((fail_count+1));; esac
  printf "| %-30s | %-5s |\n" "$key" "$val"
}

{
  echo "# Pre-deploy Validation Report"
  echo
  echo "## Summary"
  echo "| Check                         | Result |"
  echo "|-------------------------------|--------|"
  row env_prep
  row lint
  row typecheck
  row build
  row size
  row secret_scan
  row license_scan
  row web_ready
  row sanity_root
  row redirect_fra6can
  row security_headers
  row robots_txt
  row sitemap_xml
  row e2e
  row vr
  row vercel_files
  row env_validator_present
  row env_validator_missing_sim
  row sentry_files
  row sentry_no_dup_init
  echo
  echo "## Notes / Findings"
  echo "- Sitemap kits count: $(cat "$LOG_DIR/sitemap_count.txt" 2>/dev/null || echo 0)"
  echo "- Logs are saved under \`.predeploy_logs/\`."
  if [ "$(get vr)" = "FAIL" ]; then echo "- Visual regression FAILED. Diffs/artifacts (if any) copied under \`.predeploy_logs/vr/\`."; fi
  echo
  echo "## Debug bundle"
  ls -1 "$LOG_DIR" | sed 's/^/- /' || true
  if [[ -d "$LOG_DIR/vr" ]]; then
    echo
    echo "**VR assets:**"
    find "$LOG_DIR/vr" -maxdepth 2 -type d -or -type f | sed "s|^| - |"
  fi
  echo
  if [[ $fail_count -eq 0 ]]; then
    echo "**Conclusion: READY TO DEPLOY.** Merge to \`main\` and ship. If you want a final prod sanity, let the Lighthouse job run on \`main\`."
  else
    echo "**Conclusion: BLOCKED.** Come back to my ChatGPT assistant with the failing check names and the \`.predeploy_logs\` contents for targeted fixes."
  fi
} | tee "$LOG_DIR/REPORT.md"
