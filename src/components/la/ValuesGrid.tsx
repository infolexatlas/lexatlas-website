'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HoverLift, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { 
  Shield, 
  Users, 
  FileText, 
  Award, 
  Globe, 
  Heart 
} from 'lucide-react'

/**
 * Values/Pillars section with premium card design
 * Features depth-2 elevation on hover and animated underlines
 */
export const ValuesGrid = () => {
  const values = [
    {
      icon: Shield,
      title: 'Expert Quality',
      description: 'Every guide is meticulously researched and reviewed by legal professionals with international expertise.',
      color: 'from-blue-500/10 to-blue-600/10'
    },
    {
      icon: Users,
      title: 'User-Focused',
      description: 'Designed for real people navigating real legal challenges, not legal professionals.',
      color: 'from-emerald-500/10 to-emerald-600/10'
    },
    {
      icon: FileText,
      title: 'Clear Guidance',
      description: 'Step-by-step instructions in plain language that anyone can understand and follow.',
      color: 'from-purple-500/10 to-purple-600/10'
    },
    {
      icon: Award,
      title: 'Professional Curation',
      description: 'Expert-curated content from legal professionals with deep international experience.',
      color: 'from-amber-500/10 to-amber-600/10'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Comprehensive coverage of 10 countries with up-to-date legal requirements.',
      color: 'from-cyan-500/10 to-cyan-600/10'
    },
    {
      icon: Heart,
      title: 'Customer Success',
      description: 'Your success is our priority. We\'re here to support you every step of the way.',
      color: 'from-rose-500/10 to-rose-600/10'
    }
  ]

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-ivory to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">
              Our Values
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight mb-6">
            What Drives Us Forward
          </h2>
          <p className="text-xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed">
            Six core principles that guide everything we do, from research to customer support.
          </p>
        </div>

        {/* Values Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <StaggerItem key={value.title}>
              <HoverLift scale={1.02}>
                <Card className="h-full min-h-[280px] border-0 bg-white/75 backdrop-blur rounded-2xl ring-1 ring-black/5 shadow-soft hover:shadow-premium transition-all duration-250 group">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-250`}>
                      <value.icon className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl font-serif text-brand-navy group-hover:text-brand-gold transition-colors duration-250 relative">
                      {value.title}
                      <div className="absolute bottom-0 left-0 h-0.5 bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brand-textMuted leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
