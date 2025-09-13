'use client'
import * as React from 'react'

export function HeaderBlock({ title, lede, right, compact = false }: { title: React.ReactNode; lede: string; right?: React.ReactNode; compact?: boolean }) {
  return (
    <section className={compact ? 'py-10 md:py-14' : 'section'}>
      <div className="container">
        <div className="flex justify-between gap-4 items-start md:items-center">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>
            <p className="lede mt-2 max-w-2xl text-muted-foreground">
              {lede}
            </p>
            <div className="mt-3 text-sm text-muted-foreground">
              Instant download · One-time payment · Lifetime access
            </div>
          </div>
          {right && (
            <div className="hidden md:block shrink-0" aria-hidden>
              {right}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


