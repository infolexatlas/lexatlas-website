"use client"

import Link from 'next/link'
import { Mail } from 'lucide-react'

type SocialLinksProps = {
  className?: string
  size?: number
}

export function SocialLinks({ className = '', size = 18 }: SocialLinksProps) {
  const iconProps = { width: size, height: size, 'aria-hidden': true } as const

  return (
    <nav aria-label="Contact links" className={className}>
      <ul className="flex items-center gap-2">
        <li>
          <Link
            href="mailto:contact.lexatlas@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email LexAtlas"
            className="icon-btn"
          >
            <Mail {...iconProps} />
          </Link>
        </li>
      </ul>
    </nav>
  )
}


