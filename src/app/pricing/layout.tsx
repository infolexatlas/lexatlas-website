import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LexAtlas Pricing – Affordable Legal Kits for International Marriages',
  description:
    'Transparent pricing: Single kit €29, Bundle of 3 €75, Full Pack €200. One-time payment, lifetime access.',
  openGraph: {
    title: 'LexAtlas Pricing – Affordable Legal Kits for International Marriages',
    description:
      'Transparent pricing: Single kit €29, Bundle of 3 €75, Full Pack €200. One-time payment, lifetime access.',
    url: '/pricing',
    type: 'website',
    images: ['/og/kits.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexAtlas Pricing – Affordable Legal Kits for International Marriages',
    description:
      'Transparent pricing: Single kit €29, Bundle of 3 €75, Full Pack €200. One-time payment, lifetime access.',
    images: ['/og/kits.png'],
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
