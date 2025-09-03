// scripts/check-next-chunks.mjs
import fs from 'fs';
import path from 'path';

const serverDir = path.join('.next', 'server');
const runtime = path.join(serverDir, 'webpack-runtime.js');

if (!fs.existsSync(runtime)) {
  console.log('No webpack-runtime.js yet. Build once first.');
  process.exit(0);
}

const src = fs.readFileSync(runtime, 'utf8');
// Look for require("./###.js") patterns
const reqs = [...src.matchAll(/require\("\.\/(\d+)\.js"\)/g)].map(m => m[1]);

let missing = 0;
for (const id of reqs) {
  const f = path.join(serverDir, `${id}.js`);
  if (!fs.existsSync(f)) {
    console.log(`❌ Missing chunk: ${f}`);
    missing++;
  }
}
if (missing === 0) {
  console.log('✅ All referenced chunks exist.');
} else {
  console.log(`⚠️ ${missing} missing chunk(s). Run: npm run dev:reset`);
}
