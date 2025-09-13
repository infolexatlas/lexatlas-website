export function ContactSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LexAtlas",
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://lex-atlas.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "contact.lexatlas@gmail.com",
        "areaServed": ["FR", "EU", "US", "CA"],
        "availableLanguage": ["en", "fr"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    ],
    "description": "Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.",
    "foundingDate": "2024",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 48.8566,
        "longitude": 2.3522
      },
      "geoRadius": "10000"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
