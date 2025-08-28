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
    
    expect(screen.getByText('Sarah & Marco')).toBeInTheDocument()
    expect(screen.getByText('Emma & Pierre')).toBeInTheDocument()
    expect(screen.getByText('David & Ana')).toBeInTheDocument()
  })

  it('shows customer locations', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('Italy → Germany')).toBeInTheDocument()
    expect(screen.getByText('France → Canada')).toBeInTheDocument()
    expect(screen.getByText('Spain → Australia')).toBeInTheDocument()
  })

  it('displays rating summary', () => {
    render(<Testimonials />)
    
    expect(screen.getByText('4.9/5 from 200+ reviews')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Testimonials />)
    
    const section = screen.getByRole('region', { hidden: true })
    expect(section).toBeInTheDocument()
  })
})
