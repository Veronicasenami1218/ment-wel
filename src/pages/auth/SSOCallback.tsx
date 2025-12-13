import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export default function SSOCallback() {
  const navigate = useNavigate();
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await handleRedirectCallback({});
        toast.success('Successfully signed in with Google!');
        navigate('/dashboard');
      } catch (error) {
        console.error('SSO callback error:', error);
        toast.error('Sign-in failed. Please try again.');
        navigate('/register');
      }
    };

    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">Completing sign-in...</h2>
        <p className="text-neutral-600">Please wait while we set up your account.</p>
      </div>
    </div>
  );
}