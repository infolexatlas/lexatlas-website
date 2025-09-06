import Link from 'next/link';
import { COMMIT_SHA, BRANCH, BUILD_TIME } from '@/lib/version';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '2rem', maxWidth: 960, width: '100%', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>LexAtlas</h1>
        <p style={{ color: '#444', marginBottom: '1.5rem' }}>
          Cross-border legal kits for French companies. Explore popular pairs below.
        </p>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/kits/fra-usa" prefetch={false}>
            Explore Kits: FRA → USA
          </Link>
          <Link href="/kits/fra-can" prefetch={false}>
            Explore Kits: FRA → CAN
          </Link>
        </nav>
      </div>
      <footer
        style={{
          position: 'fixed',
          bottom: 12,
          right: 12,
          background: 'rgba(0,0,0,0.75)',
          color: 'white',
          padding: '6px 10px',
          borderRadius: 6,
          fontSize: 12,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
        aria-label="version"
      >
        commit {COMMIT_SHA} · {BRANCH} · {BUILD_TIME}
      </footer>
    </main>
  );
}
