import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('should load contact page successfully', async ({ page }) => {
    await page.goto('/contact')
    
    // Check page title
    await expect(page).toHaveTitle(/Contact/)
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('Get in Touch')
    
    // Check form elements
    await expect(page.getByLabel('Name *')).toBeVisible()
    await expect(page.getByLabel('Email *')).toBeVisible()
    await expect(page.getByLabel('Message *')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Send Message' })).toBeVisible()
  })

  test('should show contact information', async ({ page }) => {
    await page.goto('/contact')
    
    // Check contact info
    await expect(page.getByText('contact.lexatlas@gmail.com')).toBeVisible()
    await expect(page.getByText('Within 24 hours')).toBeVisible()
  })

  test('should show common questions', async ({ page }) => {
    await page.goto('/contact')
    
    // Check FAQ section
    await expect(page.getByText('How do I download my kit?')).toBeVisible()
    await expect(page.getByText('Is the information up to date?')).toBeVisible()
    await expect(page.getByText('Can I get a refund?')).toBeVisible()
  })

  test('should handle form submission', async ({ page }) => {
    await page.goto('/contact')
    
    // Fill out form
    await page.getByLabel('Name *').fill('Test User')
    await page.getByLabel('Email *').fill('test@example.com')
    await page.getByLabel('Message *').fill('This is a test message for contact form testing.')
    
    // Submit form
    await page.getByRole('button', { name: 'Send Message' }).click()
    
    // Should show success message
    await expect(page.getByText('Message Sent!')).toBeVisible()
    await expect(page.getByText('Thank you for contacting us')).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact')
    
    // Try to submit empty form
    await page.getByRole('button', { name: 'Send Message' }).click()
    
    // Should show validation errors (browser native validation)
    await expect(page.getByLabel('Name *')).toHaveAttribute('required')
    await expect(page.getByLabel('Email *')).toHaveAttribute('required')
    await expect(page.getByLabel('Message *')).toHaveAttribute('required')
  })

  test('should be accessible', async ({ page }) => {
    await page.goto('/contact')
    
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    await expect(headings.first()).toHaveText(/Get in Touch/)
    
    // Check for proper focus management
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
    
    // Check form labels
    await expect(page.getByLabel('Name *')).toBeVisible()
    await expect(page.getByLabel('Email *')).toBeVisible()
    await expect(page.getByLabel('Message *')).toBeVisible()
  })
})
