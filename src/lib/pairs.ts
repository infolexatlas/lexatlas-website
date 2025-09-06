export type Pair = {
  slug: string;
  label: string;
  iso: ["fra", string];
  previewUrl?: string;
};

// France-first ordering; previewUrl provided only when a public preview exists
export const pairs: Pair[] = [
  { slug: 'fra-usa', label: 'France – United States', iso: ['fra', 'usa'] },
  { slug: 'fra-gbr', label: 'France – United Kingdom', iso: ['fra', 'gbr'] },
  { slug: 'fra-can', label: 'France – Canada', iso: ['fra', 'can'] },
  { slug: 'fra-mar', label: 'France – Morocco', iso: ['fra', 'mar'] },
  { slug: 'fra-deu', label: 'France – Germany', iso: ['fra', 'deu'] },
  { slug: 'fra-che', label: 'France – Switzerland', iso: ['fra', 'che'] },
  { slug: 'fra-bel', label: 'France – Belgium', iso: ['fra', 'bel'] },
  { slug: 'fra-esp', label: 'France – Spain', iso: ['fra', 'esp'] },
  { slug: 'fra-ita', label: 'France – Italy', iso: ['fra', 'ita'] },
  { slug: 'fra-prt', label: 'France – Portugal', iso: ['fra', 'prt'] },
]


