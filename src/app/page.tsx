import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'LexAtlas',
  description: 'Cross-border legal kits for French companies.',
  openGraph: {
    title: 'LexAtlas',
    description: 'Cross-border legal kits for French companies.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://lexatlas.com',
    siteName: 'LexAtlas',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div style={{ padding: '2rem 1rem' }}>
      <section style={{ maxWidth: 1024, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8 }}>LexAtlas</h1>
        <p style={{ color: '#444', marginBottom: 20 }}>
          Cross-border legal kits for French companies.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/kits/fra-usa" className="btn-primary">FRA → USA</Link>
          <Link href="/kits/fra-can" className="btn-primary">FRA → CAN</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1024, margin: '2rem auto 0' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 12 }}>Popular Kits</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
            <h3 style={{ fontWeight: 700 }}>FRA → USA</h3>
            <p style={{ color: '#555', margin: '8px 0 12px' }}>
              Essential templates and guidance for French companies expanding to the United States.
            </p>
            <Link href="/kits/fra-usa">View kit</Link>
          </article>
          <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
            <h3 style={{ fontWeight: 700 }}>FRA → CAN</h3>
            <p style={{ color: '#555', margin: '8px 0 12px' }}>
              Essential templates and guidance for French companies expanding to Canada.
            </p>
            <Link href="/kits/fra-can">View kit</Link>
          </article>
        </div>
      </section>
    </div>
  );
}
