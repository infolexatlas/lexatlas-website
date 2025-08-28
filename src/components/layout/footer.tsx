import Link from 'next/link'
import { Globe, Mail, Shield, FileText } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Kits', href: '/kits' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/lexatlas',
      icon: Mail, // Placeholder - replace with LinkedIn icon
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/lexatlas',
      icon: Mail, // Placeholder - replace with Twitter icon
    },
    {
      name: 'Email',
      href: 'mailto:contact@lexatlas.com',
      icon: Mail,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <img 
                src="/logo-lexatlas.svg" 
                alt="LexAtlas" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-gray-300 max-w-md">
              Your Global Legal Compass. Expert-built, country-specific PDF guides 
              to handle international legal procedures with clarity and confidence.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-brand-gold transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-brand-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-brand-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Security</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-center text-sm text-gray-300">
                    <Shield className="h-4 w-4 mr-2 text-brand-gold" />
                    Secure payments with Stripe
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <FileText className="h-4 w-4 mr-2 text-brand-gold" />
                    Instant PDF delivery
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-300 text-center">
            &copy; {new Date().getFullYear()} LexAtlas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
