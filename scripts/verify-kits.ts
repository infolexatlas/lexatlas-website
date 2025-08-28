import fs from 'fs';
import path from 'path';

const PAIRS = ['FRA-USA','FRA-GBR','FRA-CAN','FRA-MAR','FRA-DEU','FRA-CHE','FRA-BEL','FRA-ESP','FRA-ITA','FRA-PRT'];
const publicDir = path.join(process.cwd(), 'public');

const missing: string[] = [];
const rows: string[] = [];

for (const iso3 of PAIRS) {
  const pdf = path.join(publicDir, 'kits', `${iso3}.pdf`);
  const sampleSpecific = path.join(publicDir, 'kits', 'samples', `${iso3}-sample.pdf`);
  const sampleGlobal = path.join(publicDir, 'kits', 'samples', `LEXATLAS-global-sample.pdf`);
  const pdfOk = fs.existsSync(pdf);
  if (!pdfOk) missing.push(iso3);
  const sampleLabel = fs.existsSync(sampleSpecific) ? 'SPECIFIC' : (fs.existsSync(sampleGlobal) ? 'GLOBAL' : 'MISSING');
  rows.push(`${iso3.padEnd(10)}  ${pdfOk ? 'OK'.padEnd(8) : 'MISSING'.padEnd(8)}  ${sampleLabel}`);
}

console.log('KIT        PDF      SAMPLE');
console.log(rows.join('\n'));
if (missing.length) {
  console.error('\nMissing production PDFs for:', missing.join(', '));
  process.exit(1);
} else {
  console.log('\nAll production PDFs present. Samples are SPECIFIC or GLOBAL (both acceptable).');
  process.exit(0);
}
