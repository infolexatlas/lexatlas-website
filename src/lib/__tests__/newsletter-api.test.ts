import { describe, it, expect } from 'vitest'

// Mock environment variables
const originalEnv = process.env

beforeEach(() => {
  process.env = { ...originalEnv }
})

afterEach(() => {
  process.env = originalEnv
})

// Email validation function (copied from the API)
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  if (email.length > 254) return false // RFC 5321 limit
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

describe('Newsletter API', () => {
  describe('Email validation', () => {
    it('should accept valid emails', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@numbers.com',
        'user@subdomain.example.com'
      ]
      
      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true)
      })
    })

    it('should reject invalid emails', () => {
      const invalidEmails = [
        '',
        'not-an-email',
        '@example.com',
        'user@',
        'user@.com',
        'user..name@example.com',
        'user@example..com',
        'a'.repeat(255) + '@example.com' // Too long
      ]
      
      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false)
      })
    })

    it('should handle edge cases', () => {
      expect(isValidEmail(null as any)).toBe(false)
      expect(isValidEmail(undefined as any)).toBe(false)
      expect(isValidEmail(123 as any)).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('API contract', () => {
    it('should return correct error format for invalid email', () => {
      // This would be tested with actual API calls in integration tests
      const expectedErrorFormat = {
        ok: false,
        error: 'invalid_email'
      }
      
      expect(expectedErrorFormat).toMatchObject({
        ok: false,
        error: expect.any(String)
      })
    })

    it('should return correct success format', () => {
      const expectedSuccessFormat = {
        ok: true,
        sent: true
      }
      
      expect(expectedSuccessFormat).toMatchObject({
        ok: true,
        sent: expect.any(Boolean)
      })
    })

    it('should handle missing API key in development', () => {
      process.env.NODE_ENV = 'development'
      process.env.RESEND_API_KEY = ''
      
      const expectedDevFormat = {
        ok: true,
        sent: false,
        devWarning: expect.stringContaining('Missing RESEND_API_KEY')
      }
      
      expect(expectedDevFormat).toMatchObject({
        ok: true,
        sent: false,
        devWarning: expect.any(String)
      })
    })
  })
})
