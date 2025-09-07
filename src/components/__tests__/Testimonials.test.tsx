import { render, screen } from '@testing-library/react'
import { Testimonials } from '../Testimonials'

describe('Testimonials', () => {
  it('renders testimonials section', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('What Our Customers Say')).toBeInTheDocument()
    expect(screen.getByText(/Join hundreds of international couples/)).toBeInTheDocument()
  })

  it('displays all three testimonials', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('Emily & Julien')).toBeInTheDocument()
    expect(screen.getByText('Sophie & James')).toBeInTheDocument()
    expect(screen.getByText('Marie & Thomas')).toBeInTheDocument()
  })

  it('shows customer locations for FRA-X kits', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('France–USA')).toBeInTheDocument()
    expect(screen.getByText('France–UK')).toBeInTheDocument()
    expect(screen.getByText('France–Canada')).toBeInTheDocument()
  })

  it('displays rating badge with correct text', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('Trusted by hundreds of couples • Rated 4.7/5')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Testimonials />)
    
    const section = screen.getByRole('region', { hidden: true })
    expect(section).toBeInTheDocument()
  })
})
