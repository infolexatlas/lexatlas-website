const fs = require('fs');
const path = require('path');

const snapDir1 = path.join('tests', 'visual.spec.ts-snapshots');
const snapDir2 = path.join('tests', '__screenshots__', 'visual.spec.ts-snapshots');
const dirs = [snapDir1, snapDir2].filter(d => fs.existsSync(d));

const targets = [
  { base: 'home-full' },
  { base: 'kits-fra-usa-full' },
  { base: 'kits-fra-can-full' },
];

function newest(files, dir) {
  if (!files.length) return null;
  files.sort((a,b) => fs.statSync(path.join(dir,b)).mtimeMs - fs.statSync(path.join(dir,a)).mtimeMs);
  return files[0];
}

let wrote = [];
for (const dir of dirs) {
  for (const {base} of targets) {
    const glob = fs.readdirSync(dir).filter(f => f.startsWith(base + '-chromium-') && f.endsWith('.png'));
    if (!glob.length) continue;

    const linuxName = `${base}-chromium-linux.png`;
    const linuxPath = path.join(dir, linuxName);
    if (!fs.existsSync(linuxPath)) {
      const src = newest(glob, dir);
      fs.copyFileSync(path.join(dir, src), linuxPath);
      wrote.push(path.join(dir, linuxName));
    }
  }
}

console.log('Normalized (created linux copies):');
wrote.forEach(x => console.log('  - ' + x));

if (fs.existsSync(snapDir2)) {
  for (const {base} of targets) {
    const p = path.join(snapDir2, `${base}-chromium-linux.png`);
    if (fs.existsSync(p)) {
      const destDir = snapDir1;
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, {recursive: true});
      const dest = path.join(destDir, path.basename(p));
      fs.copyFileSync(p, dest);
      console.log(`Copied from __screenshots__ → ${dest}`);
    }
  }
}


