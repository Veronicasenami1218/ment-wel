import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // If not authenticated, redirect to login with return URL
  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If authenticated, render the protected component
  return <>{children}</>
}

export default ProtectedRoute