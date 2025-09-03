import { jsonLd } from '@/lib/jsonLd'

interface JsonLdProps {
  data: unknown
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd(data)
      }}
    />
  )
}
