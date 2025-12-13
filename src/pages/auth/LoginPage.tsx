import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Shield, CheckCircle, Clock } from 'lucide-react';
import { useSignIn } from '@clerk/clerk-react';
import authService from '../../services/auth.service';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  // Get the intended destination from location state, default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleGoogleSignIn = async () => {
    if (!signIn) return;
    
    setIsGoogleLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: from
      });
    } catch (error: any) {
      toast.error('Google sign-in failed. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await authService.login({ email: data.email, password: data.password });
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-100 p-8 max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
              <p className="text-neutral-600">Sign in to continue your mental wellness journey</p>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full mb-6 py-3 px-4 border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">⚠ {errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', { required: 'Password is required' })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">⚠ {errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('remember')}
                    className="w-4 h-4 text-sky-500 border-neutral-300 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm text-neutral-700">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-sky-500 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-neutral-600 mt-8">
              Don't have an account?{' '}
              <Link to="/register" className="text-sky-500 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Illustration */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-sky-100 to-fuchsia-100 rounded-xl p-12 text-center">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Your Mental Health Matters</h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Connect with licensed therapists and start your journey to mental wellness today.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Shield className="w-6 h-6" />, text: '100% Confidential' },
                  { icon: <CheckCircle className="w-6 h-6" />, text: 'Licensed Therapists' },
                  { icon: <Clock className="w-6 h-6" />, text: '24/7 Support' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30"
                  >
                    <div className="text-sky-500">{item.icon}</div>
                    <span className="font-medium text-neutral-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
