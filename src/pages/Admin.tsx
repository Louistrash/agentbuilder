import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/hooks/useAdmin";
import { MetricCards } from "@/components/admin/dashboard/MetricCards";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { QuickStats } from "@/components/admin/dashboard/QuickStats";
import { GeneralSettings } from "@/components/admin/GeneralSettings";
import { ChatSection } from "@/components/admin/sections/ChatSection";
import { UsersSection } from "@/components/admin/sections/UsersSection";
import { TokensSection } from "@/components/admin/sections/tokens/TokensSection";
import { AnalyticsSection } from "@/components/admin/sections/AnalyticsSection";
import { AppointmentsSection } from "@/components/admin/sections/AppointmentsSection";
import { MarketplaceSection } from "@/components/admin/sections/MarketplaceSection";
import { IntegrationsSection } from "@/components/admin/sections/IntegrationsSection";
import { SubscriptionsSection } from "@/components/admin/sections/SubscriptionsSection";
import { TrainingSection } from "@/components/admin/sections/TrainingSection";
import { AdminMenu } from "@/components/admin/AdminMenu";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Settings2, Users, MessageSquare, ChartBar, Calendar, ShoppingBag, Link, CreditCard, Book, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const menuItems = [
    { icon: LayoutGrid, label: "Dashboard", href: "#dashboard" },
    { icon: Settings2, label: "General", href: "#general" },
    { icon: Users, label: "Users", href: "#users" },
    { icon: MessageSquare, label: "Chat", href: "#chat" },
    { icon: ChartBar, label: "Analytics", href: "#analytics" },
    { icon: Calendar, label: "Appointments", href: "#appointments" },
    { icon: ShoppingBag, label: "Marketplace", href: "#marketplace" },
    { icon: Link, label: "Integrations", href: "#integrations" },
    { icon: CreditCard, label: "Subscriptions", href: "#subscriptions" },
    { icon: Book, label: "Training", href: "#training" },
  ];

  if (isAdminLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 lg:hidden bg-[#161B22] border-b border-[#30363D] px-4 h-16 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#161B22] border-r border-[#30363D] transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[#30363D]">
            <h2 className="text-xl font-bold text-white hidden lg:block">
              Admin Panel
            </h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="container mx-auto p-4 lg:p-8 max-w-[1600px]">
          <div className="mb-8 hidden lg:block">
            <h1 className="text-2xl font-bold text-white">
              Dashboard Overview
            </h1>
            <p className="text-gray-400">Complete system management and analytics</p>
          </div>

          <div className="space-y-8">
            <MetricCards analytics={analytics} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <RevenueChart data={chartData} />
              </div>
              <div className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <QuickStats 
                  stats={{
                    marketplaceItems: analytics.marketplaceItems,
                    integrations: analytics.integrations,
                    trainingDocs: analytics.trainingDocs,
                  }}
                />
              </div>
            </div>

            <AdminMenu />

            <div className="space-y-8">
              <section id="general" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="border-b border-[#30363D] bg-[#0D1117]/50 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-3">
                    <Settings2 className="w-5 h-5 text-[#6366F1]" />
                    General Settings
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">Configure your system's general settings</p>
                </div>
                
                <div className="p-4 sm:p-6 space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/5 via-transparent to-[#EC4899]/5"></div>
                    <div className="relative z-10">
                      <GeneralSettings />
                    </div>
                  </div>
                </div>
              </section>

              <section id="chat" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">Chat Management</h2>
                <ChatSection />
              </section>

              <section id="users" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">User Management</h2>
                <UsersSection />
              </section>

              <section id="tokens" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">Token Management</h2>
                <TokensSection />
              </section>

              <section id="analytics" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">Analytics</h2>
                <AnalyticsSection />
              </section>

              <section id="appointments" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">Appointments</h2>
                <AppointmentsSection />
              </section>

              <section id="marketplace" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">Marketplace</h2>
                <MarketplaceSection />
              </section>

              <section id="integrations" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">Integrations</h2>
                <IntegrationsSection />
              </section>

              <section id="subscriptions" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">Subscriptions</h2>
                <SubscriptionsSection />
              </section>

              <section id="training" className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
                <h2 className="text-xl font-semibold mb-6 text-white">Training</h2>
                <TrainingSection />
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Admin;
