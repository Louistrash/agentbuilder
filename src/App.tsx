import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages';
import Auth from '@/pages/Auth';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import AgentBuilder from '@/pages/AgentBuilder';
import { Toaster } from "@/components/ui/toaster"
import AgentConfig from '@/pages/AgentConfig';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/agents" element={<AgentBuilder />} />
        <Route path="/agents/:id/configure" element={<AgentConfig />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
