'use client'
import * as React from 'react'
import { motion } from 'framer-motion'
import { useMountAnimation } from './useMountAnimation'

export type Iso3 =
  | 'fra' | 'usa' | 'gbr' | 'can' | 'mar' | 'deu' | 'che' | 'bel' | 'esp' | 'ita' | 'prt'

/** Official flag colors (RGB values from flag specifications) */
const FLAG: Record<Iso3, string[]> = {
  fra: ['#002395', '#FFFFFF', '#ED2939'], // French blue, white, French red
  usa: ['#B22234', '#FFFFFF', '#3C3B6E'], // Old Glory red, white, Old Glory blue (canton)
  gbr: ['#012169', '#FFFFFF', '#C8102E'], // Union Jack blue, white, Union Jack red
  can: ['#FF0000', '#FFFFFF', '#FF0000'], // Canadian red, white, Canadian red
  mar: ['#C1272D', '#006233', '#C1272D'], // Moroccan red, green, red
  deu: ['#000000', '#DD0000', '#FFCE00'], // German black, red, gold
  che: ['#FF0000', '#FFFFFF', '#FF0000'], // Swiss red, white, red
  bel: ['#000000', '#FDDA24', '#EF3340'], // Belgian black, yellow, red
  esp: ['#AA151B', '#F1BF00', '#AA151B'], // Spanish red, yellow, red
  ita: ['#009246', '#FFFFFF', '#CE2B37'], // Italian green, white, red
  prt: ['#006600', '#FFCC00', '#FF0000'], // Portuguese green, yellow, red
}

// Helper function to render US flag with proper canton and stripes
function renderUSFlag() {
  return (
    <g>
      {/* Background - alternating red and white stripes */}
      <rect x="0" y="0" width="16" height="10" fill="#B22234" /> {/* Red background */}
      {/* White stripes */}
      <rect x="0" y="1.25" width="16" height="0.625" fill="#FFFFFF" />
      <rect x="0" y="2.5" width="16" height="0.625" fill="#FFFFFF" />
      <rect x="0" y="3.75" width="16" height="0.625" fill="#FFFFFF" />
      <rect x="0" y="5" width="16" height="0.625" fill="#FFFFFF" />
      <rect x="0" y="6.25" width="16" height="0.625" fill="#FFFFFF" />
      <rect x="0" y="7.5" width="16" height="0.625" fill="#FFFFFF" />
      <rect x="0" y="8.75" width="16" height="0.625" fill="#FFFFFF" />
      
      {/* Canton (blue field) */}
      <rect x="0" y="0" width="6.4" height="5" fill="#3C3B6E" />
      
      {/* Stars in canton (simplified as small circles) */}
      <circle cx="1.6" cy="1" r="0.3" fill="#FFFFFF" />
      <circle cx="3.2" cy="1" r="0.3" fill="#FFFFFF" />
      <circle cx="4.8" cy="1" r="0.3" fill="#FFFFFF" />
      <circle cx="1.6" cy="2" r="0.3" fill="#FFFFFF" />
      <circle cx="3.2" cy="2" r="0.3" fill="#FFFFFF" />
      <circle cx="4.8" cy="2" r="0.3" fill="#FFFFFF" />
      <circle cx="1.6" cy="3" r="0.3" fill="#FFFFFF" />
      <circle cx="3.2" cy="3" r="0.3" fill="#FFFFFF" />
      <circle cx="4.8" cy="3" r="0.3" fill="#FFFFFF" />
      <circle cx="1.6" cy="4" r="0.3" fill="#FFFFFF" />
      <circle cx="3.2" cy="4" r="0.3" fill="#FFFFFF" />
      <circle cx="4.8" cy="4" r="0.3" fill="#FFFFFF" />
    </g>
  )
}

// Helper: simplified Union Jack (UK) flag at 16x10 units
function renderGBRFlag() {
  return (
    <g>
      <defs>
        <clipPath id="gbrClip16x10">
          <rect x="0" y="0" width="16" height="10" />
        </clipPath>
      </defs>
      <g clipPath="url(#gbrClip16x10)">
        {/* Blue background */}
        <rect x="0" y="0" width="16" height="10" fill="#012169" />
        {/* White diagonals */}
        <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter">
          <line x1="0" y1="0" x2="16" y2="10" />
          <line x1="0" y1="10" x2="16" y2="0" />
        </g>
        {/* Red diagonals (narrower) */}
        <g stroke="#C8102E" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="miter">
          <line x1="0" y1="0" x2="16" y2="10" />
          <line x1="0" y1="10" x2="16" y2="0" />
        </g>
        {/* White central cross */}
        <rect x="0" y="4" width="16" height="2" fill="#FFFFFF" />
        <rect x="7" y="0" width="2" height="10" fill="#FFFFFF" />
        {/* Red central cross (narrower) */}
        <rect x="0" y="4.5" width="16" height="1" fill="#C8102E" />
        <rect x="7.5" y="0" width="1" height="10" fill="#C8102E" />
      </g>
    </g>
  )
}

// Helper: simplified Canada flag (CA) at 16x10 units with maple leaf
function renderCANFlag() {
  return (
    <g>
      {/* Side red bands (1:2:1 proportions → 4px each side) */}
      <rect x="0" y="0" width="4" height="10" fill="#FF0000" />
      <rect x="12" y="0" width="4" height="10" fill="#FF0000" />
      {/* Center white field */}
      <rect x="4" y="0" width="8" height="10" fill="#FFFFFF" />
      {/* Maple leaf - visible, centered over white field */}
      <g transform="translate(8,5)">
        <path
          d="M 0 -3.6
             L 0.7 -2.6
             L 1.5 -3.0
             L 1.2 -1.8
             L 2.2 -2.0
             L 1.4 -0.9
             L 2.4 -0.7
             L 1.3 -0.1
             L 1.7 1.0
             L 0.9 0.6
             L 0.6 2.2
             L 0 1.5
             L -0.6 2.2
             L -0.9 0.6
             L -1.7 1.0
             L -1.3 -0.1
             L -2.4 -0.7
             L -1.4 -0.9
             L -2.2 -2.0
             L -1.2 -1.8
             L -1.5 -3.0
             L -0.7 -2.6 Z"
          fill="#FF0000"
        />
        {/* stem */}
        <rect x="-0.22" y="1.5" width="0.44" height="1.8" fill="#FF0000" />
      </g>
    </g>
  )
}

export function CrossPassports({ partner }: { partner: Iso3 }) {
  const mounted = useMountAnimation()
  const fra = FLAG.fra
  const oth = FLAG[partner] ?? FLAG.usa
  return (
    <motion.div className="relative h-40 w-40 md:h-56 md:w-56 lg:h-72 lg:w-72 group animate-float transition-transform duration-300 will-change-transform hover:-translate-y-1" aria-hidden
      initial={mounted ? { opacity: 0, scale: 0.98, y: 8 } : false}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0%' }}
      transition={{ duration: 0.5 }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          {/* soft top shine overlay */}
          <linearGradient id="shine" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".22" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* gold glow for emblem */}
          <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ground shadows under passports */}
        <ellipse cx="70" cy="78" rx="18" ry="5" fill="#000" opacity=".06" />
        <ellipse cx="28" cy="82" rx="18" ry="5" fill="#000" opacity=".06" />

        {/* Right passport (partner) */}
        <g className="animate-float" style={{ animationDelay: '0s', animationDuration: '4.8s' }}>
          <g transform="translate(56,18) rotate(18)">
            {/* cover fill */}
            <rect x="-22" y="0" width="44" height="60" rx="6" fill="var(--la-primary)" />
            {/* outline */}
            <rect x="-22" y="0" width="44" height="60" rx="6" fill="none" stroke="#000" strokeOpacity=".12" strokeWidth="1.5" />
            {/* top shine overlay (rounded to match cover) */}
            <rect x="-22" y="0" width="44" height="24" rx="6" fill="url(#shine)" />
            {/* spine (left edge) */}
            <rect x="-22" y="2" width="3.5" height="56" rx="2" fill="#000" opacity=".08" />
            {/* Flag sticker (top-right corner) */}
            <g transform="translate(6,6)">
              {partner === 'usa' ? (
                <g>
                  {renderUSFlag()}
                </g>
              ) : partner === 'gbr' ? (
                <g>
                  {renderGBRFlag()}
                </g>
              ) : partner === 'can' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagCAClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/ca.svg" width="16" height="10" clipPath="url(#flagCAClip)"/>
                </svg>
              ) : partner === 'mar' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagMAClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/ma.svg" width="16" height="10" clipPath="url(#flagMAClip)"/>
                </svg>
              ) : partner === 'fra' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagFRClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/fr.svg" width="16" height="10" clipPath="url(#flagFRClip)"/>
                </svg>
              ) : partner === 'deu' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagDEClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/de.svg" width="16" height="10" clipPath="url(#flagDEClip)"/>
                </svg>
              ) : partner === 'che' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagCHClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/ch.svg" width="16" height="10" clipPath="url(#flagCHClip)"/>
                </svg>
              ) : partner === 'bel' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagBEClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/be.svg" width="16" height="10" clipPath="url(#flagBEClip)"/>
                </svg>
              ) : partner === 'esp' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagESClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/es.svg" width="16" height="10" clipPath="url(#flagESClip)"/>
                </svg>
              ) : partner === 'ita' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagITClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/it.svg" width="16" height="10" clipPath="url(#flagITClip)"/>
                </svg>
              ) : partner === 'prt' ? (
                <svg width="16" height="10" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="flagPTClip">
                      <rect x="0" y="0" width="16" height="10" rx="1" ry="1" />
                    </clipPath>
                  </defs>
                  <image href="/flags/pt.svg" width="16" height="10" clipPath="url(#flagPTClip)"/>
                </svg>
              ) : (
                <>
                  <rect x="0" y="0" width="5.33" height="10" rx="1" fill={oth[0]} />
                  <rect x="5.33" y="0" width="5.33" height="10" rx="1" fill={oth[1]} />
                  <rect x="10.66" y="0" width="5.34" height="10" rx="1" fill={oth[2]} />
                </>
              )}
            </g>
            {/* gold compass emblem (with slight glow) */}
            <g filter="url(#goldGlow)" transform="translate(0, 30)">
              {/* Outer circle */}
              <circle cx="0" cy="0" r="7" fill="none" stroke="var(--la-accent)" strokeWidth="1.5" />
              {/* Inner circle */}
              <circle cx="0" cy="0" r="5" fill="none" stroke="var(--la-accent)" strokeWidth="0.8" />
              {/* Cardinal directions - positioned outside the outer circle */}
              <text x="0" y="-9.5" textAnchor="middle" fontSize="4" fill="var(--la-accent)" fontWeight="bold">N</text>
              <text x="0" y="12" textAnchor="middle" fontSize="4" fill="var(--la-accent)" fontWeight="bold">S</text>
              <text x="-10.5" y="0" textAnchor="middle" fontSize="4" fill="var(--la-accent)" fontWeight="bold">W</text>
              <text x="10" y="0" textAnchor="middle" fontSize="4" fill="var(--la-accent)" fontWeight="bold">E</text>
              {/* Compass needle */}
              <path d="M0 -5 L-1.5 0 L0 5 L1.5 0 Z" fill="var(--la-accent)" />
              {/* Center dot */}
              <circle cx="0" cy="0" r="1" fill="var(--la-accent)" />
            </g>
          </g>
        </g>

        {/* Left passport (FRA) */}
        <g className="animate-float" style={{ animationDelay: '2.4s', animationDuration: '5.6s' }}>
          <g transform="translate(30,24) rotate(-18)">
            {/* cover fill */}
            <rect x="-22" y="0" width="44" height="60" rx="6" fill="var(--la-primary)" />
            {/* outline */}
            <rect x="-22" y="0" width="44" height="60" rx="6" fill="none" stroke="#000" strokeOpacity=".12" strokeWidth="1.5" />
            {/* top shine overlay (rounded to match cover) */}
            <rect x="-22" y="0" width="44" height="24" rx="6" fill="url(#shine)" />
            {/* spine (left edge) */}
            <rect x="-22" y="2" width="3.5" height="56" rx="2" fill="#000" opacity=".08" />
            {/* FRA flag sticker (top-left corner) — no white backing */}
            <g transform="translate(-22,6)">
              <rect x="0" y="0" width="5.33" height="10" rx="1" fill={fra[0]} />
              <rect x="5.33" y="0" width="5.33" height="10" rx="1" fill={fra[1]} />
              <rect x="10.66" y="0" width="5.34" height="10" rx="1" fill={fra[2]} />
            </g>
            {/* gold compass emblem (with slight glow) */}
            <g filter="url(#goldGlow)" transform="translate(0, 30)">
              {/* Outer circle */}
              <circle cx="0" cy="0" r="7" fill="none" stroke="var(--la-accent)" strokeWidth="1.5" />
              {/* Inner circle */}
              <circle cx="0" cy="0" r="5" fill="none" stroke="var(--la-accent)" strokeWidth="0.8" />
              {/* Cardinal directions - positioned outside the outer circle */}
              <text x="0" y="-9.5" textAnchor="middle" fontSize="4" fill="var(--la-accent)" fontWeight="bold">N</text>
              <text x="0" y="12" textAnchor="middle" fontSize="4" fill="var(--la-accent)" fontWeight="bold">S</text>
              <text x="-10.5" y="0" textAnchor="middle" fontSize="4" fill="var(--la-accent)" fontWeight="bold">W</text>
              <text x="10" y="0" textAnchor="middle" fontSize="4" fill="var(--la-accent)" fontWeight="bold">E</text>
              {/* Compass needle */}
              <path d="M0 -5 L-1.5 0 L0 5 L1.5 0 Z" fill="var(--la-accent)" />
              {/* Center dot */}
              <circle cx="0" cy="0" r="1" fill="var(--la-accent)" />
            </g>
          </g>
        </g>
      </svg>
    </motion.div>
  )
}


