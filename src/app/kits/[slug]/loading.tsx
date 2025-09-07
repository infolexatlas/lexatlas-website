'use client'

export default function Loading() {
  return (
    <main className="section">
      <div className="container animate-pulse">
        <div className="h-7 w-2/3 bg-gray-200 rounded mb-3" />
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-6" />
        <div className="grid gap-4 md:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
          <div className="h-40 bg-gray-200 rounded" />
        </div>
      </div>
    </main>
  )
}


