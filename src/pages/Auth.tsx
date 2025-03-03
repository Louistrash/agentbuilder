import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, ChevronLeft } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    // Basic password validation
    if (password.length < 6) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });
      
      if (error) throw error;
      
      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tokens: 60
          });

        if (createError) throw createError;

        // Record initial token transaction
        await supabase
          .from('token_transactions')
          .insert({
            profile_id: data.user.id,
            amount: 60,
            transaction_type: 'credit',
            description: 'Welcome bonus tokens'
          });
      }

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        }
      });
      
      if (error) throw error;

      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tokens: 60
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          throw profileError;
        }

        const { error: tokenError } = await supabase
          .from('token_transactions')
          .insert({
            profile_id: data.user.id,
            amount: 60,
            transaction_type: 'credit',
            description: 'Welcome bonus tokens'
          });

        if (tokenError) {
          console.error('Error creating token transaction:', tokenError);
        }
      }
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully. You can now sign in.",
      });
      
      setActiveTab("login");
      setEmail("");
      setPassword("");
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
      let errorMessage = "There was a problem creating your account.";
      if (error.message.includes("already registered")) {
        errorMessage = "This email is already registered. Please try logging in instead.";
      }
      
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to reset your password.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?type=recovery`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your email for the password reset link.",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Password Reset Failed",
        description: "Failed to send password reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      console.error("Google login error:", error);
      toast({
        title: "Google Login Failed",
        description: "There was a problem signing in with Google.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="bg-[#0D1117] border-[#30363D]">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-white font-semibold">
              {activeTab === "login" ? "Welcome Back" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {activeTab === "login"
                ? "Sign in to access your agents and analytics"
                : "Join to start building intelligent chat agents"}
            </CardDescription>
          </CardHeader>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full bg-[#161B22]">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#1A1F2C]">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-[#1A1F2C]">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <CardContent className="space-y-4 p-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#161B22] border-[#30363D] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#161B22] border-[#30363D] text-white"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleForgotPassword}
                      className="text-sm text-[#1EAEDB] hover:text-[#1EAEDB]/90 p-0 h-auto font-normal"
                      disabled={isLoading}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4 p-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  
                  <div className="text-sm text-center text-gray-400">
                    <span>Don't have an account? </span>
                    <button
                      type="button"
                      className="text-[#1EAEDB] hover:underline"
                      onClick={() => setActiveTab("signup")}
                    >
                      Sign up
                    </button>
                  </div>
                  
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#30363D]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-[#0D1117] text-gray-500">
                        OR CONTINUE WITH
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full border-[#30363D] hover:bg-[#1A1F2C] hover:text-[#1EAEDB]"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    Sign in with Google
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <CardContent className="space-y-4 p-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#161B22] border-[#30363D] text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#161B22] border-[#30363D] text-white"
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-4 p-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#1EAEDB] hover:bg-[#1EAEDB]/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                  
                  <div className="text-sm text-center text-gray-400">
                    <span>Already have an account? </span>
                    <button
                      type="button"
                      className="text-[#1EAEDB] hover:underline"
                      onClick={() => setActiveTab("login")}
                    >
                      Sign in
                    </button>
                  </div>
                  
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#30363D]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-[#0D1117] text-gray-500">
                        OR CONTINUE WITH
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full border-[#30363D] hover:bg-[#1A1F2C] hover:text-[#1EAEDB]"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    Sign up with Google
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;