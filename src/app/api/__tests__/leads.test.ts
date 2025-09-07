import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock the email functions
vi.mock('@/lib/email', () => ({
  sendLeadMagnetEmail: vi.fn(),
  sendNewsletterEmail: vi.fn()
}))

// Mock the env module
vi.mock('@/lib/env', () => ({
  IS_DEV: false
}))

// Mock fs
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    appendFileSync: vi.fn()
  }
}))

// Import after mocking
import { POST } from '../leads/route'
import { sendLeadMagnetEmail, sendNewsletterEmail } from '@/lib/email'

describe('Leads API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const createMockRequest = (body: any) => {
    return {
      json: vi.fn().mockResolvedValue(body)
    } as any
  }

  describe('POST /api/leads', () => {
    it('should return 400 for missing email', async () => {
      const request = createMockRequest({})
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Email is required')
    })

    it('should return 400 for invalid email format', async () => {
      const request = createMockRequest({ email: 'invalid-email' })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })

    it('should handle successful lead magnet email in production', async () => {
      vi.mocked(sendLeadMagnetEmail).mockResolvedValue({ sent: true })
      
      const request = createMockRequest({ 
        email: 'test@example.com', 
        source: 'lead_magnet_banner' 
      })
      
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        ok: true,
        saved: true,
        emailed: true,
        mode: 'prod',
        message: 'Thank you! Check your email for the free sample.'
      })
      expect(sendLeadMagnetEmail).toHaveBeenCalledWith('test@example.com', { source: 'lead_magnet_banner' })
    })

    it('should handle successful newsletter email in production', async () => {
      vi.mocked(sendNewsletterEmail).mockResolvedValue({ sent: true })
      
      const request = createMockRequest({ 
        email: 'test@example.com', 
        source: 'newsletter' 
      })
      
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        ok: true,
        saved: true,
        emailed: true,
        mode: 'prod',
        message: 'Thank you! Check your email for the free sample.'
      })
      expect(sendNewsletterEmail).toHaveBeenCalledWith('test@example.com', { source: 'newsletter' })
    })

    it('should return 500 in production when email fails', async () => {
      vi.mocked(sendLeadMagnetEmail).mockResolvedValue({ sent: false, reason: 'send_failed' })
      
      const request = createMockRequest({ 
        email: 'test@example.com', 
        source: 'lead_magnet_banner' 
      })
      
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({
        ok: false,
        error: 'email_failed',
        message: 'Failed to send email. Please try again later.'
      })
    })

    it('should return 500 in production when email throws exception', async () => {
      vi.mocked(sendLeadMagnetEmail).mockRejectedValue(new Error('Network error'))
      
      const request = createMockRequest({ 
        email: 'test@example.com', 
        source: 'lead_magnet_banner' 
      })
      
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({
        ok: false,
        error: 'email_failed',
        message: 'Failed to send email. Please try again later.'
      })
    })
  })
})
