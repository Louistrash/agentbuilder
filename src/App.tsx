
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './pages/Index'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import AgentBuilder from './pages/AgentBuilder'
import AgentBuilderPro from './pages/AgentBuilderPro'
import AgentConfig from './pages/AgentConfig'
import Admin from './pages/Admin'
import { AuthProvider } from './components/AuthProvider'
import { Toaster } from './components/ui/toaster'
import { ErrorBoundary } from './components/ErrorBoundary'
import { TokenProvider } from './context/TokenContext'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TokenProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/agent-builder" element={<AgentBuilder />} />
            <Route path="/agent-builder/pro" element={<AgentBuilderPro />} />
            <Route path="/agent-config/:id" element={<AgentConfig />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </TokenProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
