'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

/**
 * Enhanced Animation System for LexAtlas
 * Provides consistent, performant animations across the entire site
 */

// Animation variants with reduced motion support
export const createVariants = (baseVariants: any) => {
  return {
    hidden: baseVariants.hidden,
    visible: baseVariants.visible,
    exit: baseVariants.exit || { opacity: 0 }
  }
}

// Fade in from bottom
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.2, 0.8, 0.2, 1] as const as const,
      staggerChildren: 0.1
    }
  }
}

// Fade in from left
export const fadeInLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
}

// Fade in from right
export const fadeInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
}

// Scale in
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
}

// Stagger container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// Stagger item
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
}

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  },
  out: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3, 
      ease: [0.2, 0.8, 0.2, 1] as const
    }
  }
}

// Hover animations
export const hoverLift = {
  hover: { 
    y: -4, 
    scale: 1.02,
    transition: { 
      duration: 0.2, 
      ease: [0.2, 0.8, 0.2, 1] as const as const
    }
  }
}

export const hoverScale = {
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.2, 
      ease: [0.2, 0.8, 0.2, 1] as const as const
    }
  }
}

// Loading animations
export const loadingPulse = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

/**
 * Scroll-triggered animation wrapper
 */
interface ScrollAnimationProps {
  children: ReactNode
  variant?: any
  className?: string
  delay?: number
  threshold?: number
}

export const ScrollAnimation = ({ 
  children, 
  variant = fadeInUp, 
  className,
  delay = 0,
  threshold = 0.1
}: ScrollAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0% -10% 0%",
    amount: threshold
  })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered animation container
 */
interface StaggerAnimationProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
}

export const StaggerAnimation = ({ 
  children, 
  className,
  staggerDelay = 0.1,
  threshold = 0.1
}: StaggerAnimationProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-10% 0% -10% 0%",
    amount: threshold
  })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Hover animation wrapper
 */
interface HoverAnimationProps {
  children: ReactNode
  className?: string
  scale?: number
  lift?: boolean
}

export const HoverAnimation = ({ 
  children, 
  className,
  scale = 1.02,
  lift = true
}: HoverAnimationProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      whileHover={lift ? hoverLift.hover : hoverScale.hover}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Page transition wrapper
 */
interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Loading animation component
 */
interface LoadingAnimationProps {
  children: ReactNode
  className?: string
}

export const LoadingAnimation = ({ children, className }: LoadingAnimationProps) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={loadingPulse}
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Text reveal animation
 */
interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const TextReveal = ({ children, className, delay = 0 }: TextRevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20% 0% -20% 0%" })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.2, 0.8, 0.2, 1] as const as const
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Parallax scroll effect
 */
interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number
}

export const Parallax = ({ children, className, speed = 0.5 }: ParallaxProps) => {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      style={{ y: 0 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
