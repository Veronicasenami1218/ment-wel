// Hoisted mocks MUST be declared before importing the modules under test.
// Mock heavy/optional sections used by LandingPage to avoid missing file errors
vi.mock('@/components/sections/HeroSection', () => ({
  default: () => <div data-testid="hero-section" />,
}))
vi.mock('@/components/sections/FeaturesSection', () => ({
  default: () => <div data-testid="features-section" />,
}))
vi.mock('@/components/sections/StatsSection', () => ({
  default: () => <div data-testid="stats-section" />,
}))
vi.mock('@/components/sections/TestimonialsSection', () => ({
  default: () => <div data-testid="testimonials-section" />,
}))
vi.mock('@/components/sections/CTASection', () => ({
  default: () => <div data-testid="cta-section" />,
}))
// Simplify framer-motion to plain elements in tests
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: () => (props: any) => <div {...props} />,
    }
  ),
}))
// Mock lucide-react icons as simple spans
vi.mock('lucide-react', () => new Proxy({}, { get: () => () => <span /> }))

// Mock react-helmet-async to simple passthrough components
vi.mock('react-helmet-async', () => ({
  HelmetProvider: ({ children }: any) => <>{children}</>,
  Helmet: ({ children }: any) => <>{children}</>,
}))

// Partially mock react-router-dom to simplify Link only, keep others actual
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  }
})

import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import LandingPage from '@/pages/LandingPage'

describe('LandingPage smoke test', () => {
  it('renders the hero section', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </HelmetProvider>
    )

    // Assert that a primary section renders (mocked HeroSection)
    expect(await screen.findByTestId('hero-section')).toBeInTheDocument()
  })
})

// Simple sanity test to ensure the test runner is wired
describe('sanity', () => {
  it('adds numbers', () => {
    expect(1 + 1).toBe(2)
  })
})
