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
import { LogIn, UserPlus, ChevronLeft, Shield } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      if (data?.user) {
        if (data.user.email === "patricknieborg@me.com") {
          await ensureCEOAdminRole(data.user.id);
        }
      }
      
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "There was a problem with your login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const ensureCEOAdminRole = async (userId: string) => {
    try {
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (!existingRole) {
        await supabase
          .from('user_roles')
          .upsert({ user_id: userId, role: 'admin' });
        
        await supabase
          .from('profiles')
          .update({ is_admin: true })
          .eq('id', userId);
      }
    } catch (error) {
      console.error('Error ensuring CEO admin role:', error);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully. Please check your email for verification.",
      });
      
      setActiveTab("login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error.message || "There was a problem creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCEOQuickLogin = async () => {
    const ceoEmail = "patricknieborg@me.com";
    const tempPassword = "Admin123!"; // This should be a secure password in a real app
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: ceoEmail,
        password: tempPassword,
      });
      
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: ceoEmail,
            password: tempPassword,
          });
          
          if (signUpError) throw signUpError;
          
          if (signUpData?.user) {
            await ensureCEOAdminRole(signUpData.user.id);
            
            toast({
              title: "CEO Account Created",
              description: "A new CEO account has been created. Please check email for verification.",
            });
            return;
          }
        }
        throw error;
      }
      
      if (data?.user) {
        await ensureCEOAdminRole(data.user.id);
        
        toast({
          title: "CEO Access Granted",
          description: "Welcome back, Patrick. You now have full admin access.",
        });
        
        navigate("/");
      }
    } catch (error: any) {
      console.error("CEO login error:", error);
      toast({
        title: "CEO Login Failed",
        description: error.message || "There was a problem with the CEO login.",
        variant: "destructive",
      });
    } finally {
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
                        CEO LOGIN
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full border-[#30363D] hover:bg-[#1A1F2C] hover:text-[#1EAEDB]"
                    onClick={handleCEOQuickLogin}
                    disabled={isLoading}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    CEO Access
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
