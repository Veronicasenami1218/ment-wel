import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, User, LogOut, Settings, Calendar, BarChart3 } from 'lucide-react'
import { useAuth as useClerkAuth, UserButton, SignInButton } from '@clerk/clerk-react'
import { useAuth as useCredentialAuth } from '../hooks/useAuth'
import { cn } from '../lib/utils'

interface HeaderProps {
  isScrolled: boolean
}

export default function Header({ isScrolled }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn } = useClerkAuth()
  const { user: credentialUser, logout: credentialLogout, isAuthenticated: isCredentialAuth } = useCredentialAuth()

  // Determine which authentication method is active
  const isAuthenticated = isSignedIn || isCredentialAuth
  const isUsingCredentials = !isSignedIn && isCredentialAuth

  const userMenuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Book Session', href: '/sessions', icon: Calendar },
    { name: 'Mood Tracking', href: '/mood', icon: Heart },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  // Helper function to get user initials
  const getUserInitials = (user: any) => {
    if (!user) return 'U'
    const firstName = user.first_name || user.firstName || ''
    const lastName = user.last_name || user.lastName || ''
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
    if (firstName) {
      return firstName.substring(0, 2).toUpperCase()
    }
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  const getUserDisplayName = (user: any) => {
    if (!user) return 'User'
    const firstName = user.first_name || user.firstName || ''
    const lastName = user.last_name || user.lastName || ''
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }
    if (firstName) {
      return firstName
    }
    return user.email?.split('@')[0] || 'User'
  }
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'Therapists', href: '/therapists' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]



  const isActive = (path: string) => location.pathname === path

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-neutral-200'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold gradient-text">MentWel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  isActive(item.href)
                    ? 'text-primary-600'
                    : 'text-neutral-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isSignedIn ? (
                  // Clerk OAuth User
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8',
                        userButtonPopoverCard: 'shadow-lg border border-neutral-200',
                        userButtonPopoverActionButton: 'hover:bg-neutral-50'
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                ) : (
                  // Credential-based User
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {getUserInitials(credentialUser)}
                        </span>
                      </div>
                      <span>{getUserDisplayName(credentialUser)}</span>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-large border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                        <hr className="my-2 border-neutral-200" />
                        <button
                          onClick={credentialLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-error-600 transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-neutral-200 shadow-soft"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                {isSignedIn ? (
                  <div className="flex justify-center">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: 'w-10 h-10',
                          userButtonPopoverCard: 'shadow-lg border border-neutral-200'
                        }
                      }}
                      afterSignOutUrl="/"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <SignInButton mode="modal">
                      <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-center px-4 py-2 text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center btn-primary"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
