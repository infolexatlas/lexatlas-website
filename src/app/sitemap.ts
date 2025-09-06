export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://lexatlas.com';
  return [
    { url: `${base}/`, changefreq: 'weekly', priority: 1.0 },
    { url: `${base}/kits`, changefreq: 'weekly', priority: 0.9 },
    { url: `${base}/kits/fra-usa`, changefreq: 'weekly' },
    { url: `${base}/kits/fra-can`, changefreq: 'weekly' },
  ];
}


