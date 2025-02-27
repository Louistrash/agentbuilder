
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import Auth from '@/pages/Auth';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import Index from '@/pages/Index';

function App() {
  // Debugging function to track route changes
  const logRouteNavigation = (path: string) => {
    console.log(`Navigating to route: ${path}`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Header logoUrl="https://mkjrtfoxnysmjdtikwqo.supabase.co/storage/v1/object/public/logos/logo.png" />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/agent-builder/free" element={<Navigate to="/home" />} />
            <Route path="/learn/build" element={<Navigate to="/home" />} />
            <Route path="/learn/responses" element={<Navigate to="/home" />} />
            <Route path="/learn/analytics" element={<Navigate to="/home" />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
