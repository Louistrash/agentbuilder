
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import Auth from '@/pages/Auth';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import Index from '@/pages/Index';
import { AuthProvider } from './components/AuthProvider';
import { supabase } from './integrations/supabase/client';
import { AuthContext } from './lib/auth';

function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const isAuthenticated = !!user;

  React.useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event);
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated }}>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          <Header logoUrl="https://mkjrtfoxnysmjdtikwqo.supabase.co/storage/v1/object/public/logos/logo.png" />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/agent-builder/free" element={<Navigate to="/agent-builder" />} />
              <Route path="/agent-builder" element={
                <div className="max-w-7xl mx-auto px-4 py-12">
                  <h1 className="text-3xl font-bold mb-8">Agent Builder</h1>
                  <p className="text-lg mb-4">This is the free version of our agent builder.</p>
                  <p>Create your own AI chat agents with our intuitive interface.</p>
                </div>
              } />
              <Route path="/agent-builder/pro" element={
                <div className="max-w-7xl mx-auto px-4 py-12">
                  <h1 className="text-3xl font-bold mb-8">Professional Agent Builder</h1>
                  <p className="text-lg mb-4">Welcome to the pro version of our agent builder.</p>
                  <p>Access advanced features and capabilities to create sophisticated AI agents.</p>
                </div>
              } />
              <Route path="/agents" element={
                isAuthenticated ? (
                  <div className="max-w-7xl mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold mb-8">Your Agents Dashboard</h1>
                    <p>Manage and monitor your created agents here.</p>
                  </div>
                ) : (
                  <Navigate to="/auth" />
                )
              } />
              <Route path="/admin" element={
                isAuthenticated ? (
                  <div className="max-w-7xl mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                    <p>Administrator controls and settings.</p>
                  </div>
                ) : (
                  <Navigate to="/auth" />
                )
              } />
              <Route path="/learn/:section" element={
                <div className="max-w-7xl mx-auto px-4 py-12">
                  <h1 className="text-3xl font-bold mb-8">Learning Center</h1>
                  <p>Explore tutorials and documentation about our platform.</p>
                </div>
              } />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[70vh]">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <p className="mb-8">The page you're looking for doesn't exist or has been moved.</p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Go Home
                  </button>
                </div>
              } />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
