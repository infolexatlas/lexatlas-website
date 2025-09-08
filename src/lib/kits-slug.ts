export const ISO3 = [
  'fra','usa','gbr','can','mar','deu','che','bel','esp','ita','prt',
] as const;
export type Iso3 = (typeof ISO3)[number];
export type PairSlug = `${Iso3}-${Iso3}`;

const CLEAN_SEP = /[\/_—–]+/g; // slash, underscore, em/en dash

export function normalizeSlug(input: string): PairSlug | null {
  const s = input
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(CLEAN_SEP, '-')
    .replace(/([^a-z])+/g, (m) => (m.includes('-') ? '-' : ''));
  // Fix common typos involving "6" between ISO3 codes:
  // Handles: fra-6can, fra6can, fra-6-can → fra-can
  const s2 = s
    .replace(/([a-z]{3})-?6-?([a-z]{3})/g, '$1-$2');
  const [a, b] = s2.split('-');
  if (!a || !b) return null;
  if (ISO3.includes(a as Iso3) && ISO3.includes(b as Iso3)) {
    return `${a}-${b}` as PairSlug;
  }
  return null;
}

export const iso3ToName: Record<Iso3, string> = {
  fra: 'France',
  usa: 'United States',
  gbr: 'United Kingdom',
  can: 'Canada',
  mar: 'Morocco',
  deu: 'Germany',
  che: 'Switzerland',
  bel: 'Belgium',
  esp: 'Spain',
  ita: 'Italy',
  prt: 'Portugal',
};

export function titleFromSlug(slug: PairSlug) {
  const [a, b] = slug.split('-') as [Iso3, Iso3];
  return `${iso3ToName[a]} – ${iso3ToName[b]} Marriage Kit`;
}


