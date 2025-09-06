export const BRAND = {
  name: 'LexAtlas',
  logo: { src: '/logo/lexatlas.svg', alt: 'LexAtlas' },
  colors: {
    navy: '#1A2E4F',  // dominant brand color
    gold: '#D4AF37',  // secondary brand gold
    goldMuted: '#C9A24E',  // fallback variant
    ivory: '#FAFAF7',  // off-white background
    gray: '#F2F2F2',  // light gray
    text: '#222222',  // dark text
    textMuted: '#444444',  // gray text
    accent: '#3BA3A3',  // optional teal accent
    // Backward compatibility
    deep: '#1A2E4F',  // maps to navy
  },
} as const
