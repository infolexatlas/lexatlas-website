// src/app/sitemap/page.tsx
import Link from 'next/link';
import { getHumanSitemap } from '@/lib/sitemapData';

export const metadata = {
  title: 'Sitemap | LexAtlas',
  description: 'Human-readable sitemap for LexAtlas.',
};

export default function HumanSitemapPage() {
  const items = getHumanSitemap();
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Sitemap</h1>
        <p className="text-slate-600">
          This page lists important sections of the LexAtlas website. For the machine-readable sitemap, see{' '}
          <Link href="/sitemap.xml" className="underline">/sitemap.xml</Link>.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 p-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(({ loc, label, changefreq, priority }) => (
            <li key={loc} className="rounded-lg border border-slate-100 p-4 hover:bg-slate-50 transition">
              <Link href={loc} className="font-medium underline break-all">{label ?? loc}</Link>
              <div className="mt-1 text-xs text-slate-500">
                {changefreq ? <span>changefreq: {changefreq}</span> : null}
                {typeof priority === 'number' ? <span className="ml-2">priority: {priority}</span> : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
