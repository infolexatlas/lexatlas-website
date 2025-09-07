import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * UnderlineLink component with animated underline
 * Uses background-size transition to avoid layout shift
 */
interface UnderlineLinkProps {
  children: ReactNode
  href: string
  className?: string
  external?: boolean
}

export const UnderlineLink = ({ 
  children, 
  href, 
  className,
  external = false 
}: UnderlineLinkProps) => {
  const linkClasses = cn(
    'relative inline-flex items-center text-brand-navy font-medium transition-colors duration-250',
    'hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2',
    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand-gold after:transition-all after:duration-250',
    'hover:after:w-full',
    className
  )

  const props = external ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : {}

  return (
    <a href={href} className={linkClasses} {...props}>
      {children}
      {external && (
        <svg 
          className="ml-1 h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
          />
        </svg>
      )}
    </a>
  )
}
