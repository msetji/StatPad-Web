'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Button from '@/components/ui/button';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const error = searchParams.get('error');
    const details = searchParams.get('details');
    
    if (error) {
      let message = '';
      switch (error) {
        case 'exchange_failed':
          message = `Authentication failed: ${details || 'Code exchange error'}`;
          break;
        case 'no_session':
          message = 'Authentication successful but no session created';
          break;
        case 'no_code':
          message = 'No authorization code received';
          break;
        case 'auth_failed':
          message = 'Authentication failed';
          break;
        default:
          message = `Authentication error: ${error}`;
      }
      setErrorMessage(message);
    }
  }, [searchParams]);

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      setErrorMessage('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to StatPad
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your basketball stats and highlights
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          )}

          <Button 
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Loading...' : 'Continue with Google'}
          </Button>
        </div>
      </div>
    </div>
  );
}