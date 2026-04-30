import { Navigate, useLocation } from 'react-router-dom'
import { useAuth as useClerkAuth } from '@clerk/clerk-react'
import { useAuth as useCredentialAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useClerkAuth()
  const { isAuthenticated: isCredentialAuth, loading: credentialLoading } = useCredentialAuth()
  const location = useLocation()

  // Wait for both auth systems to finish loading
  if (!isLoaded || credentialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  // Allow access if signed in via Clerk OR via credential login
  const isAuthenticated = isSignedIn || isCredentialAuth

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
