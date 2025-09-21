import { describe, it, expect, vi } from 'vitest'

// Mock the env module
vi.mock('../env', () => ({
  IS_DEV: false,
  IS_PROD: false,
  RESEND_API_KEY: 'test_key',
  BASE_URL: 'http://localhost:3000'
}))

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn()
    }
  }))
}))

// Import after mocking
import { sendLeadMagnetEmail, sendNewsletterEmail } from '../email'

describe('Email Functions', () => {
  describe('sendLeadMagnetEmail', () => {
    it('should have correct function signature', () => {
      expect(typeof sendLeadMagnetEmail).toBe('function')
      expect(sendLeadMagnetEmail.length).toBe(2) // email and opts parameters
    })

    it('should return a promise', () => {
      const result = sendLeadMagnetEmail('test@example.com')
      expect(result).toBeInstanceOf(Promise)
    })
  })

  describe('sendNewsletterEmail', () => {
    it('should have correct function signature', () => {
      expect(typeof sendNewsletterEmail).toBe('function')
      expect(sendNewsletterEmail.length).toBe(2) // email and opts parameters
    })

    it('should return a promise', () => {
      const result = sendNewsletterEmail('test@example.com')
      expect(result).toBeInstanceOf(Promise)
    })
  })
})
