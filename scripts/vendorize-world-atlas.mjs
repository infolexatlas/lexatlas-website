// scripts/vendorize-world-atlas.mjs
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const srcCandidates = [
  // try common world-atlas v2 paths (some distros differ)
  "node_modules/world-atlas/land-110m.json",
  "node_modules/world-atlas/countries-110m.json",
  "node_modules/world-atlas/world/110m.json", // fallback for some distros
];
const destDir = path.join(projectRoot, "public", "vendor");
const destFile = path.join(destDir, "world-110m.json");

fs.mkdirSync(destDir, { recursive: true });

let copied = false;
for (const candidate of srcCandidates) {
  const src = path.join(projectRoot, candidate);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destFile);
    console.log(`[vendorize-world-atlas] Copied: ${candidate} -> /public/vendor/world-110m.json`);
    copied = true;
    break;
  }
}

if (!copied) {
  console.error(
    "[vendorize-world-atlas] Could not find world-atlas topojson in node_modules.\n" +
    "Install `world-atlas@^2` and re-run this script, or adjust srcCandidates paths."
  );
  process.exit(1);
}
