
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import { TokenProvider } from "@/context/TokenContext";

import Admin from "./pages/Admin";
import ProAdminDashboard from "./pages/ProAdminDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import AgentManager from "./pages/AgentManager";
import AgentBuilderFree from "./pages/AgentBuilder";
import AgentBuilderPro from "./pages/AgentBuilderPro";
import AgentConfig from "./pages/AgentConfig";

import './App.css';
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TokenProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/pro-admin" element={<ProAdminDashboard />} />
              <Route path="/agent-manager" element={<AgentManager />} />
              <Route path="/agent-builder/free" element={<AgentBuilderFree />} />
              <Route path="/agent-builder/pro" element={<AgentBuilderPro />} />
              <Route path="/agent-config/:id" element={<AgentConfig />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TokenProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
