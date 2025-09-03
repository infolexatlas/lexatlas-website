import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Header } from '../layout/header'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} data-testid="next-image" />
  }
}))

describe('Header', () => {
  it('should render logo with correct src and size', () => {
    render(<Header />)
    
    const logoImage = screen.getByTestId('next-image')
    expect(logoImage).toHaveAttribute('src', '/logo/lexatlas.svg')
    expect(logoImage).toHaveAttribute('alt', 'LexAtlas')
    expect(logoImage).toHaveAttribute('width', '40')
    expect(logoImage).toHaveAttribute('height', '40')
  })
})
