import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Mail, CheckCircle, X, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react'

export default function EmailVerificationPage() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (token) {
      verifyEmail()
    }
  }, [token])

  const verifyEmail = async () => {
    setIsVerifying(true)
    setError(null)
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, we'll simulate success
      // In real implementation, this would be:
      // await authService.verifyEmail(token)
      
      setIsVerified(true)
      toast.success('Email verified successfully!')
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
      
    } catch (error: any) {
      setError(error.message || 'Verification failed. The link may have expired.')
      toast.error('Email verification failed')
    } finally {
      setIsVerifying(false)
    }
  }

  const resendVerification = async () => {
    setIsResending(true)
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In real implementation:
      // await authService.resendVerificationEmail()
      
      toast.success('Verification email sent! Please check your inbox.')
      
    } catch (error: any) {
      toast.error('Failed to resend verification email')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 pt-16 pb-12">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-8"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          {isVerifying ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-sky-600 animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Verifying your email...</h2>
              <p className="text-neutral-500">Please wait while we confirm your email address.</p>
            </div>
          ) : isVerified ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Email Verified!</h2>
              <p className="text-neutral-500 mb-6">Your email has been successfully verified.</p>
              <p className="text-sm text-neutral-400">Redirecting to dashboard...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Verification Failed</h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={resendVerification}
                  disabled={isResending}
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Resend Verification Email
                    </>
                  )}
                </button>
                <Link
                  to="/login"
                  className="w-full py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium hover:bg-neutral-50 transition-all text-center block"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          ) : !token ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">Invalid Verification Link</h2>
              <p className="text-neutral-500 mb-6">The verification link is invalid or missing.</p>
              <div className="space-y-3">
                <button
                  onClick={resendVerification}
                  disabled={isResending}
                  className="w-full py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Request New Verification Email
                    </>
                  )}
                </button>
                <Link
                  to="/login"
                  className="w-full py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium hover:bg-neutral-50 transition-all text-center block"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          ) : null}

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <p className="text-xs text-neutral-400 text-center">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={resendVerification}
                disabled={isResending}
                className="text-sky-500 hover:underline font-medium disabled:opacity-60"
              >
                request a new one
              </button>
            </p>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-neutral-500 mb-4">
            Need help? Contact our support team
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm text-sky-500 hover:text-sky-600 font-medium"
          >
            Contact Support
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
