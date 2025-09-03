'use client'

export default function Loading() {
  return (
    <div className="section-premium">
      <div className="container animate-pulse">
        <div className="h-8 w-1/2 bg-gray-200 rounded mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="mt-3 h-4 w-3/4 bg-gray-200 rounded" />
              <div className="mt-6 h-9 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


