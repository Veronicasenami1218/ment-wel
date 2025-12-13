import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Users, Shield, CheckCircle } from 'lucide-react';
import { useSignUp } from '@clerk/clerk-react';
import { useAuth } from '../../hooks/useAuth';
import { RegisterData } from '../../services/auth.service';

interface FormData extends RegisterData {
  terms: boolean;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useSignUp();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '' });
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  // Get the intended destination from location state, default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const password = watch('password');

  const handleGoogleSignUp = async () => {
    if (!signUp) return;
    
    setIsGoogleLoading(true);
    try {
      await signUp.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: from
      });
    } catch (error: any) {
      toast.error('Google sign-up failed. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, text: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z\d]/.test(pwd)) score++;

    const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    return { score, text: levels[score] };
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordStrength(calculatePasswordStrength(e.target.value));
  };

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const { terms, ...registerData } = data;
      
      // Transform the data to match backend API
      const backendData: RegisterData = {
        ...registerData,
        acceptTerms: terms
      };

      await registerUser(backendData);
      toast.success('Account created successfully! Welcome to MentWel!');
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Register Form */}
          <div className="bg-white rounded-xl shadow-md border border-neutral-100 p-8 max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create Your Account</h1>
              <p className="text-neutral-600">Start your journey to mental wellness today</p>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading}
              className="w-full mb-6 py-3 px-4 border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isGoogleLoading ? 'Signing up...' : 'Continue with Google'}
            </button>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-neutral-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                    placeholder="First name"
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">⚠ {errors.firstName.message}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">⚠ {errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">⚠ {errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  {...register('phoneNumber')}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>



              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    {...register('dateOfBirth', { required: 'Date of birth is required' })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-xs text-red-500">⚠ {errors.dateOfBirth.message}</p>}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-neutral-700 mb-2">
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register('gender', { required: 'Please select your gender' })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-xs text-red-500">⚠ {errors.gender.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  {...register('country', { required: 'Country is required' })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                >
                  <option value="">Select country</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Other">Other</option>
                </select>
                {errors.country && <p className="mt-1 text-sm text-red-500">⚠ {errors.country.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
                    onChange={onPasswordChange}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          passwordStrength.score === 1
                            ? 'w-1/4 bg-red-500'
                            : passwordStrength.score === 2
                            ? 'w-1/2 bg-yellow-500'
                            : passwordStrength.score === 3
                            ? 'w-3/4 bg-green-400'
                            : passwordStrength.score === 4
                            ? 'w-full bg-green-500'
                            : 'w-0'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">{passwordStrength.text}</p>
                  </div>
                )}
                {errors.password && <p className="mt-1 text-sm text-red-500">⚠ {errors.password.message}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', { required: 'Please confirm your password' })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">⚠ {errors.confirmPassword.message}</p>}
              </div>

              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('terms', { required: 'You must accept the terms' })}
                    className="mt-1 w-4 h-4 text-sky-500 border-neutral-300 rounded focus:ring-sky-500"
                  />
                  <span className="text-sm text-neutral-700">
                    I agree to the{' '}
                    <Link to="/terms" target="_blank" className="text-sky-500 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" target="_blank" className="text-sky-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-sm text-red-500">⚠ {errors.terms.message}</p>}
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
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-neutral-600 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-sky-500 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Illustration */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-sky-100 to-fuchsia-100 rounded-xl p-12 text-center">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">Join Thousands of People</h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Start your mental wellness journey with our community of supportive therapists and fellow travelers.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Users className="w-6 h-6" />, text: 'Expert Therapists' },
                  { icon: <Shield className="w-6 h-6" />, text: 'Secure & Private' },
                  { icon: <CheckCircle className="w-6 h-6" />, text: 'Proven Results' },
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
