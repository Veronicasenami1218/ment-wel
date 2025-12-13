import { useState, useEffect } from 'react'
import authService, { type User, type RegisterData } from '../services/auth.service'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser()
        setAuthState({
          user,
          loading: false,
          error: null
        })
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Authentication failed'
        })
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const user = await authService.login({ email, password })
      setAuthState({
        user,
        loading: false,
        error: null
      })
      return user
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setAuthState({
        user: null,
        loading: false,
        error: errorMessage
      })
      throw error
    }
  }

  const register = async (registerData: RegisterData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const user = await authService.register(registerData)
      setAuthState({
        user,
        loading: false,
        error: null
      })
      return user
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      setAuthState({
        user: null,
        loading: false,
        error: errorMessage
      })
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setAuthState({
        user: null,
        loading: false,
        error: null
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    register,
    logout,
    isAuthenticated: !!authState.user
  }
}