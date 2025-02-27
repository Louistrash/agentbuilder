import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import Auth from '@/pages/Auth';

function App() {
  return (
    <Router>
      <div>
        <Header logoUrl="https://mkjrtfoxnysmjdtikwqo.supabase.co/storage/v1/object/public/logos/logo.png" />
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
