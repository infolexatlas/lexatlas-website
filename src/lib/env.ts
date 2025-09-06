// Environment configuration and validation
export const IS_PROD = process.env.NODE_ENV === 'production'
export const IS_DEV = process.env.NODE_ENV === 'development'

// Environment variables
export const RESEND_API_KEY = process.env.RESEND_API_KEY
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

/**
 * Ensures an environment variable is set
 * @param varName - The name of the environment variable
 * @returns The environment variable value
 * @throws Error in production if missing, logs warning in development
 */
export function ensureEnv(varName: string): string {
  const value = process.env[varName]
  
  if (!value) {
    if (IS_PROD) {
      throw new Error(`${varName} is not set`)
    } else {
      console.warn(`[Env] ${varName} is not set — this may cause issues`)
      return ''
    }
  }
  
  return value
}

/**
 * Gets an environment variable with optional fallback
 * @param varName - The name of the environment variable
 * @param fallback - Optional fallback value
 * @returns The environment variable value or fallback
 */
export function getEnv(varName: string, fallback?: string): string {
  return process.env[varName] || fallback || ''
}

/**
 * Checks if Resend is properly configured
 * @returns true if RESEND_API_KEY is set
 */
export function isResendConfigured(): boolean {
  return !!RESEND_API_KEY
}
