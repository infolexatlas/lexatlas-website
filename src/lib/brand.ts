// Centralized brand constants (avoid color drift across UI and emails)

export const BRAND_HEX =
  process.env.NEXT_PUBLIC_BRAND_BLUE?.trim() ||
  // Using the brand-navy color from the theme system
  '#1A2E4F' // brand-navy from globals.css

// Simple logo resolution - prioritize /logo.svg since we created it
export const LOGO_SRC = '/logo.svg'