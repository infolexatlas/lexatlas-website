import { test, expect } from '@playwright/test'

test.describe('FAQ Feature', () => {
  test('should display FAQ page with all questions', async ({ page }) => {
    await page.goto('/faq')
    
    // Check page title
    await expect(page).toHaveTitle(/Frequently Asked Questions/)
    
    // Check hero section
    await expect(page.getByText('Frequently Asked Questions')).toBeVisible()
    await expect(page.getByText('Find clear answers to common questions')).toBeVisible()
    
    // Check search functionality
    await expect(page.getByPlaceholder('Search questions...')).toBeVisible()
    
    // Check that all FAQ items are present
    await expect(page.getByText('What is a LexAtlas Marriage Kit?')).toBeVisible()
    await expect(page.getByText('Does the kit replace a lawyer?')).toBeVisible()
    await expect(page.getByText('Are the guides up to date and verified?')).toBeVisible()
    await expect(page.getByText('How long does an international marriage usually take?')).toBeVisible()
    await expect(page.getByText('How much does the procedure cost?')).toBeVisible()
    await expect(page.getByText('Will our marriage be recognized in both countries?')).toBeVisible()
    await expect(page.getByText('Do we need to marry in our country of residence?')).toBeVisible()
    await expect(page.getByText('Do we need official translations?')).toBeVisible()
    await expect(page.getByText('How do we receive the kit?')).toBeVisible()
    await expect(page.getByText('Can we buy multiple kits?')).toBeVisible()
    await expect(page.getByText('What if we buy the wrong kit?')).toBeVisible()
    await expect(page.getByText('Who is behind LexAtlas?')).toBeVisible()
  })

  test('should expand and collapse FAQ items', async ({ page }) => {
    await page.goto('/faq')
    
    const firstQuestion = page.getByText('What is a LexAtlas Marriage Kit?')
    const firstAnswer = 'A complete legal guide that explains step by step'
    
    // Initially answer should not be visible
    await expect(page.getByText(firstAnswer)).not.toBeVisible()
    
    // Click to expand
    await firstQuestion.click()
    
    // Answer should now be visible
    await expect(page.getByText(firstAnswer)).toBeVisible()
    
    // Click to collapse
    await firstQuestion.click()
    
    // Answer should be hidden again
    await expect(page.getByText(firstAnswer)).not.toBeVisible()
  })

  test('should allow only one item to be expanded at a time', async ({ page }) => {
    await page.goto('/faq')
    
    const firstQuestion = page.getByText('What is a LexAtlas Marriage Kit?')
    const secondQuestion = page.getByText('Does the kit replace a lawyer?')
    const firstAnswer = 'A complete legal guide that explains step by step'
    const secondAnswer = 'No. It is not a substitute for personalized legal advice'
    
    // Expand first item
    await firstQuestion.click()
    await expect(page.getByText(firstAnswer)).toBeVisible()
    await expect(page.getByText(secondAnswer)).not.toBeVisible()
    
    // Expand second item
    await secondQuestion.click()
    await expect(page.getByText(firstAnswer)).not.toBeVisible()
    await expect(page.getByText(secondAnswer)).toBeVisible()
  })

  test('should filter questions when searching', async ({ page }) => {
    await page.goto('/faq')
    
    const searchInput = page.getByPlaceholder('Search questions...')
    
    // Search for "lawyer"
    await searchInput.fill('lawyer')
    
    // Should show only lawyer-related question
    await expect(page.getByText('Does the kit replace a lawyer?')).toBeVisible()
    await expect(page.getByText('What is a LexAtlas Marriage Kit?')).not.toBeVisible()
    
    // Should show search results count
    await expect(page.getByText(/questions found/)).toBeVisible()
  })

  test('should show no results message for non-matching search', async ({ page }) => {
    await page.goto('/faq')
    
    const searchInput = page.getByPlaceholder('Search questions...')
    
    // Search for non-existent term
    await searchInput.fill('nonexistent')
    
    // Should show no results message
    await expect(page.getByText('No questions found matching "nonexistent"')).toBeVisible()
    await expect(page.getByText('Clear search')).toBeVisible()
    
    // Clear search
    await page.getByText('Clear search').click()
    
    // Should show all questions again
    await expect(page.getByText('What is a LexAtlas Marriage Kit?')).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/faq')
    
    // Check contact CTA link
    await page.getByText('Contact Support').click()
    await expect(page).toHaveURL('/contact')
    
    // Go back to FAQ
    await page.goto('/faq')
    
    // Check browse kits link
    await page.getByText('Browse Marriage Kits').click()
    await expect(page).toHaveURL('/kits/marriage-kit')
  })

  test('should display FAQ preview on homepage', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to FAQ section
    await page.getByText('Top Questions').scrollIntoViewIfNeeded()
    
    // Check FAQ preview section
    await expect(page.getByText('Top Questions')).toBeVisible()
    await expect(page.getByText('Get quick answers to the most common questions')).toBeVisible()
    
    // Should show only first 3 questions
    await expect(page.getByText('What is a LexAtlas Marriage Kit?')).toBeVisible()
    await expect(page.getByText('Does the kit replace a lawyer?')).toBeVisible()
    await expect(page.getByText('Are the guides up to date and verified?')).toBeVisible()
    
    // Should not show search in preview
    await expect(page.getByPlaceholder('Search questions...')).not.toBeVisible()
    
    // Check "View All FAQs" link
    await page.getByText('View All FAQs').click()
    await expect(page).toHaveURL('/faq')
  })

  test('should have FAQ link in header navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check desktop navigation
    await expect(page.getByRole('navigation').getByText('FAQ')).toBeVisible()
    
    // Click FAQ link
    await page.getByRole('navigation').getByText('FAQ').click()
    await expect(page).toHaveURL('/faq')
  })

  test('should have FAQ link in mobile navigation', async ({ page }) => {
    await page.goto('/')
    
    // Open mobile menu
    await page.getByRole('button', { name: /open main menu/i }).click()
    
    // Check mobile navigation
    await expect(page.getByText('FAQ')).toBeVisible()
    
    // Click FAQ link
    await page.getByText('FAQ').click()
    await expect(page).toHaveURL('/faq')
  })

  test('should have FAQ link in footer', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to footer
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded()
    
    // Check footer navigation
    await expect(page.getByRole('contentinfo').getByText('FAQ')).toBeVisible()
    
    // Click FAQ link
    await page.getByRole('contentinfo').getByText('FAQ').click()
    await expect(page).toHaveURL('/faq')
  })

  test('should have proper SEO metadata', async ({ page }) => {
    await page.goto('/faq')
    
    // Check meta title
    await expect(page).toHaveTitle(/Frequently Asked Questions/)
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /Clear answers about cross-border marriage kits/)
    
    // Check Open Graph title
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /Frequently Asked Questions/)
    
    // Check Open Graph description
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /Clear answers about cross-border marriage kits/)
  })

  test('should be accessible with keyboard navigation', async ({ page }) => {
    await page.goto('/faq')
    
    // Focus on search input
    await page.keyboard.press('Tab')
    await expect(page.getByPlaceholder('Search questions...')).toBeFocused()
    
    // Navigate to first question
    await page.keyboard.press('Tab')
    await expect(page.getByText('What is a LexAtlas Marriage Kit?')).toBeFocused()
    
    // Expand with Enter key
    await page.keyboard.press('Enter')
    await expect(page.getByText('A complete legal guide that explains step by step')).toBeVisible()
    
    // Collapse with Space key
    await page.keyboard.press(' ')
    await expect(page.getByText('A complete legal guide that explains step by step')).not.toBeVisible()
  })
})
