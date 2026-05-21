import { Navigate, useLocation } from 'react-router-dom'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { useAuth as useCredentialAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useClerkAuth()
  const { isAuthenticated: isCredentialAuth } = useCredentialAuth()
  const location = useLocation()

  // If we already have a credential-based session, allow access immediately
  // without waiting for Clerk to finish loading.
  if (isCredentialAuth) return <>{children}</>

  // Otherwise wait for Clerk to load before deciding.
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500" />
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
