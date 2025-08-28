import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Marriage Kits - LexAtlas',
  description: 'Choose the perfect marriage kit package for your needs. Single kits, bundles, and complete collections available.',
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
