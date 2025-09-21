// Centralized brand constants (avoid color drift across UI and emails)
import fs from 'node:fs'
import path from 'node:path'

function fileExists(p: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', p.replace(/^\//, '')))
  } catch {
    return false
  }
}

export const BRAND_HEX =
  process.env.NEXT_PUBLIC_BRAND_BLUE?.trim() ||
  // Using the brand-navy color from the theme system
  '#1A2E4F' // brand-navy from globals.css

export const LOGO_SRC = fileExists('/logo.svg')
  ? '/logo.svg'
  : fileExists('/logo/lexatlas.svg')
    ? '/logo/lexatlas.svg'
    : 'https://lex-atlas.com/logo.svg'