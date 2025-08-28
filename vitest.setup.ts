import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'

// Mock next/navigation for unit tests
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/link (simple passthrough)
vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: any) => {
    return React.createElement('a', { 
      href: typeof href === 'string' ? href : '#', 
      ...rest 
    }, children)
  }
}))

// Mock next/image for tests
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', props),
}))

// Mock shadcn UI components
vi.mock('@/components/ui/accordion', () => ({
  Accordion: (props: any) => React.createElement('div', props),
  AccordionItem: (props: any) => React.createElement('div', props),
  AccordionTrigger: (props: any) => React.createElement('button', props),
  AccordionContent: (props: any) => React.createElement('div', props),
}))

vi.mock('@/components/ui/card', () => ({
  Card: (props: any) => React.createElement('div', props),
  CardContent: (props: any) => React.createElement('div', props),
  CardHeader: (props: any) => React.createElement('div', props),
  CardTitle: (props: any) => React.createElement('div', props),
  CardDescription: (props: any) => React.createElement('div', props),
}))

vi.mock('@/components/ui/button', () => ({
  Button: (props: any) => React.createElement('button', props),
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => React.createElement('input', props),
}))

vi.mock('@/components/ui/label', () => ({
  Label: (props: any) => React.createElement('label', props),
}))

vi.mock('@/components/ui/textarea', () => ({
  Textarea: (props: any) => React.createElement('textarea', props),
}))

vi.mock('@/components/ui/container', () => ({
  Container: (props: any) => React.createElement('div', props),
}))
