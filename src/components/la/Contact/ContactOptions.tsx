'use client'

import { Mail, HelpCircle, FileText, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export function ContactOptions() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact.lexatlas@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy email:', error)
    }
  }

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email directly for personalized assistance',
      action: 'Copy Email',
      href: 'mailto:contact.lexatlas@gmail.com',
      onClick: handleCopyEmail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Find answers to common questions in our FAQ',
      action: 'Browse FAQ',
      href: '/faq',
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10',
    },
    {
      icon: FileText,
      title: 'Marriage Kits',
      description: 'Explore our comprehensive legal guides and resources',
      action: 'View Kits',
      href: '/kits',
      color: 'text-brand-gold',
      bgColor: 'bg-brand-gold/10',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-deep mb-4">
              Other Ways to Get Help
            </h2>
            <p className="text-lg text-brand-textMuted">
              Quick access to resources and alternative contact methods
            </p>
          </div>

          {/* Contact Cards */}
          <div>
            <div className="grid md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <Card key={option.title} className="h-full shadow-soft border-brand-gray hover:shadow-premium transition-all duration-300 flex flex-col">
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className={`w-12 h-12 ${option.bgColor} rounded-xl2 flex items-center justify-center mb-4`}>
                      <option.icon className={`w-6 h-6 ${option.color}`} />
                    </div>
                    <CardTitle className="text-xl font-serif text-brand-deep">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-brand-textMuted">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0 flex-1 flex flex-col justify-end">
                    {option.onClick ? (
                      <Button
                        variant="outline"
                        onClick={option.onClick}
                        className="w-full justify-center"
                      >
                        {copied ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            {option.action}
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        asChild
                        className="w-full justify-center"
                      >
                        <a href={option.href}>
                          {option.action}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
