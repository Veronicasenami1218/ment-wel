import { useEffect, useSyncExternalStore } from 'react'
import authService, { type User, type RegisterData } from '../services/auth.service'

/**
 * Tiny shared store for auth state. Backed by localStorage so it survives reloads
 * AND stays in sync across tabs and components without re-reading on every mount.
 */

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

const STORAGE_KEY = 'user'

const readUserFromStorage = (): User | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

let currentState: AuthState = {
  user: readUserFromStorage(),
  // Synchronous read of localStorage means we are NEVER initially loading
  // — there's no API call required to determine auth status.
  loading: false,
  error: null,
}

const listeners = new Set<() => void>()

const notify = () => {
  for (const l of listeners) l()
}

const setState = (partial: Partial<AuthState>) => {
  currentState = { ...currentState, ...partial }
  notify()
}

// Keep store in sync if localStorage changes in another tab
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      setState({ user: readUserFromStorage() })
    }
  })
}

const subscribe = (cb: () => void) => {
  listeners.add(cb)
  return () => listeners.delete(cb)
}
const getSnapshot = () => currentState

export const useAuth = () => {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  // Re-hydrate from storage exactly once per mount in case another window logged
  // in/out between renders. This is cheap (synchronous JSON.parse).
  useEffect(() => {
    const fresh = readUserFromStorage()
    if (fresh !== state.user) {
      setState({ user: fresh })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email: string, password: string) => {
    setState({ loading: true, error: null })
    try {
      const user = await authService.login({ email, password })
      setState({ user, loading: false, error: null })
      return user
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setState({ user: null, loading: false, error: errorMessage })
      throw error
    }
  }

  const register = async (registerData: RegisterData) => {
    setState({ loading: true, error: null })
    try {
      const user = await authService.register(registerData)
      setState({ user, loading: false, error: null })
      return user
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      setState({ user: null, loading: false, error: errorMessage })
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (e) {
      // intentional — still clear local state
      // eslint-disable-next-line no-console
      console.warn('Logout error:', e)
    } finally {
      setState({ user: null, loading: false, error: null })
    }
  }

  /**
   * Patch the in-memory + persisted user (e.g. after editing profile fields or
   * uploading a new profile picture). All `useAuth()` consumers re-render
   * automatically via useSyncExternalStore.
   */
  const updateUser = (patch: Partial<User>) => {
    const base = currentState.user ?? readUserFromStorage()
    if (!base) return
    const next: User = { ...base, ...patch }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage full / disabled — keep going so UI still updates */
    }
    setState({ user: next })
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!state.user,
  }
}
