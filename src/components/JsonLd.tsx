import React from 'react';
type Props = { json: Record<string, unknown> };
export default function JsonLd({ json }: Props) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}


