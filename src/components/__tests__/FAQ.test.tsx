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
    
    const firstQuestion = screen.getByText('What is a LexAtlas Marriage Kit?')
    const firstAnswer = faqItems[0].answer
    
    // Initially answer should not be visible
    expect(screen.queryByText(firstAnswer)).not.toBeInTheDocument()
    
    // Click to expand
    fireEvent.click(firstQuestion)
    
    await waitFor(() => {
      expect(screen.getByText(firstAnswer)).toBeInTheDocument()
    })
    
    // Click to collapse
    fireEvent.click(firstQuestion)
    
    await waitFor(() => {
      expect(screen.queryByText(firstAnswer)).not.toBeInTheDocument()
    })
  })

  it('allows only one item to be expanded at a time', async () => {
    render(<FAQ />)
    
    const firstQuestion = screen.getByText('What is a LexAtlas Marriage Kit?')
    const secondQuestion = screen.getByText('Does the kit replace a lawyer?')
    
    // Expand first item
    fireEvent.click(firstQuestion)
    
    await waitFor(() => {
      expect(screen.getByText(faqItems[0].answer)).toBeInTheDocument()
    })
    
    // Expand second item
    fireEvent.click(secondQuestion)
    
    await waitFor(() => {
      expect(screen.getByText(faqItems[1].answer)).toBeInTheDocument()
      expect(screen.queryByText(faqItems[0].answer)).not.toBeInTheDocument()
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
    
    questions.forEach(question => {
      expect(question).toHaveAttribute('aria-expanded')
    })
  })
})
