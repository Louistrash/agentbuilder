import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, LogIn } from 'lucide-react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirectTo') || '/';
  const agentData = searchParams.get('agentData') 
    ? JSON.parse(decodeURIComponent(searchParams.get('agentData') || '{}')) 
    : null;

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        handleRedirectWithData();
      }
    };
    
    checkSession();
  }, []);

  const handleRedirectWithData = () => {
    if (agentData) {
      navigate(`${redirectTo}?saveAgent=true&agentData=${encodeURIComponent(JSON.stringify(agentData))}`);
    } else {
      navigate(redirectTo);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      if (isSignUp) {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link.",
        });
      } else {
        handleRedirectWithData();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const redirectURL = new URL(`${window.location.origin}/`);
      if (agentData) {
        redirectURL.searchParams.set('saveAgent', 'true');
        redirectURL.searchParams.set('agentData', encodeURIComponent(JSON.stringify(agentData)));
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectURL.toString()
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setIsGoogleLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsResetting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      });
      setShowResetDialog(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-black text-white overflow-hidden relative">
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-2xl shadow-xl bg-[#1A1F2C] flex items-center justify-center overflow-hidden">
              {!imageError ? (
                <img
                  src="https://mkjrtfoxnysmjdtikwqo.supabase.co/storage/v1/object/public/logos/logo.png"
                  alt="Chat Agent Builder Logo"
                  className="w-full h-full object-contain p-1"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-[#1EAEDB] font-bold text-xl">L</div>
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-white">Chat Agent Builder</h1>
              <p className="text-sm text-gray-400">Build. Deploy. Engage.</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-gray-400">
              {isSignUp
                ? 'Join us to start building intelligent chat agents'
                : 'Sign in to access your chat agents'}
            </p>
            
            {agentData && (
              <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
                <p className="text-white">Sign in to save your chat agent</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 mb-6 bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                </svg>
              )}
              {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#131313] text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 transition-colors"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 transition-colors"
              />

              {!isSignUp && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowResetDialog(true)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-white text-gray-900 hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading
                  ? 'Loading...'
                  : isSignUp
                  ? 'Sign Up'
                  : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="bg-gray-900 text-white border-white/10">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
            <Button
              className="w-full bg-white text-gray-900 hover:bg-gray-200"
              onClick={handleResetPassword}
              disabled={isResetting}
            >
              {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isResetting ? 'Sending...' : 'Send reset link'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
