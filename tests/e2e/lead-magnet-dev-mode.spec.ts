import { test, expect } from '@playwright/test'

test.describe('Lead Magnet - Development Mode', () => {
  test('should show save-only mode warning when RESEND_API_KEY is missing', async ({ page }) => {
    // Navigate to home page
    await page.goto('/')
    
    // Find the lead magnet banner
    const leadMagnetBanner = page.locator('[data-testid="lead-magnet-banner"]').first()
    await expect(leadMagnetBanner).toBeVisible()
    
    // Fill in email
    const emailInput = leadMagnetBanner.locator('input[type="email"]')
    await emailInput.fill('test@example.com')
    
    // Submit the form
    const submitButton = leadMagnetBanner.locator('button[type="submit"]')
    await submitButton.click()
    
    // Wait for success state
    await expect(page.locator('text=Success!')).toBeVisible()
    await expect(page.locator('text=Thank you! Your lead is saved.')).toBeVisible()
    
    // Check for development mode warning
    await expect(page.locator('text=Email not sent in development (missing RESEND_API_KEY).')).toBeVisible()
    
    // Verify the warning has the correct styling
    const warningElement = page.locator('.text-amber-600')
    await expect(warningElement).toBeVisible()
  })
  
  test('should handle invalid email format', async ({ page }) => {
    // Navigate to home page
    await page.goto('/')
    
    // Find the lead magnet banner
    const leadMagnetBanner = page.locator('[data-testid="lead-magnet-banner"]').first()
    
    // Fill in invalid email
    const emailInput = leadMagnetBanner.locator('input[type="email"]')
    await emailInput.fill('invalid-email')
    
    // Submit the form
    const submitButton = leadMagnetBanner.locator('button[type="submit"]')
    await submitButton.click()
    
    // Check for error message
    await expect(page.locator('text=Please enter a valid email address.')).toBeVisible()
  })
  
  test('should allow getting another sample after success', async ({ page }) => {
    // Navigate to home page
    await page.goto('/')
    
    // Find the lead magnet banner
    const leadMagnetBanner = page.locator('[data-testid="lead-magnet-banner"]').first()
    
    // Fill in email and submit
    const emailInput = leadMagnetBanner.locator('input[type="email"]')
    await emailInput.fill('test2@example.com')
    
    const submitButton = leadMagnetBanner.locator('button[type="submit"]')
    await submitButton.click()
    
    // Wait for success state
    await expect(page.locator('text=Success!')).toBeVisible()
    
    // Click "Get Another Sample" button
    const getAnotherButton = page.locator('text=Get Another Sample')
    await getAnotherButton.click()
    
    // Verify we're back to the form
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toHaveValue('')
  })
})
