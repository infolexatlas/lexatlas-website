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
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        exit={undefined}
        transition={{ 
          duration: 0.3, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
