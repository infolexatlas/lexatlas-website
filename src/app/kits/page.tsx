import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kits',
  description: 'Explore cross-border legal kits for French companies.',
};

export default function KitsPage() {
  return (
    <div style={{ padding: '2rem 1rem', maxWidth: 1024, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>Kits</h1>
      <p style={{ color: '#555', marginBottom: 16 }}>
        Each kit includes practical templates, guidance notes, and checklists to help you expand efficiently.
      </p>

      <ul style={{ marginLeft: 18, marginBottom: 24, color: '#444' }}>
        <li>Company formation and registrations</li>
        <li>Employment and contractor templates</li>
        <li>Commercial contracts and NDAs</li>
        <li>Compliance and tax basics</li>
        <li>Operational checklists</li>
      </ul>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
          <h2 style={{ fontWeight: 700 }}>FRA → USA</h2>
          <p style={{ color: '#555', margin: '8px 0 12px' }}>Templates and guidance for France to United States expansion.</p>
          <Link href="/kits/fra-usa">View kit</Link>
        </article>
        <article style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
          <h2 style={{ fontWeight: 700 }}>FRA → CAN</h2>
          <p style={{ color: '#555', margin: '8px 0 12px' }}>Templates and guidance for France to Canada expansion.</p>
          <Link href="/kits/fra-can">View kit</Link>
        </article>
      </div>
    </div>
  );
}
