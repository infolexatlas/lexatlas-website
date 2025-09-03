import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Error Boundaries', () => {
  const appDir = path.join(process.cwd(), 'src', 'app')
  
  it('should have global error boundary', () => {
    const globalErrorPath = path.join(appDir, 'global-error.tsx')
    expect(fs.existsSync(globalErrorPath)).toBe(true)
  })

  it('should have app error boundary', () => {
    const appErrorPath = path.join(appDir, 'error.tsx')
    expect(fs.existsSync(appErrorPath)).toBe(true)
  })

  it('should have pricing error boundary', () => {
    const pricingErrorPath = path.join(appDir, 'pricing', 'error.tsx')
    expect(fs.existsSync(pricingErrorPath)).toBe(true)
  })

  it('should have kit error boundary', () => {
    const kitErrorPath = path.join(appDir, 'kits', '[slug]', 'error.tsx')
    expect(fs.existsSync(kitErrorPath)).toBe(true)
  })

  it('should have app not-found page', () => {
    const appNotFoundPath = path.join(appDir, 'not-found.tsx')
    expect(fs.existsSync(appNotFoundPath)).toBe(true)
  })

  it('should have kit not-found page', () => {
    const kitNotFoundPath = path.join(appDir, 'kits', '[slug]', 'not-found.tsx')
    expect(fs.existsSync(kitNotFoundPath)).toBe(true)
  })
})
