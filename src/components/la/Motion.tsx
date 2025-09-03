"use client"

import type { Variants } from "framer-motion"
import { useReducedMotion } from "framer-motion"

const prefersReduced =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const fadeInUp: Variants = prefersReduced
  ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
  : {
      hidden: { opacity: 0, y: 12 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
      },
    }

export const fadeIn: Variants = prefersReduced
  ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
  : { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.35 } } }

export const stagger: Variants = prefersReduced
  ? { hidden: {}, show: {} }
  : { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export const springy = {
  type: "spring",
  stiffness: 300,
  damping: 24,
}

// Hook helper to adapt variants for prefers-reduced-motion
export function useReducedMotionVariants(variants: Variants): Variants {
  const reduce = useReducedMotion()
  if (!reduce) return variants
  return {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0 } },
  }
}
