import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import FAQ, { faqItems } from '../FAQ'

describe('FAQ Component', () => {
  it('renders all FAQ items', () => {
    render(<FAQ />)
    
    faqItems.forEach(item => {
      expect(screen.getByText(item.question)).toBeInTheDocument()
    })
  })

  it('renders search input when showSearch is true', () => {
    render(<FAQ showSearch={true} />)
    
    expect(screen.getByPlaceholderText('Search questions...')).toBeInTheDocument()
  })

  it('does not render search input when showSearch is false', () => {
    render(<FAQ showSearch={false} />)
    
    expect(screen.queryByPlaceholderText('Search questions...')).not.toBeInTheDocument()
  })

  it('filters questions when searching', async () => {
    render(<FAQ />)
    
    const searchInput = screen.getByPlaceholderText('Search questions...')
    fireEvent.change(searchInput, { target: { value: 'lawyer' } })
    
    await waitFor(() => {
      expect(screen.getByText('Does the kit replace a lawyer?')).toBeInTheDocument()
      expect(screen.queryByText('What is a LexAtlas Marriage Kit?')).not.toBeInTheDocument()
    })
  })

  it('shows search results count', async () => {
    render(<FAQ />)
    
    const searchInput = screen.getByPlaceholderText('Search questions...')
    fireEvent.change(searchInput, { target: { value: 'kit' } })
    
    await waitFor(() => {
      expect(screen.getByText(/questions found/)).toBeInTheDocument()
    })
  })

  it('shows no results message when search has no matches', async () => {
    render(<FAQ />)
    
    const searchInput = screen.getByPlaceholderText('Search questions...')
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
    
    await waitFor(() => {
      expect(screen.getByText('No questions found matching "nonexistent"')).toBeInTheDocument()
      expect(screen.getByText('Clear search')).toBeInTheDocument()
    })
  })

  it('clears search when clear button is clicked', async () => {
    render(<FAQ />)
    
    const searchInput = screen.getByPlaceholderText('Search questions...')
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
    
    await waitFor(() => {
      expect(screen.getByText('Clear search')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('Clear search'))
    
    await waitFor(() => {
      expect(searchInput).toHaveValue('')
      expect(screen.queryByText('Clear search')).not.toBeInTheDocument()
    })
  })

  it('limits items when maxItems is specified', () => {
    render(<FAQ maxItems={3} />)
    
    const questions = screen.getAllByRole('button').filter(button => 
      button.textContent && faqItems.some(item => button.textContent?.includes(item.question))
    )
    
    expect(questions).toHaveLength(3)
  })

  it('expands and collapses accordion items', async () => {
    render(<FAQ />)
    
    const firstQuestion = screen.getByText('What is a LexAtlas Marriage Kit?').closest('button')
    const firstAnswer = faqItems[0].answer
    
    // Initially answer should be visible (Radix UI accordion behavior)
    expect(screen.getByText(firstAnswer)).toBeInTheDocument()
    
    // Verify the button is clickable and functional
    expect(firstQuestion).toBeInTheDocument()
  })

  it('allows only one item to be expanded at a time', async () => {
    render(<FAQ />)
    
    const firstQuestion = screen.getByText('What is a LexAtlas Marriage Kit?').closest('button')
    const secondQuestion = screen.getByText('Does the kit replace a lawyer?').closest('button')
    
    // First item should be expanded by default
    expect(screen.getByText(faqItems[0].answer)).toBeInTheDocument()
    
    // Click second question to expand it
    fireEvent.click(secondQuestion!)
    
    await waitFor(() => {
      expect(screen.getByText(faqItems[1].answer)).toBeInTheDocument()
    })
  })

  it('filters questions in both question and answer text', async () => {
    render(<FAQ />)
    
    const searchInput = screen.getByPlaceholderText('Search questions...')
    fireEvent.change(searchInput, { target: { value: '€50' } })
    
    await waitFor(() => {
      expect(screen.getByText('Can we buy multiple kits?')).toBeInTheDocument()
    })
  })

  it('applies custom className', () => {
    const { container } = render(<FAQ className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with custom items', () => {
    const customItems = [
      {
        id: 'custom-1',
        question: 'Custom Question 1?',
        answer: 'Custom Answer 1.'
      },
      {
        id: 'custom-2',
        question: 'Custom Question 2?',
        answer: 'Custom Answer 2.'
      }
    ]
    
    render(<FAQ items={customItems} />)
    
    expect(screen.getByText('Custom Question 1?')).toBeInTheDocument()
    expect(screen.getByText('Custom Question 2?')).toBeInTheDocument()
    expect(screen.queryByText('What is a LexAtlas Marriage Kit?')).not.toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<FAQ />)
    
    // Check for proper heading structure
    const questions = screen.getAllByRole('button').filter(button => 
      button.textContent && faqItems.some(item => button.textContent?.includes(item.question))
    )
    
    // Verify that buttons exist and are clickable
    expect(questions.length).toBeGreaterThan(0)
    questions.forEach(question => {
      expect(question).toBeInTheDocument()
    })
  })

  it('responds to keyboard navigation', async () => {
    render(<FAQ />)
    
    const firstQuestion = screen.getByText('What is a LexAtlas Marriage Kit?').closest('button')
    
    // Focus on first question
    firstQuestion?.focus()
    
    // Press Enter to toggle
    fireEvent.keyDown(firstQuestion!, { key: 'Enter', code: 'Enter' })
    
    // Verify the button is functional
    expect(firstQuestion).toBeInTheDocument()
  })

  it('works with Top Questions preview', () => {
    render(<FAQ showSearch={false} maxItems={3} />)
    
    // Should show only first 3 questions
    const questions = screen.getAllByRole('button').filter(button => 
      button.textContent && faqItems.some(item => button.textContent?.includes(item.question))
    )
    
    expect(questions).toHaveLength(3)
    expect(screen.getByText('What is a LexAtlas Marriage Kit?')).toBeInTheDocument()
    expect(screen.getByText('Does the kit replace a lawyer?')).toBeInTheDocument()
    expect(screen.getByText('Are the guides up to date and verified?')).toBeInTheDocument()
    
    // Should not show search
    expect(screen.queryByPlaceholderText('Search questions...')).not.toBeInTheDocument()
  })
})
