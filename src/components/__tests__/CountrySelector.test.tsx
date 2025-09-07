import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CountrySelector } from '../CountrySelector'
import { COUNTRIES } from '@/content/marriage/countries'

import { vi } from 'vitest'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('CountrySelector', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders with placeholder text', () => {
    render(<CountrySelector />)
    expect(screen.getByPlaceholderText('Select your country...')).toBeInTheDocument()
  })

  it('opens dropdown on focus', () => {
    render(<CountrySelector />)
    const input = screen.getByPlaceholderText('Select your country...')
    fireEvent.focus(input)
    
    expect(screen.getByText('United States')).toBeInTheDocument()
    expect(screen.getByText('France')).toBeInTheDocument()
  })

  it('filters countries by search term', () => {
    render(<CountrySelector />)
    const input = screen.getByPlaceholderText('Select your country...')
    
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'France' } })
    
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.queryByText('United States')).not.toBeInTheDocument()
  })

  it('filters countries by country code', () => {
    render(<CountrySelector />)
    const input = screen.getByPlaceholderText('Select your country...')
    
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'FR' } })
    
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.queryByText('United States')).not.toBeInTheDocument()
  })

  it('navigates to country page when country is selected', () => {
    render(<CountrySelector />)
    const input = screen.getByPlaceholderText('Select your country...')
    
    fireEvent.focus(input)
    fireEvent.click(screen.getByText('France'))
    
    expect(mockPush).toHaveBeenCalledWith('/kits/marriage-kit/FR')
  })

  it('calls onSelect callback when provided', () => {
    const mockOnSelect = vi.fn()
    render(<CountrySelector onSelect={mockOnSelect} />)
    const input = screen.getByPlaceholderText('Select your country...')
    
    fireEvent.focus(input)
    fireEvent.click(screen.getByText('France'))
    
    expect(mockOnSelect).toHaveBeenCalledWith(COUNTRIES.find(c => c.code === 'FR'))
  })

  it('closes dropdown when clicking outside', () => {
    render(<CountrySelector />)
    const input = screen.getByPlaceholderText('Select your country...')
    
    fireEvent.focus(input)
    expect(screen.getByText('United States')).toBeInTheDocument()
    
    fireEvent.mouseDown(document.body)
    
    expect(screen.queryByText('United States')).not.toBeInTheDocument()
  })

  it('handles keyboard navigation', () => {
    render(<CountrySelector />)
    const input = screen.getByPlaceholderText('Select your country...')
    
    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    
    // First item should be focused
    expect(screen.getByText('United States')).toHaveAttribute('aria-selected', 'true')
  })

  it('selects country on Enter key', () => {
    render(<CountrySelector />)
    const input = screen.getByPlaceholderText('Select your country...')
    
    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(mockPush).toHaveBeenCalledWith('/kits/marriage-kit/US')
  })

  it('closes dropdown on Escape key', () => {
    render(<CountrySelector />)
    const input = screen.getByPlaceholderText('Select your country...')
    
    fireEvent.focus(input)
    expect(screen.getByText('United States')).toBeInTheDocument()
    
    fireEvent.keyDown(input, { key: 'Escape' })
    
    expect(screen.queryByText('United States')).not.toBeInTheDocument()
  })
})
