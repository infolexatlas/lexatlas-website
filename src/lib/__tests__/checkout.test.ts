import { getSuccessCancelUrls } from '../checkout'

describe('getSuccessCancelUrls', () => {
  const mockRequest = (url: string) => ({
    url,
  } as Request)

  it('uses NEXT_PUBLIC_BASE_URL when present', () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_URL
    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com'
    
    const result = getSuccessCancelUrls(mockRequest('http://localhost:3000/api/checkout'))
    
    expect(result.success_url).toBe('https://example.com/success')
    expect(result.cancel_url).toBe('https://example.com/cancel')
    
    process.env.NEXT_PUBLIC_BASE_URL = originalEnv
  })

  it('falls back to request origin when NEXT_PUBLIC_BASE_URL is not set', () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_URL
    delete process.env.NEXT_PUBLIC_BASE_URL
    
    const result = getSuccessCancelUrls(mockRequest('https://myapp.vercel.app/api/checkout'))
    
    expect(result.success_url).toBe('https://myapp.vercel.app/success')
    expect(result.cancel_url).toBe('https://myapp.vercel.app/cancel')
    
    process.env.NEXT_PUBLIC_BASE_URL = originalEnv
  })

  it('handles localhost URLs correctly', () => {
    const originalEnv = process.env.NEXT_PUBLIC_BASE_URL
    delete process.env.NEXT_PUBLIC_BASE_URL
    
    const result = getSuccessCancelUrls(mockRequest('http://localhost:3000/api/checkout'))
    
    expect(result.success_url).toBe('http://localhost:3000/success')
    expect(result.cancel_url).toBe('http://localhost:3000/cancel')
    
    process.env.NEXT_PUBLIC_BASE_URL = originalEnv
  })
})
