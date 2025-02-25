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
import { LayoutGrid, Settings2, Users, MessageSquare, ChartBar, Calendar, ShoppingBag, Link, CreditCard, Book } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
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

  if (isAdminLoading || isCheckingAdmin) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
        <div className="text-white animate-pulse">Loading...</div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="flex">
        <div className="w-64 min-h-screen bg-[#161B22] border-r border-[#30363D] shadow-xl">
          <div className="p-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-6">
              Admin Panel
            </h2>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 p-8">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-gray-400">Complete system management and analytics</p>
            </div>

            <MetricCards analytics={analytics} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <RevenueChart data={chartData} />
              <QuickStats 
                stats={{
                  marketplaceItems: analytics.marketplaceItems,
                  integrations: analytics.integrations,
                  trainingDocs: analytics.trainingDocs,
                }}
              />
            </div>

            <AdminMenu />

            <div className="space-y-6 mt-8">
              <div className="bg-[#161B22]/95 backdrop-blur-xl rounded-xl p-8 border border-[#30363D]/50 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/5 via-transparent to-[#EC4899]/5 pointer-events-none"></div>
                <div className="relative z-10">
                  <section id="general" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">General Settings</h2>
                    <GeneralSettings />
                  </section>

                  <section id="chat" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">Chat Management</h2>
                    <ChatSection />
                  </section>

                  <section id="users" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">User Management</h2>
                    <UsersSection />
                  </section>

                  <section id="tokens" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">Token Management</h2>
                    <TokensSection />
                  </section>

                  <section id="analytics" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">Analytics</h2>
                    <AnalyticsSection />
                  </section>

                  <section id="appointments" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">Appointments</h2>
                    <AppointmentsSection />
                  </section>

                  <section id="marketplace" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">Marketplace</h2>
                    <MarketplaceSection />
                  </section>

                  <section id="integrations" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">Integrations</h2>
                    <IntegrationsSection />
                  </section>

                  <section id="subscriptions" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">Subscriptions</h2>
                    <SubscriptionsSection />
                  </section>

                  <section id="training" className="mb-16">
                    <h2 className="text-xl font-semibold mb-6 text-white/90">Training</h2>
                    <TrainingSection />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
