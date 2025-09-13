'use client'

export function About({ text, compact = true }: { text: string; compact?: boolean }) {
  // Typographic tweak: avoid "This" or single-letter "A" at end of line by gluing them to the next word
  const formattedText = (
    text
      // Glue starting "This " and "A " to next word
      .replace(/^This\s+/m, 'This\u00A0')
      .replace(/^A\s+/m, 'A\u00A0')
      // Glue in-sentence occurrences
      .replace(/\sThis\s/g, '\u00A0This\u00A0')
      .replace(/\sA\s/g, '\u00A0A\u00A0')
  )
  return (
    <section className={compact ? 'section pt-6 md:pt-8' : 'section'}>
      <div className="container">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-navy">
          About This Kit
        </h2>
        <div
          className="mt-2 h-px w-full bg-brand-gold/50"
          aria-hidden
        />
        <p
          className="mt-4 text-muted-foreground max-w-none [&_strong]:text-brand-gold"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      </div>
    </section>
  )
}


