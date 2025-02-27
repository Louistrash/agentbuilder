
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get redirect location and data if available
  const redirectTo = searchParams.get('redirectTo') || '/agents';
  const agentData = searchParams.get('agentData') ? JSON.parse(decodeURIComponent(searchParams.get('agentData') || '{}')) : null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Success!",
          description: "Check your email to confirm your account",
        });
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You've successfully signed in",
        });

        // Redirect with agent data if available
        if (agentData) {
          // Here you would save the agent data
          console.log("Redirecting with agent data:", agentData);
          // Simulate a delay to show the toast
          setTimeout(() => {
            navigate(redirectTo);
          }, 1000);
        } else {
          setTimeout(() => {
            navigate(redirectTo);
          }, 1000);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect=${redirectTo}${agentData ? `&agentData=${encodeURIComponent(JSON.stringify(agentData))}` : ''}`,
        },
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast({
        title: "Error",
        description: error.message || "Google authentication failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#1A1F2C] rounded-xl flex items-center justify-center">
              <img
                src="https://mkjrtfoxnysmjdtikwqo.supabase.co/storage/v1/object/public/logos/logo.png"
                alt="Chat Agent Builder Logo"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="text-[#1EAEDB] font-bold text-2xl">L</div>';
                }}
              />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Chat Agent Builder
              </h1>
              <p className="text-sm text-blue-200">
                Build. Deploy. Engage.
              </p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-blue-200">Sign in to access your chat agents</p>
        </div>

        <div className="bg-blue-900/30 backdrop-blur-sm p-8 rounded-xl border border-blue-700/50 shadow-xl">
          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className="w-full mb-6 bg-white text-gray-800 hover:bg-gray-100 font-medium"
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-700/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-blue-900/60 text-blue-200">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-blue-100">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-blue-950/50 border-blue-700/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-blue-100">
                  Password
                </Label>
                {!isSignUp && (
                  <button
                    type="button"
                    className="text-xs text-blue-300 hover:text-blue-200"
                    onClick={() => toast({
                      title: "Password Reset",
                      description: "Password reset feature is coming soon."
                    })}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-blue-950/50 border-blue-700/50 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-blue-900 hover:bg-gray-100 mt-2 font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-blue-200">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                className="text-white hover:text-blue-100 font-medium"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
