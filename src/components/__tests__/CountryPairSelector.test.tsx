import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CountryPairSelector } from '../CountryPairSelector'

// Mock Next.js router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('CountryPairSelector', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders the component with title and description', () => {
    render(<CountryPairSelector />)
    
    expect(screen.getByText('Select Two Countries')).toBeInTheDocument()
    expect(screen.getByText('Choose the countries for your international marriage kit')).toBeInTheDocument()
  })

  it('renders two country input fields', () => {
    render(<CountryPairSelector />)
    
    expect(screen.getByLabelText('First Country')).toBeInTheDocument()
    expect(screen.getByLabelText('Second Country')).toBeInTheDocument()
  })

  it('shows country suggestions when typing in first country field', async () => {
    render(<CountryPairSelector />)
    
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument()
    })
  })

  it('shows country suggestions when typing in second country field', async () => {
    render(<CountryPairSelector />)
    
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'United States' } })
    
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument()
    })
  })

  it('prevents selecting the same country twice', async () => {
    render(<CountryPairSelector />)
    
    // Select France in first field
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      const franceOption = screen.getByText('France')
      fireEvent.click(franceOption)
    })
    
    // Try to select France in second field
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      expect(screen.queryByText('France')).not.toBeInTheDocument()
    })
  })

  it('shows selected countries display when countries are selected', async () => {
    render(<CountryPairSelector />)
    
    // Select first country
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      const franceOption = screen.getByText('France')
      fireEvent.click(franceOption)
    })
    
    // Select second country
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'United States' } })
    
    await waitFor(() => {
      const usOption = screen.getByText('United States')
      fireEvent.click(usOption)
    })
    
    expect(screen.getByText('Selected Countries:')).toBeInTheDocument()
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('United States')).toBeInTheDocument()
  })

  it('enables submit button when two different countries are selected', async () => {
    render(<CountryPairSelector />)
    
    const submitButton = screen.getByText('View Marriage Kit')
    expect(submitButton).toBeDisabled()
    
    // Select first country
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      const franceOption = screen.getByText('France')
      fireEvent.click(franceOption)
    })
    
    // Select second country
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'United States' } })
    
    await waitFor(() => {
      const usOption = screen.getByText('United States')
      fireEvent.click(usOption)
    })
    
    expect(submitButton).toBeEnabled()
  })

  it('navigates to correct URL when submit button is clicked', async () => {
    render(<CountryPairSelector />)
    
    // Select France and United States
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      const franceOption = screen.getByText('France')
      fireEvent.click(franceOption)
    })
    
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'United States' } })
    
    await waitFor(() => {
      const usOption = screen.getByText('United States')
      fireEvent.click(usOption)
    })
    
    const submitButton = screen.getByText('View Marriage Kit')
    fireEvent.click(submitButton)
    
    expect(mockPush).toHaveBeenCalledWith('/kits/marriage-kit/FR-US')
  })

  it('shows error message when same country is selected twice', async () => {
    render(<CountryPairSelector />)
    
    // Select France in first field
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      const franceOption = screen.getByText('France')
      fireEvent.click(franceOption)
    })
    
    // Try to select France in second field
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      const franceOption = screen.getByText('France')
      fireEvent.click(franceOption)
    })
    
    expect(screen.getByText('Please select two different countries')).toBeInTheDocument()
  })

  it('filters countries based on search input', async () => {
    render(<CountryPairSelector />)
    
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'Ger' } })
    
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument()
      expect(screen.queryByText('France')).not.toBeInTheDocument()
    })
  })

  it('handles empty search input', async () => {
    render(<CountryPairSelector />)
    
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: '' } })
    
    // Should show all countries when search is empty
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument()
      expect(screen.getByText('Germany')).toBeInTheDocument()
      expect(screen.getByText('United States')).toBeInTheDocument()
    })
  })
})
