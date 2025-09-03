import { describe, it, expect } from 'vitest'

// Simple function to get canonical legal paths
export function getLegalLinks(): string[] {
  return [
    '/privacy',
    '/terms', 
    '/cookie-policy'
  ]
}

describe('Legal Links', () => {
  it('should include canonical cookie policy route', () => {
    const legalLinks = getLegalLinks()
    expect(legalLinks).toContain('/cookie-policy')
  })

  it('should include all required legal routes', () => {
    const legalLinks = getLegalLinks()
    expect(legalLinks).toContain('/privacy')
    expect(legalLinks).toContain('/terms')
    expect(legalLinks).toContain('/cookie-policy')
  })

  it('should not include legacy cookie routes', () => {
    const legalLinks = getLegalLinks()
    expect(legalLinks).not.toContain('/cookies')
    expect(legalLinks).not.toContain('/legal/cookies')
    expect(legalLinks).not.toContain('/legal/cookie-policy')
  })
})
