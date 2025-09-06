'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * Motion primitives for premium animations
 * All animations respect prefers-reduced-motion and use transform/opacity only
 */

export const fadeIn = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0% -10% 0%" },
  transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
}

export const rise = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-5% 0% -5% 0%" },
  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }
}

export const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0% -10% 0%" },
  transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-10% 0% -10% 0%" },
  transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }
}

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-10% 0% -10% 0%" },
  transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
}

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-10% 0% -10% 0%" },
  transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
}

/**
 * Parallax hook for subtle scroll effects
 * @param ratio - Translation ratio (default: 0.03 for subtle effect)
 */
export const useParallax = (ratio = 0.03) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * ratio])
  
  return {
    style: { 
      willChange: 'transform',
      y 
    }
  }
}

/**
 * FadeIn component with configurable delay
 */
interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export const FadeIn = ({ children, delay = 0, className }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0% -10% 0%" }}
    transition={{ 
      duration: 0.5, 
      delay,
      ease: [0.2, 0.8, 0.2, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
)

/**
 * Staggered children animation
 */
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export const StaggerContainer = ({ 
  children, 
  className, 
  staggerDelay = 0.1 
}: StaggerContainerProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10% 0% -10% 0%" }}
    transition={{ staggerChildren: staggerDelay }}
    className={className}
  >
    {children}
  </motion.div>
)

/**
 * Staggered item for use within StaggerContainer
 */
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export const StaggerItem = ({ children, className }: StaggerItemProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
)

/**
 * Hover lift effect for cards and buttons
 */
interface HoverLiftProps {
  children: ReactNode
  className?: string
  scale?: number
}

export const HoverLift = ({ 
  children, 
  className, 
  scale = 1.02 
}: HoverLiftProps) => (
  <motion.div
    whileHover={{ 
      scale,
      y: -2,
      transition: { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }
    }}
    className={className}
  >
    {children}
  </motion.div>
)
