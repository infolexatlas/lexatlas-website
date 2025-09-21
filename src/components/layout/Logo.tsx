'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <Link href="/" aria-label="Lex Atlas home" className="focus:outline-none">
        <span className="logo-pill click-ink inline-flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2.5">
          <span className="relative block h-6 w-6 md:h-7 md:w-7 overflow-hidden rounded-md bg-transparent" aria-hidden="true">
            <Image 
              src="/logo/lexatlas-transparent.svg?v=3" 
              alt="Lex Atlas logo" 
              fill 
              sizes="(max-width:768px) 28px, 36px" 
              priority 
              className="object-contain"
            />
          </span>
          <span className="text-sm font-semibold tracking-tight md:text-base">Lex Atlas</span>
        </span>
      </Link>
    </motion.div>
  )
}


