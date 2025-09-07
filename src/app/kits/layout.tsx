import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LexAtlas Kits – Cross-Border Marriage Kits by Country Pair',
  description: 'Explore ready-to-use legal kits for international marriages. Official sources, step-by-step guidance, instant download.',
  openGraph: {
    title: 'LexAtlas Kits – Cross-Border Marriage Kits by Country Pair',
    description: 'Explore ready-to-use legal kits for international marriages. Official sources, step-by-step guidance, instant download.',
    images: [
      {
        url: '/og/kits.png',
        width: 1200,
        height: 630,
        alt: 'LexAtlas Kits – Cross-Border Marriage Kits by Country Pair',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexAtlas Kits – Cross-Border Marriage Kits by Country Pair',
    description: 'Explore ready-to-use legal kits for international marriages. Official sources, step-by-step guidance, instant download.',
    images: ['/og/kits.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/kits`,
  },
}

export default function KitsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
