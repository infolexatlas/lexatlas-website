import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';

type KitSlug = 'fra-usa' | 'fra-can';

const KIT_DATA: Record<KitSlug, {
  chip: string;
  title: string;
  description: string;
  bullets: string[];
  faq: { q: string; a: string }[];
  priceText: string;
  sku: string;
}> = {
  'fra-usa': {
    chip: 'FRA → USA',
    title: 'France to United States Expansion Kit',
    description: 'Templates, checklists, and guidance for French companies expanding to the US.',
    bullets: [
      'Company formation overview and registrations basics',
      'Employment and contractor agreements (templates)',
      'Sales agreements and NDA (templates)',
      'Compliance, tax, and data protection basics',
      'Operational launch checklists',
    ],
    faq: [
      { q: 'Who is this for?', a: 'French companies preparing to start operations or sales in the United States.' },
      { q: 'Is this legal advice?', a: 'No. It is an educational resource with practical templates and guidance.' },
      { q: 'Do you offer custom support?', a: 'Yes, contact us and we can tailor documents for your needs.' },
    ],
    priceText: 'From €0 (introductory)',
    sku: 'kit-fra-usa',
  },
  'fra-can': {
    chip: 'FRA → CAN',
    title: 'France to Canada Expansion Kit',
    description: 'Templates, checklists, and guidance for French companies expanding to Canada.',
    bullets: [
      'Company registration and provincial overview',
      'Employment and contractor agreements (templates)',
      'Sales agreements and NDA (templates)',
      'Compliance, tax, and privacy basics',
      'Operational launch checklists',
    ],
    faq: [
      { q: 'Who is this for?', a: 'French companies preparing to start operations or sales in Canada.' },
      { q: 'Is this legal advice?', a: 'No. It is an educational resource with practical templates and guidance.' },
      { q: 'Do you offer custom support?', a: 'Yes, contact us and we can tailor documents for your needs.' },
    ],
    priceText: 'From €0 (introductory)',
    sku: 'kit-fra-can',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = slug as KitSlug;
  const data = KIT_DATA[s];
  if (!data) return {};
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://lexatlas.com';
  const url = `${base}/kits/${s}`;
  return {
    title: data.chip,
    description: data.description,
    openGraph: { title: data.chip, description: data.description, url, type: 'website' },
  };
}

function ProductJsonLd({ slug }: { slug: KitSlug }) {
  const d = KIT_DATA[slug];
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: d.title,
    description: d.description,
    sku: d.sku,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: '0.00',
      availability: 'https://schema.org/PreOrder',
    },
  } as const;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}

function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replaceAll('_', '-')
    .replace(/[–—]/g, '-')
    .replace(/(^[a-z]{3})-6([a-z]{3}$)/i, '$1-$2');
}

export default async function KitPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[]>> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const normalized = normalizeSlug(slug);
  if (normalized !== slug) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) {
      if (Array.isArray(v)) v.forEach((vv) => qs.append(k, String(vv)));
      else if (v != null) qs.set(k, String(v));
    }
    const q = qs.toString();
    permanentRedirect(`/kits/${normalized}${q ? `?${q}` : ''}`);
  }
  const s = slug as KitSlug;
  const data = KIT_DATA[s];
  if (!data) return notFound();

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 1024, margin: '0 auto' }}>
        <span style={{ fontSize: 12, background: '#eef2ff', color: '#3730a3', padding: '2px 6px', borderRadius: 999 }}>{data.chip}</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: 8 }}>{data.title}</h1>
        <p style={{ color: '#555', marginTop: 6 }}>{data.description}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginTop: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
            <section>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>What’s inside</h2>
              <ul style={{ marginLeft: 18, marginTop: 8, color: '#444' }}>
                {data.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Who it’s for</h2>
              <p style={{ color: '#444', marginTop: 8 }}>
                French companies preparing to explore or launch operations in the target country.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>FAQ</h2>
              <div style={{ marginTop: 8 }}>
                {data.faq.map((f, i) => (
                  <details key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                    <summary style={{ fontWeight: 600 }}>{f.q}</summary>
                    <div style={{ color: '#444', marginTop: 8 }}>{f.a}</div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside style={{ position: 'sticky', top: 16, height: 'fit-content' }}>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 12, color: '#6b7280' }}>Starting at</div>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{data.priceText}</div>
              <Link
                href={`mailto:hello@lexatlas.com?subject=${encodeURIComponent('LexAtlas inquiry: ' + data.sku)}`}
                style={{ display: 'inline-block', marginTop: 12, background: '#111827', color: 'white', padding: '10px 14px', borderRadius: 8 }}
              >
                Contact us
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <ProductJsonLd slug={s} />
    </div>
  );
}


