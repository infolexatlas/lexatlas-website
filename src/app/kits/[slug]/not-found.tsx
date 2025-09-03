import Link from 'next/link'

export default function KitNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Kit not found
          </h2>
          
          <p className="text-sm text-gray-600 mb-6">
            The marriage kit you're looking for doesn't exist.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/kits"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-gold hover:bg-brand-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
            >
              Browse all kits
            </Link>
            
            <div className="text-xs text-gray-500">
              <Link href="/" className="hover:text-brand-gold">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
