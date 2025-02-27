
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import AgentBuilder from "@/pages/AgentBuilder";
import AgentBuilderPro from "@/pages/AgentBuilderPro";
import AgentConfig from "@/pages/AgentConfig";
import Admin from "@/pages/Admin";
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/AuthProvider";
import { TokenProvider } from "@/context/TokenContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false} forcedTheme="dark">
      <AuthProvider>
        <TokenProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/agent-builder" element={<AgentBuilder />} />
              <Route path="/agent-builder/free" element={<AgentBuilder />} />
              <Route path="/agent-builder/pro" element={<AgentBuilderPro />} />
              <Route path="/agents/:id/configure" element={<AgentConfig />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </TokenProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
