'use client'

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion'
import { Calendar, Award, Users, Globe, FileText, Heart } from 'lucide-react'

/**
 * Timeline/Milestones section with vertical steps
 * Uses brand yellow accents and avoids absolute positioning for CLS
 */
export const Timeline = () => {
  const milestones = [
    {
      year: '2025',
      title: 'Foundation',
      description: 'LexAtlas was founded with a mission to democratize access to international legal information.',
      icon: Calendar,
      achievement: 'Company Founded'
    },
    {
      year: 'March 2025',
      title: '100 Couples Milestone',
      description: 'Successfully helped over 100 international couples navigate their marriage procedures.',
      icon: Heart,
      achievement: '100+ Couples Helped'
    },
    {
      year: '2025',
      title: 'Next Goal: 500 Couples',
      description: 'Setting our sights on helping 500 international couples achieve their marriage goals.',
      icon: Users,
      achievement: 'Target: 500 Couples'
    }
  ]

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-ivory to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">
                Our Journey
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight mb-6">
              Milestones That Define Us
            </h2>
            <p className="text-xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to serving thousands of international couples worldwide.
            </p>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold/30 via-brand-gold to-brand-gold/30" />
          
          <StaggerContainer className="space-y-12">
            {milestones.map((milestone, index) => (
              <StaggerItem key={milestone.year}>
                <div className={`flex items-start gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                    <div className="bg-white/75 backdrop-blur rounded-2xl ring-1 ring-black/5 shadow-soft p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-gold/20 to-brand-gold/30 rounded-xl flex items-center justify-center">
                          <milestone.icon className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-brand-gold uppercase tracking-wider">
                            {milestone.achievement}
                          </div>
                          <div className="text-2xl font-bold text-brand-navy">
                            {milestone.year}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-brand-navy mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-brand-textMuted leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-full ring-4 ring-brand-gold/20 shadow-soft flex items-center justify-center">
                      <div className="w-4 h-4 bg-brand-gold rounded-full" />
                    </div>
                  </div>

                  {/* Spacer for mobile */}
                  <div className="flex-1 lg:hidden" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
