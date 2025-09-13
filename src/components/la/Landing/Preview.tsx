"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { fadeInUp } from "@/components/la/Motion"
import { useRef, useState, useEffect } from "react"

type PreviewItem = { src: string; alt: string; fallback?: string }

// Note: Use /product-previews to avoid conflict with the /preview/[slug] route
const previews: PreviewItem[] = [
  { src: "/product-previews/1.png", alt: "LexAtlas Cross‑Border Marriage Kit preview 1", fallback: "/og/home.png" },
  { src: "/product-previews/2.png", alt: "LexAtlas Cross‑Border Marriage Kit preview 2", fallback: "/og/kits.png" },
  { src: "/product-previews/3.png", alt: "LexAtlas Cross‑Border Marriage Kit preview 3", fallback: "/og/about.png" },
  { src: "/product-previews/4.png", alt: "LexAtlas Cross‑Border Marriage Kit preview 4", fallback: "/og/about.png" },
]

function PreviewImage({ item }: { item: PreviewItem }) {
  const [src, setSrc] = useState<string>(item.src)
  const [attemptedFallback, setAttemptedFallback] = useState(false)
  const [failed, setFailed] = useState(false)

  // Check if the image is a placeholder
  const isPlaceholder = src.includes('PNG_PLACEHOLDER')

  if (failed || isPlaceholder) {
    return (
      <div className="aspect-[1000/1414] w-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-ivory to-brand-muted text-brand-navy p-6 border-2 border-dashed border-brand-gold/30">
        <div className="text-center">
          <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-brand-navy mb-2">Preview Coming Soon</h3>
          <p className="text-sm text-brand-textMuted leading-relaxed">
            {item.alt.includes('cover') ? 'Kit cover preview' : 
             item.alt.includes('contents') ? 'Table of contents' :
             item.alt.includes('Overview') ? 'Overview page' :
             'Legal requirements page'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={item.alt}
      width={1000}
      height={1414}
      className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
      priority={false}
      unoptimized
      onError={(e) => {
        console.log('Image failed to load:', src, e)
        if (!attemptedFallback) {
          setAttemptedFallback(true)
          setSrc(item.fallback || "/og/kits.png")
        } else {
          setFailed(true)
        }
      }}
      onLoad={() => {
        console.log('Image loaded successfully:', src)
      }}
    />
  )
}

export default function Preview() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [20, -20])
  const reduce = useReducedMotion()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [lbDirection, setLbDirection] = useState<1 | -1>(1)
  const total = previews.length

  const go = (delta: 1 | -1) => {
    if (activeIndex === null) return
    const next = (activeIndex + delta + total) % total
    setLbDirection(delta)
    setActiveIndex(next)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
      if (e.key === 'Escape') { setLightboxOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, activeIndex, total])
  // Compact grid – no slider state needed

  return (
    <section aria-labelledby="preview-heading" className="section">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow text-brand-gold mb-4">PRODUCT PREVIEW</p>
          <motion.h2
            id="preview-heading"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="heading-premium text-balance"
          >
            See what’s inside
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={fadeInUp}
            className="subheading-premium mt-4 whitespace-nowrap text-base md:text-xl"
          >
            Real pages from our kits — cover, table of contents, overview, and legal requirements.
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <motion.div style={{ y }} className="max-w-5xl mx-auto">
            <ul className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1">
              {previews.map((p, i) => (
                <li key={p.src} className="snap-center">
                  <motion.figure
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: reduce ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                    whileHover={reduce ? undefined : { scale: 1.02 }}
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    className="card overflow-hidden relative w-44 sm:w-52 md:w-56 lg:w-64 cursor-zoom-in"
                    onClick={() => { setActiveIndex(i); setLightboxOpen(true) }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                    <PreviewImage item={p} />
                  </motion.figure>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Lightbox dialog */}
        <Dialog open={lightboxOpen} onOpenChange={(v) => { if (!v) setActiveIndex(null); setLightboxOpen(v) }}>
          <DialogContent className="p-0 sm:max-w-[95vw] w-[95vw] h-[95vh] bg-black/95 text-white border-0 rounded-xl2 flex items-center justify-center">
            <DialogTitle className="sr-only">
              Preview Image Gallery
            </DialogTitle>
            {activeIndex !== null && (
              <div className="relative max-h-[88vh] w-full flex items-center justify-center">
                <button
                  aria-label="Previous image"
                  onClick={() => go(-1)}
                  className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-black px-3 py-1 text-sm shadow-soft"
                >
                  ‹
                </button>
                <div className="relative h-auto w-auto max-h-[88vh] max-w-[88vw]">
                  {previews[activeIndex].src.includes('PNG_PLACEHOLDER') ? (
                    <div className="flex flex-col items-center justify-center bg-white/10 rounded-xl p-8 max-h-[88vh] max-w-[88vw]">
                      <div className="w-24 h-24 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">Preview Coming Soon</h3>
                      <p className="text-white/80 text-center max-w-md">
                        {previews[activeIndex].alt}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={previews[activeIndex].src}
                      alt={previews[activeIndex].alt}
                      className="h-auto w-auto max-h-[88vh] max-w-[88vw] object-contain cursor-pointer"
                      style={{ display: 'block' }}
                      onClick={() => go(1)}
                    />
                  )}
                </div>
                <button
                  aria-label="Next image"
                  onClick={() => go(1)}
                  className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 text-black px-3 py-1 text-sm shadow-soft"
                >
                  ›
                </button>
                <button
                  aria-label="Close preview"
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-3 right-3 rounded-full bg-white/90 text-black px-3 py-1 text-sm shadow-soft"
                >
                  Close
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}


