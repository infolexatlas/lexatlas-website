'use client'

/**
 * Animation Guide Component
 * 
 * This component documents the animation system for LexAtlas.
 * It's not used in production but serves as a reference for developers.
 */

import { ScrollAnimation, StaggerAnimation, HoverAnimation, TextReveal } from './animations'

export function AnimationGuide() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-brand-navy mb-4">LexAtlas Animation System</h1>
        <p className="text-lg text-brand-textMuted">
          A comprehensive guide to the animation system used across the site
        </p>
      </div>

      {/* Scroll Animations */}
      <section>
        <h2 className="text-2xl font-bold text-brand-navy mb-6">Scroll-Triggered Animations</h2>
        
        <div className="space-y-8">
          <ScrollAnimation>
            <div className="p-6 bg-white rounded-xl shadow-soft border">
              <h3 className="text-lg font-semibold text-brand-navy mb-2">Basic Scroll Animation</h3>
              <p className="text-brand-textMuted">
                This content animates in when it comes into view. Uses fadeInUp by default.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation variant={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } }}>
            <div className="p-6 bg-brand-gold/10 rounded-xl border border-brand-gold/20">
              <h3 className="text-lg font-semibold text-brand-navy mb-2">Custom Variant</h3>
              <p className="text-brand-textMuted">
                This slides in from the left with a custom animation variant.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Staggered Animations */}
      <section>
        <h2 className="text-2xl font-bold text-brand-navy mb-6">Staggered Animations</h2>
        
        <StaggerAnimation className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-soft border">
            <h3 className="font-semibold text-brand-navy mb-2">Item 1</h3>
            <p className="text-sm text-brand-textMuted">Animates in first</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-soft border">
            <h3 className="font-semibold text-brand-navy mb-2">Item 2</h3>
            <p className="text-sm text-brand-textMuted">Animates in second</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-soft border">
            <h3 className="font-semibold text-brand-navy mb-2">Item 3</h3>
            <p className="text-sm text-brand-textMuted">Animates in third</p>
          </div>
        </StaggerAnimation>
      </section>

      {/* Hover Animations */}
      <section>
        <h2 className="text-2xl font-bold text-brand-navy mb-6">Hover Animations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HoverAnimation>
            <div className="p-6 bg-white rounded-xl shadow-soft border cursor-pointer">
              <h3 className="text-lg font-semibold text-brand-navy mb-2">Hover Lift</h3>
              <p className="text-brand-textMuted">
                Hover over this card to see the lift animation with scale and shadow effects.
              </p>
            </div>
          </HoverAnimation>

          <HoverAnimation scale={1.05} lift={false}>
            <div className="p-6 bg-brand-gold/10 rounded-xl border border-brand-gold/20 cursor-pointer">
              <h3 className="text-lg font-semibold text-brand-navy mb-2">Scale Only</h3>
              <p className="text-brand-textMuted">
                This card only scales on hover without the lift effect.
              </p>
            </div>
          </HoverAnimation>
        </div>
      </section>

      {/* Text Reveal */}
      <section>
        <h2 className="text-2xl font-bold text-brand-navy mb-6">Text Reveal</h2>
        
        <TextReveal>
          <h3 className="text-xl font-semibold text-brand-navy mb-4">
            This heading animates in with a smooth reveal effect
          </h3>
        </TextReveal>
        
        <TextReveal delay={0.2}>
          <p className="text-brand-textMuted">
            This paragraph has a slight delay to create a cascading effect.
          </p>
        </TextReveal>
      </section>

      {/* CSS Animation Classes */}
      <section>
        <h2 className="text-2xl font-bold text-brand-navy mb-6">CSS Animation Classes</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg shadow-soft border animate-fade-in-up">
            <h3 className="font-semibold text-brand-navy mb-2">animate-fade-in-up</h3>
            <p className="text-sm text-brand-textMuted">Fades in and slides up</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-soft border animate-slide-in-left">
            <h3 className="font-semibold text-brand-navy mb-2">animate-slide-in-left</h3>
            <p className="text-sm text-brand-textMuted">Slides in from the left</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-soft border animate-slide-in-right">
            <h3 className="font-semibold text-brand-navy mb-2">animate-slide-in-right</h3>
            <p className="text-sm text-brand-textMuted">Slides in from the right</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-soft border animate-bounce-in">
            <h3 className="font-semibold text-brand-navy mb-2">animate-bounce-in</h3>
            <p className="text-sm text-brand-textMuted">Bounces in with scale effect</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg shadow-soft border animate-scale-in-center">
            <h3 className="font-semibold text-brand-navy mb-2">animate-scale-in-center</h3>
            <p className="text-sm text-brand-textMuted">Scales in from center</p>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 className="text-2xl font-bold text-brand-navy mb-6">Usage Guidelines</h2>
        
        <div className="space-y-6">
          <div className="p-6 bg-brand-ivory rounded-xl border border-brand-gold/20">
            <h3 className="text-lg font-semibold text-brand-navy mb-3">Performance</h3>
            <ul className="space-y-2 text-brand-textMuted">
              <li>• All animations use transform and opacity for optimal performance</li>
              <li>• Animations respect prefers-reduced-motion settings</li>
              <li>• Use scroll-triggered animations sparingly to avoid overwhelming users</li>
            </ul>
          </div>
          
          <div className="p-6 bg-brand-ivory rounded-xl border border-brand-gold/20">
            <h3 className="text-lg font-semibold text-brand-navy mb-3">Accessibility</h3>
            <ul className="space-y-2 text-brand-textMuted">
              <li>• All animations automatically disable for users with reduced motion preferences</li>
              <li>• Focus states are preserved and enhanced with animations</li>
              <li>• Animations don't interfere with screen readers</li>
            </ul>
          </div>
          
          <div className="p-6 bg-brand-ivory rounded-xl border border-brand-gold/20">
            <h3 className="text-lg font-semibold text-brand-navy mb-3">Best Practices</h3>
            <ul className="space-y-2 text-brand-textMuted">
              <li>• Use consistent timing (0.4-0.6s for most animations)</li>
              <li>• Stagger animations for lists and grids (0.1s delay between items)</li>
              <li>• Use hover animations for interactive elements</li>
              <li>• Keep animations subtle and purposeful</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
