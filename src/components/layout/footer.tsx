"use client"
import Link from 'next/link'
import Image from 'next/image'
 
import { NewsletterForm } from './NewsletterForm'
import { SocialLinks } from './SocialLinks'
import { BRAND } from '@/lib/brand'
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '@/components/la/Motion'

const groups = {
  product: [
    { name: 'Kits', href: '/kits' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookie-policy' },
  ],
}

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-brand-deep text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Main Grid */}
      <div className="container py-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0% -10% 0%' }}
          variants={stagger}
          className="grid grid-cols-1 gap-10 md:grid-cols-12"
          aria-label="Footer"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="md:col-span-4 lg:col-span-5">
            <div className="flex items-center">
              <Image
                src={BRAND.logo.src}
                alt={BRAND.logo.alt}
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 object-contain select-none"
              />
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              Your Global Legal Compass. Expert-built, country-specific PDF guides to handle international legal procedures with clarity and confidence.
            </p>
            <SocialLinks className="mt-4" />
          </motion.div>

          {/* Link Groups */}
          <motion.nav variants={fadeInUp} aria-label="Footer links" className="md:col-span-5 lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold">Product</h3>
              <ul className="mt-4 space-y-2">
                {groups.product.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-white/80 hover:text-brand-gold fx-underline">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                {groups.legal.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-white/80 hover:text-brand-gold fx-underline">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>

          {/* Newsletter */}
          <motion.div variants={fadeInUp} className="md:col-span-3 lg:col-span-3">
            <h3 className="text-sm font-semibold">Newsletter</h3>
            <p className="mt-2 text-sm text-white/70">Get product updates and new country kits.</p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust strip removed per request */}
      <div className="container pb-6">
        <div className="fx-divider" />
      </div>

      {/* Bottom Bar */}
      <div className="bg-brand-deep/95">
        <div className="container py-6">
          <div className="flex items-center justify-center">
            <p className="text-xs text-white/70">© 2025 LexAtlas. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
