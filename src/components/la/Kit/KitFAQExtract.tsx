import React from 'react'

export type FaqItem = { id: string; q: string; a: string }

export default function KitFAQExtract({ ids }: { ids: string[] }) {
  const items: FaqItem[] = ids.map((id) => ({
    id,
    q: faqMap[id]?.q ?? 'Question',
    a: faqMap[id]?.a ?? 'Answer to this question will be available soon.'
  }))
  return (
    <div data-testid="kit-faq-extract">
      <ul className="space-y-2">
        {items.map((f) => (
          <li key={f.id}>
            <strong>{f.q}</strong>
            <div className="text-sm text-muted-foreground">{f.a}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const faqMap: Record<string, { q: string; a: string }> = {
  'what-is-lexatlas-kit': {
    q: 'What is a LexAtlas Kit?',
    a: 'A concise PDF guide for a specific country pair, with steps and checklists.'
  },
  'are-guides-up-to-date': {
    q: 'Are guides up to date?',
    a: 'Yes, we maintain updates as laws and procedures change.'
  },
  'how-long-international-marriage': {
    q: 'How long does an international marriage take?',
    a: 'Timelines vary by country pair; kits outline typical durations and dependencies.'
  },
  'how-much-cost': {
    q: 'How much does it cost?',
    a: 'Most kits are €29; translations/legalizations may add costs depending on your case.'
  },
  'recognition-both-countries': {
    q: 'Will it be recognized in both countries?',
    a: 'Kits include the steps for recognition on both sides where applicable.'
  },
  'how-receive-kit': {
    q: 'How do I receive the kit?',
    a: 'Instant download after purchase, with lifetime access to updates.'
  }
}


