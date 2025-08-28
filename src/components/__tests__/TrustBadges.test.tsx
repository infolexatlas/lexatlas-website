import { render, screen } from '@testing-library/react'
import { TrustBadges } from '../TrustBadges'

describe('TrustBadges', () => {
  it('renders trust badges section', () => {
    render(<TrustBadges />)
    
    expect(screen.getByText('Trusted by International Couples')).toBeInTheDocument()
    expect(screen.getByText('Your security and privacy are our top priorities')).toBeInTheDocument()
  })

  it('displays all four trust badges', () => {
    render(<TrustBadges />)
    
    expect(screen.getByText('GDPR Compliant')).toBeInTheDocument()
    expect(screen.getByText('Secure Checkout')).toBeInTheDocument()
    expect(screen.getByText('Instant Download')).toBeInTheDocument()
    expect(screen.getByText('Expert Verified')).toBeInTheDocument()
  })

  it('shows Stripe security badge', () => {
    render(<TrustBadges />)
    
    expect(screen.getByText('Secure payments by Stripe')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<TrustBadges />)
    
    const section = screen.getByRole('region', { hidden: true })
    expect(section).toBeInTheDocument()
  })
})
