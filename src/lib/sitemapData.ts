export type SiteEntry = {
  loc: string;
  label?: string;
  priority?: number;
  changefreq?: 'daily'|'weekly'|'monthly';
};

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export function getHumanSitemap(): SiteEntry[] {
  // Core pages
  const core: SiteEntry[] = [
    { loc: `${BASE}/`, label: 'Home', priority: 1, changefreq: 'weekly' },
    { loc: `${BASE}/pricing`, label: 'Pricing', priority: 0.9, changefreq: 'weekly' },
    { loc: `${BASE}/about`, label: 'About', priority: 0.6, changefreq: 'monthly' },
    { loc: `${BASE}/faq`, label: 'FAQ', priority: 0.6, changefreq: 'monthly' },
    { loc: `${BASE}/contact`, label: 'Contact', priority: 0.5, changefreq: 'monthly' },
    { loc: `${BASE}/privacy`, label: 'Privacy Policy', priority: 0.6, changefreq: 'monthly' },
    { loc: `${BASE}/terms`, label: 'Terms of Service', priority: 0.6, changefreq: 'monthly' },
    { loc: `${BASE}/cookie-policy`, label: 'Cookie Policy', priority: 0.6, changefreq: 'monthly' },
  ];

  // FRA–X kits (keep in sync with our 10 priority slugs)
  const slugs = ['fra-usa','fra-gbr','fra-can','fra-mar','fra-deu','fra-che','fra-bel','fra-esp','fra-ita','fra-prt'];
  const kits: SiteEntry[] = slugs.map((s) => ({
    loc: `${BASE}/kits/${s}`,
    label: `Kit: ${s.toUpperCase()}`,
    priority: 0.9,
    changefreq: 'weekly',
  }));

  // Preview pages (optional to list for users)
  const previews: SiteEntry[] = slugs.map((s) => ({
    loc: `${BASE}/preview/${s}`,
    label: `Preview: ${s.toUpperCase()}`,
    priority: 0.5,
    changefreq: 'weekly',
  }));

  return [...core, ...kits, ...previews];
}
