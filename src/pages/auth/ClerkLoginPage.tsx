import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function ClerkLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
          <p className="text-neutral-600">Continue your mental wellness journey</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg border border-neutral-100 p-8">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary-600 hover:bg-primary-700 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border-2 border-neutral-200 hover:border-neutral-300',
                formFieldInput: 'border-neutral-200 focus:border-primary-500',
                footerActionLink: 'text-primary-600 hover:text-primary-700'
              }
            }}
            redirectUrl="/dashboard"
            signUpUrl="/register"
          />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}