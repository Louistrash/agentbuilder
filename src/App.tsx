
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import AgentBuilder from './pages/AgentBuilder';
import AgentBuilderPro from './pages/AgentBuilderPro';
import { Toaster } from "./components/ui/toaster";
import AgentConfig from './pages/AgentConfig';
import { useAuth } from './lib/auth';

// Protected route component that redirects to auth if not logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-[#0D1117] text-white">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Free route accessible to all users */}
      <Route path="/agent-builder/free" element={<AgentBuilder />} />
      
      {/* Protected routes that require authentication */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      } />
      <Route path="/agent-builder/pro" element={
        <ProtectedRoute>
          <AgentBuilderPro />
        </ProtectedRoute>
      } />
      <Route path="/agents/:id/configure" element={
        <ProtectedRoute>
          <AgentConfig />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
      <Toaster />
    </Router>
  );
}

export default App;
