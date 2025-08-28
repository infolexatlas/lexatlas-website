import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const React = require('react')
      return React.createElement('div', props, children)
    },
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock Vercel Analytics
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}))
