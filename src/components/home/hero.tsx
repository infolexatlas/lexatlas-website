import Link from 'next/link'
import { ArrowRight, Globe, Shield, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-muted to-white py-20 lg:py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-brand-deep leading-tight">
                Cross‑Border Legal Kits,{' '}
                <span className="text-brand-gold">Done Right.</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl">
                Expert-built, country‑specific PDF guides to handle international 
                marriage procedures with clarity and confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link href="/kits/marriage-kit">
                  Explore the Marriage Kit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link href="/kits">Browse All Kits</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-brand-gold" />
                <span>30 Countries Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-gold" />
                <span>Secure & Trusted</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-gold" />
                <span>Instant Download</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FileText className="h-4 w-4" />
                  <span>Cross-Border Marriage Kit.pdf</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
