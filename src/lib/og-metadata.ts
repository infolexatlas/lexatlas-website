export function generateOGMetadata({
  title,
  description,
  image = '/og/home.png',
  url = '/',
  type = 'website'
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lex-atlas.com';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${url}`,
      siteName: 'LexAtlas',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}${image}`],
    },
  };
}
