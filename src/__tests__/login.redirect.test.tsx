import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginPage from '@/pages/auth/LoginPage'

const mockNavigate = vi.fn()
const mockLogin = vi.fn()
const mockAuthLogin = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { from: { pathname: '/dashboard' } } }),
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  }
})

vi.mock('@clerk/clerk-react', () => ({
  useSignIn: () => ({ signIn: null }),
}))

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({ login: mockLogin }),
}))

vi.mock('../services/auth.service', () => ({
  __esModule: true,
  default: { login: mockAuthLogin },
}))

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockLogin.mockResolvedValue({ id: 'user-1' })
    mockAuthLogin.mockResolvedValue({ id: 'user-1' })
  })

  it('redirects authenticated users to the dashboard after a successful login', async () => {
    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123'))
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true }))
  })
})
