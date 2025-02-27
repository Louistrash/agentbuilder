
import { useEffect, useState, ErrorBoundary } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { DashboardOverview } from "@/components/admin/dashboard/DashboardOverview";
import { AdminSections } from "@/components/admin/sections/AdminSections";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AgentsList } from "@/components/admin/appointments/AgentsList";

// Simple error fallback component
const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-6">
      <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold text-white mb-4">Something went wrong</h2>
        <p className="text-gray-400 mb-6">{error.message || "An unexpected error occurred"}</p>
        <div className="text-xs text-left bg-[#0D1117] p-3 rounded-md border border-[#30363D] overflow-auto max-h-40 mb-6">
          <pre className="text-gray-400">{error.stack}</pre>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#3B82F6] text-white rounded-md hover:bg-[#2563EB] transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

// Custom error boundary component
class AdminErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} />;
    }
    return this.props.children;
  }
}

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isSuperAdmin, isCEO, isLoading: isAdminLoading } = useAdmin();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [showAgents, setShowAgents] = useState(false);
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState({
    totalUsers: 2048,
    newUsers: 429,
    activeChats: 143,
    revenue: 21560.57,
    appointments: 28,
    marketplaceItems: 15,
    integrations: 7,
    trainingDocs: 156,
  });

  const [chartData] = useState([
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
    { name: 'Thu', value: 400 },
    { name: 'Fri', value: 500 },
    { name: 'Sat', value: 350 },
    { name: 'Sun', value: 450 },
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!isAdminLoading && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You do not have permission to access the admin dashboard.",
      });
      navigate('/');
    }

    setIsCheckingAdmin(false);
  }, [user, isAdmin, isAdminLoading, navigate, toast]);

  const handleViewChange = (value: string) => {
    setShowAgents(value === 'agents');
  };

  if (isAdminLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <AdminErrorBoundary>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isCEO ? "CEO Dashboard" : (isSuperAdmin ? "Super Admin Dashboard" : "Admin Dashboard")}
            </h1>
            <p className="text-gray-400">
              {isCEO ? "Complete platform management and controls" : 
               (isSuperAdmin ? "Advanced system management" : "Platform management")}
            </p>
          </div>
          
          {isCEO && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">View:</span>
              <Select onValueChange={handleViewChange} defaultValue="dashboard">
                <SelectTrigger className="w-[180px] bg-[#161B22] border-[#30363D]">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1F2C] border-[#30363D]">
                  <SelectItem value="dashboard">Admin Dashboard</SelectItem>
                  <SelectItem value="agents">My Agents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {showAgents ? (
          <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">My Agents</h2>
            <AgentsList />
          </div>
        ) : (
          <>
            <DashboardOverview analytics={analytics} chartData={chartData} />
            <AdminSections />
          </>
        )}
      </AdminLayout>
    </AdminErrorBoundary>
  );
};

export default Admin;
