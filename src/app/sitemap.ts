export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://lexatlas.com';
  return [
    { url: `${base}/`, changefreq: 'weekly', priority: 1.0 },
    { url: `${base}/kit`, changefreq: 'weekly', priority: 0.9 },
    { url: `${base}/preview`, changefreq: 'weekly' },
    { url: `${base}/pricing`, changefreq: 'weekly' },
    { url: `${base}/faq`, changefreq: 'monthly' },
    // kits (10 pairs)
    ...['fra-usa','fra-gbr','fra-can','fra-mar','fra-deu','fra-che','fra-bel','fra-esp','fra-ita','fra-prt']
      .map(slug => ({ url: `${base}/kits/${slug}`, changefreq: 'weekly' }))
  ];
}


