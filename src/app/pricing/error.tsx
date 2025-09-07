'use client'

import { useEffect } from 'react'

export default function PricingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to the console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Pricing page error caught:', error)
    }
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Pricing page error
          </h2>
          
          <p className="text-sm text-gray-600 mb-4">
            We couldn't load the pricing information. Please try again.
          </p>
          
          {error.digest && (
            <p className="text-xs text-gray-500 mb-4 font-mono">
              Error ID: {error.digest}
            </p>
          )}
          
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-gold hover:bg-brand-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
