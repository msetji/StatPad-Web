'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const error = searchParams.get('error');
    const details = searchParams.get('details');
    
    if (error) {
      console.log('Auth error from URL:', error, details);
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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error('Google auth error:', error);
        alert(error.message);
      }
    } catch (err) {
      console.error('Auth error:', err);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isSignUp ? 'Create Account' : 'Sign in to StatPad'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your basketball stats and highlights
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleEmailAuth}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errorMessage}
            </div>
          )}

          <div className="space-y-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Button>

            <Button 
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              className="w-full"
            >
              Continue with Google
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}