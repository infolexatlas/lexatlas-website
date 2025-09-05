set -euo pipefail

echo "=== REPORT ==="
if [ -f .predeploy_logs/REPORT.md ]; then
  sed -n 1,200p .predeploy_logs/REPORT.md
else
  echo "No .predeploy_logs/REPORT.md found — run the pre-deploy sweep first."
  exit 1
fi

echo
echo "=== KEY LOGS (first & last lines) ==="
for f in 01_env_prep.log 02_npm_ci.log 10_lint.log 11_typecheck.log 12_build.log 13_size.log 14_secret_scan.log 15_license_scan.log 20_next_start.log 21_wait_on.log 22_sanity_code.log 23_redirect_headers.txt 24_security_headers.txt 25_robots.txt 26_sitemap.xml 30_e2e.log 31_vr.log 40_env_validate_present.log 41_env_validate_missing.log 50_sentry_grep.log; do
  if [ -f ".predeploy_logs/$f" ]; then
    echo "--- $f (head) ---"; sed -n 1,50p ".predeploy_logs/$f" || true
    echo "--- $f (tail) ---"; tail -n 50 ".predeploy_logs/$f" || true
  fi
done

echo
echo "=== PARSE FAILS FROM REPORT ==="
FAILS=$(awk -F
