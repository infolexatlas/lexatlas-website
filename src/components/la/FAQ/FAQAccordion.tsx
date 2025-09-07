'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Link as LinkIcon, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FAQ } from '@/lib/faq-data'

interface FAQAccordionProps {
  faqs: FAQ[]
  searchQuery?: string
  className?: string
}

/**
 * Premium accordion component with smooth animations and deep linking
 * Features accessible design, copy-to-clipboard, and search highlighting
 */
export const FAQAccordion = ({ 
  faqs, 
  searchQuery = '', 
  className = '' 
}: FAQAccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Handle deep linking on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash && faqs.some(faq => faq.id === hash)) {
        setOpenItems(new Set([hash]))
        // Scroll to the item
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
    }
  }, [faqs])

  // Auto-expand first result when searching (only if there are results and not too many)
  useEffect(() => {
    if (searchQuery && faqs.length > 0 && faqs.length <= 5) {
      setOpenItems(new Set([faqs[0].id]))
    } else if (!searchQuery) {
      // Clear open items when search is cleared
      setOpenItems(new Set())
    }
  }, [searchQuery, faqs])

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const copyToClipboard = async (id: string) => {
    const url = `${window.location.origin}/faq#${id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // Highlight search terms in text
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-brand-gold/20 text-brand-navy font-medium px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  if (faqs.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-brand-textMuted text-lg">
          No questions found. Try adjusting your search terms.
        </p>
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {faqs.map((faq, index) => {
        const isOpen = openItems.has(faq.id)
        const isCopied = copiedId === faq.id

        return (
          <motion.div
            key={faq.id}
            id={faq.id}
            className="bg-white/75 backdrop-blur rounded-2xl ring-1 ring-black/5 shadow-soft overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -1 }}
          >
              {/* Question Header */}
              <div
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:no-underline group-hover:bg-brand-navy/5 transition-colors duration-250 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={`faq-content-${faq.id}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleItem(faq.id)
                  }
                }}
              >
                <h3 className="text-lg font-medium text-brand-navy group-hover:text-brand-gold transition-colors duration-250 leading-relaxed flex-1">
                  {highlightText(faq.question, searchQuery)}
                </h3>
                <div className="flex items-center gap-2">
                  {/* Copy Link Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(faq.id)
                    }}
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-250 text-brand-textMuted hover:text-brand-navy"
                    aria-label="Copy link to this question"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <LinkIcon className="h-4 w-4" />
                    )}
                  </Button>
                  
                  {/* Chevron Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-brand-textMuted group-hover:text-brand-navy transition-colors duration-250"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </div>
              </div>

              {/* Answer Content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-content-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-brand-textMuted leading-relaxed">
                      <div className="prose prose-sm max-w-none">
                        {highlightText(faq.answer, searchQuery)}
                      </div>
                      
                      {/* Tags */}
                      {faq.tags && faq.tags.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-brand-gray/50">
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs font-medium text-brand-navy bg-brand-navy/10 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
        )
      })}
    </div>
  )
}
