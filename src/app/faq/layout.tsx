import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | LexAtlas',
  description: 'Clear answers about cross-border marriage kits, timelines, costs, recognition, translations, and delivery.',
  openGraph: {
    title: 'Frequently Asked Questions | LexAtlas',
    description: 'Clear answers about cross-border marriage kits, timelines, costs, recognition, translations, and delivery.',
    images: [
      {
        url: '/og/about.svg',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - LexAtlas',
      },
      {
        url: '/og/about.png',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - LexAtlas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | LexAtlas',
    description: 'Clear answers about cross-border marriage kits, timelines, costs, recognition, translations, and delivery.',
    images: ['/og/about.svg', '/og/about.png'],
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
