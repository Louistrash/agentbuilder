import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { TokenProvider } from "@/context/TokenContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SuperAdmin from "./pages/SuperAdmin";
import ProAdmin from "./pages/ProAdmin";
import Admin from "./pages/Admin";
import UserDashboard from "./pages/UserDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import AgentBuilderFree from "./pages/AgentBuilder";
import AgentBuilderPro from "./pages/AgentBuilderPro";
import AgentConfig from "./pages/AgentConfig";

import './App.css';
import { ErrorBoundary } from "./components/ErrorBoundary";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TokenProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/homepage" element={<Navigate to="/" replace />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/super-admin" element={<SuperAdmin />} />
                <Route path="/pro-admin" element={<ProAdmin />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/agent-builder/free" element={<AgentBuilderFree />} />
                <Route path="/agent-builder/pro" element={<AgentBuilderPro />} />
                <Route path="/agent-config/:id" element={<AgentConfig />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </TokenProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;