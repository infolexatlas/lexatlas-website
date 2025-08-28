import { render, screen } from '@testing-library/react'
import { Guarantee } from '../Guarantee'

describe('Guarantee', () => {
  it('renders guarantee section', () => {
    render(<Guarantee />)
    
    expect(screen.getByText('Our Commitment to You')).toBeInTheDocument()
    expect(screen.getByText('Clarity-first, expert-built')).toBeInTheDocument()
  })

  it('displays all three guarantee features', () => {
    render(<Guarantee />)
    
    expect(screen.getByText('Expert Quality')).toBeInTheDocument()
    expect(screen.getByText('7-Day Support')).toBeInTheDocument()
    expect(screen.getByText('Clear Communication')).toBeInTheDocument()
  })

  it('shows legal disclaimer', () => {
    render(<Guarantee />)
    
    expect(screen.getByText(/Important:/)).toBeInTheDocument()
    expect(screen.getByText(/LexAtlas is not a law firm/)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Guarantee />)
    
    const section = screen.getByRole('region', { hidden: true })
    expect(section).toBeInTheDocument()
  })
})
