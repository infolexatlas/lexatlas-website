'use client'

import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HoverLift, FadeIn } from '@/components/ui/motion'
import { ChevronLeft, ChevronRight, Mail, Linkedin } from 'lucide-react'

/**
 * Team/Advisors section with horizontal scroll rail
 * Features snap points, keyboard navigation, and hover states
 */
export const TeamRail = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Legal Researcher',
      bio: 'International law specialist with 15+ years experience in cross-border legal procedures.',
      avatar: '/api/placeholder/200/200',
      email: 'sarah@lexatlas.com',
      linkedin: 'https://linkedin.com/in/sarahchen'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Legal Content Director',
      bio: 'Former consular officer with expertise in marriage recognition across 30+ countries.',
      avatar: '/api/placeholder/200/200',
      email: 'marcus@lexatlas.com',
      linkedin: 'https://linkedin.com/in/marcusrodriguez'
    },
    {
      name: 'Dr. Elena Petrov',
      role: 'International Law Advisor',
      bio: 'PhD in International Law with focus on family law and human rights.',
      avatar: '/api/placeholder/200/200',
      email: 'elena@lexatlas.com',
      linkedin: 'https://linkedin.com/in/elenapetrov'
    },
    {
      name: 'James Thompson',
      role: 'Customer Success Lead',
      bio: 'Dedicated to ensuring every couple receives the support they need.',
      avatar: '/api/placeholder/200/200',
      email: 'james@lexatlas.com',
      linkedin: 'https://linkedin.com/in/jamesthompson'
    },
    {
      name: 'Dr. Aisha Patel',
      role: 'Legal Verification Specialist',
      bio: 'Ensures all content meets the highest standards of accuracy and reliability.',
      avatar: '/api/placeholder/200/200',
      email: 'aisha@lexatlas.com',
      linkedin: 'https://linkedin.com/in/aishapatel'
    }
  ]

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    
    const scrollAmount = 400
    const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <div className="mb-4">
              <span className="text-sm font-medium text-brand-gold uppercase tracking-wider">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-navy tracking-tight mb-6">
              Meet the Experts Behind LexAtlas
            </h2>
            <p className="text-xl text-brand-textMuted max-w-3xl mx-auto leading-relaxed">
              International legal professionals dedicated to making cross-border marriage accessible to everyone.
            </p>
          </div>
        </FadeIn>

        {/* Team Rail */}
        <div className="relative group">
          {/* Scroll Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-250 disabled:opacity-0"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-250 disabled:opacity-0"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
            role="region"
            aria-label="Team members"
          >
            {team.map((member, index) => (
              <div
                key={member.name}
                className="flex-shrink-0 w-80 snap-start"
                tabIndex={0}
              >
                <HoverLift scale={1.02}>
                  <Card className="h-full border-0 bg-white/75 backdrop-blur rounded-2xl ring-1 ring-black/5 shadow-soft hover:shadow-premium transition-all duration-250 group">
                    <CardHeader className="text-center pb-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-brand-navy/10 to-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-250">
                        <div className="w-20 h-20 bg-brand-navy/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-brand-navy">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-serif text-brand-navy group-hover:text-brand-gold transition-colors duration-250">
                        {member.name}
                      </CardTitle>
                      <p className="text-brand-gold font-medium text-sm">
                        {member.role}
                      </p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-brand-textMuted leading-relaxed mb-6">
                        {member.bio}
                      </p>
                      <div className="flex justify-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-brand-navy hover:text-brand-gold"
                          onClick={() => window.open(`mailto:${member.email}`)}
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-brand-navy hover:text-brand-gold"
                          onClick={() => window.open(member.linkedin, '_blank')}
                          aria-label={`View ${member.name} on LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </HoverLift>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
