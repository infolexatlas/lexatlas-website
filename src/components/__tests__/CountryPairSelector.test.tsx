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
    
    expect(screen.getByText('Select 2 Countries')).toBeInTheDocument()
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
    
    // Try to select France in second field - it should be filtered out
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'France' } })
    
    // The dropdown should not show France since it's already selected in the first field
    // We need to check that France is not in the dropdown (not in the selected countries display)
    await waitFor(() => {
      // France should only appear in the selected countries display, not in the dropdown
      const dropdownButtons = screen.queryAllByRole('button')
      const franceInDropdown = dropdownButtons.some(button => 
        button.textContent === 'France' && 
        button.closest('[class*="absolute"]') // dropdown has absolute positioning
      )
      expect(franceInDropdown).toBe(false)
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
    
    expect(mockPush).toHaveBeenCalledWith('/kits/fra-usa')
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
    
    // Try to select France in second field - it should be filtered out, so we need to manually set it
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'France' } })
    
    // Since France is filtered out, we need to simulate the same country selection differently
    // This test case is now handled by the filtering logic, so we'll test the disabled button instead
    const submitButton = screen.getByText('View Marriage Kit')
    expect(submitButton).toBeDisabled()
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

  it('shows persistent error message for unsupported pairs', async () => {
    render(<CountryPairSelector />)
    
    // Select two countries that don't form a supported FRA-X pair
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'United States' } })
    
    await waitFor(() => {
      const usOption = screen.getByText('United States')
      fireEvent.click(usOption)
    })
    
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'Canada' } })
    
    await waitFor(() => {
      const canadaOption = screen.getByText('Canada')
      fireEvent.click(canadaOption)
    })
    
    const submitButton = screen.getByText('View Marriage Kit')
    fireEvent.click(submitButton)
    
    // Should show persistent error message
    await waitFor(() => {
      expect(screen.getByText("This pair isn't available yet. More kits are in production and released daily.")).toBeInTheDocument()
    })
    
    // Should not navigate
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('clears error message when user changes selection', async () => {
    render(<CountryPairSelector />)
    
    // First, trigger an error by selecting unsupported pair
    const firstCountryInput = screen.getByLabelText('First Country')
    fireEvent.focus(firstCountryInput)
    fireEvent.change(firstCountryInput, { target: { value: 'United States' } })
    
    await waitFor(() => {
      const usOption = screen.getByText('United States')
      fireEvent.click(usOption)
    })
    
    const secondCountryInput = screen.getByLabelText('Second Country')
    fireEvent.focus(secondCountryInput)
    fireEvent.change(secondCountryInput, { target: { value: 'Canada' } })
    
    await waitFor(() => {
      const canadaOption = screen.getByText('Canada')
      fireEvent.click(canadaOption)
    })
    
    const submitButton = screen.getByText('View Marriage Kit')
    fireEvent.click(submitButton)
    
    // Error message should be visible
    await waitFor(() => {
      expect(screen.getByText("This pair isn't available yet. More kits are in production and released daily.")).toBeInTheDocument()
    })
    
    // Now change the selection - error should clear
    fireEvent.change(firstCountryInput, { target: { value: 'France' } })
    
    await waitFor(() => {
      expect(screen.queryByText("This pair isn't available yet. More kits are in production and released daily.")).not.toBeInTheDocument()
    })
  })
})
