'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div key={pathname}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.4, 
            ease: [0.2, 0.8, 0.2, 1]
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -20,
          transition: { 
            duration: 0.3, 
            ease: [0.2, 0.8, 0.2, 1]
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
