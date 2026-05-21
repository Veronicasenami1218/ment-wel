import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import authService from '../../services/auth.service';

/**
 * SSO callback page. After Clerk completes the OAuth handshake (e.g. Google),
 * we sync the resulting user with the MentWel backend so they get a backend
 * JWT and can use the rest of the API.
 */
export default function SSOCallback() {
  const navigate = useNavigate();
  const { handleRedirectCallback } = useClerk();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Finalize the Clerk OAuth handshake (no-op if already complete)
        await handleRedirectCallback({}).catch(() => undefined);
      } catch (err) {
        // Clerk has already handled the error visually; we just continue.
        // eslint-disable-next-line no-console
        console.warn('Clerk handleRedirectCallback:', err);
      }
    };
    handleCallback();
  }, [handleRedirectCallback]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      // Clerk didn't end up with a session — send the user back to login.
      navigate('/login', { replace: true });
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      toast.error('Your Google account did not return an email address.');
      navigate('/login', { replace: true });
      return;
    }

    (async () => {
      try {
        await authService.syncClerkUser({
          clerkUserId: user.id,
          email,
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          profileImageUrl: user.imageUrl,
        });
        toast.success('Successfully signed in!');
        navigate('/dashboard', { replace: true });
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('Clerk -> backend sync failed:', err);
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            'Could not finish signing you in. Please try again.'
        );
        navigate('/login', { replace: true });
      }
    })();
  }, [isLoaded, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">Completing sign-in...</h2>
        <p className="text-neutral-600">Please wait while we set up your account.</p>
      </div>
    </div>
  );
}
