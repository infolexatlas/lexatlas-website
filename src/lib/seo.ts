import { DefaultSeoProps } from 'next-seo'

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | LexAtlas',
  defaultTitle: 'LexAtlas - Your Global Legal Compass',
  description: 'Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.',
  canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com',
    siteName: 'LexAtlas',
    title: 'LexAtlas - Your Global Legal Compass',
    description: 'Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.',
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: 'LexAtlas - Your Global Legal Compass',
      },
    ],
  },
  twitter: {
    handle: '@lexatlas',
    site: '@lexatlas',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#1A2E4F',
    },
  ],
}
