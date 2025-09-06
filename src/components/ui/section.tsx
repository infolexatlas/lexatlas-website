import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Section component for consistent spacing and container management
 * Provides standardized padding and max-width constraints
 */
interface SectionProps {
  children: ReactNode
  className?: string
  container?: boolean
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
  eyebrow?: string
}

export const Section = ({ 
  children, 
  className, 
  container = true, 
  spacing = 'lg',
  eyebrow 
}: SectionProps) => {
  const spacingClasses = {
    sm: 'py-12 lg:py-16',
    md: 'py-16 lg:py-20',
    lg: 'py-20 lg:py-28',
    xl: 'py-24 lg:py-32'
  }

  const content = (
    <>
      {eyebrow && (
        <div className="mb-4">
          <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">
            {eyebrow}
          </span>
        </div>
      )}
      {children}
    </>
  )

  return (
    <section className={cn(spacingClasses[spacing], className)}>
      {container ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {content}
        </div>
      ) : (
        content
      )}
    </section>
  )
}
