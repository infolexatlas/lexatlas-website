import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1A2E4F',
          navyEdge: '#223A63',
          gold: '#D4AF37',
          softGold: '#C9A24E',
          ivory: '#FAFAF7',
          gray: '#F2F2F2',
          text: '#222222',
          textMuted: '#444444',
          accent: '#3BA3A3',
          // Backward compatibility aliases
          deep: '#1A2E4F', // maps to navy
          goldMuted: '#C9A24E', // maps to softGold
          bg: '#FFFFFF',
          muted: '#F5F7FB',
        },
        // Accessible badge and success tones
        emerald: {
          700: '#047857' // for savings text
        },
        // Semantic color aliases for premium design
        la: {
          bg: 'var(--brand-bg)',
          surface: 'var(--brand-muted)',
          text: 'var(--brand-deep)',
          accent: 'var(--brand-gold)',
          primary: 'var(--brand-deep)',
        }
      },
      fontFamily: {
        serif: ['Times New Roman', 'Georgia', 'ui-serif', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl2': '1.25rem', // Custom radius for premium feel
        '2xl': '1rem', // Standard 2xl radius
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(26, 46, 79, 0.08)',
        'premium': '0 8px 32px -4px rgba(26, 46, 79, 0.12)',
        'gold-glow': '0 0 0 3px rgba(212, 175, 55, 0.28)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'reveal': 'reveal 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        reveal: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}

export default config
