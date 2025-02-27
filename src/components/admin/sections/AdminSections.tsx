
import { Settings2, MessageSquare, Users, PieChart, Calendar, ShoppingBag, Link2, CreditCard, BookOpen, Shield } from "lucide-react";
import { GeneralSettings } from "../GeneralSettings";
import { ChatSection } from "./ChatSection";
import { UsersSection } from "./UsersSection";
import { TokensSection } from "./tokens/TokensSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { AppointmentsSection } from "./AppointmentsSection";
import { MarketplaceSection } from "./MarketplaceSection";
import { IntegrationsSection } from "./IntegrationsSection";
import { SubscriptionsSection } from "./SubscriptionsSection";
import { TrainingSection } from "./TrainingSection";
import { ClientsSection } from "./clients/ClientsSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LockIcon } from "lucide-react";

const SectionHeader = ({ icon: Icon, title, subtitle, isSuperAdmin, requiresSuperAdmin }: 
  { icon: any, title: string, subtitle: string, isSuperAdmin: boolean, requiresSuperAdmin?: boolean }) => (
  <div className="border-b border-[#1F2937] bg-[#111827]/50 p-6">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-purple-500/10">
        <Icon className="w-6 h-6 text-purple-500" />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          {title}
          {requiresSuperAdmin && !isSuperAdmin && (
            <LockIcon className="h-4 w-4 text-amber-500" />
          )}
        </h2>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>
      {requiresSuperAdmin && !isSuperAdmin && (
        <div className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
          Super Admin Only
        </div>
      )}
    </div>
  </div>
);

const RestrictedSection = () => (
  <div className="p-6">
    <Alert variant="destructive" className="bg-amber-500/10 border-amber-500/30 text-amber-500">
      <LockIcon className="h-4 w-4" />
      <AlertTitle>Access Restricted</AlertTitle>
      <AlertDescription>
        This section requires Super Admin privileges. Please contact a Super Admin for assistance.
      </AlertDescription>
    </Alert>
  </div>
);

export function AdminSections({ isSuperAdmin = false }) {
  return (
    <div className="space-y-8">
      <section id="general" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Settings2}
          title="General Settings"
          subtitle="Configure your system's general settings"
          isSuperAdmin={isSuperAdmin}
          requiresSuperAdmin={true}
        />
        <div className="p-6 space-y-6">
          {isSuperAdmin ? (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5"></div>
              <div className="relative z-10">
                <GeneralSettings />
              </div>
            </div>
          ) : (
            <RestrictedSection />
          )}
        </div>
      </section>

      <section id="chat" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={MessageSquare}
          title="Chat Management"
          subtitle="Manage chat configurations and interactions"
          isSuperAdmin={isSuperAdmin}
        />
        <div className="p-6">
          <ChatSection />
        </div>
      </section>

      <section id="users" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Users}
          title="User Management"
          subtitle="Manage user accounts and permissions"
          isSuperAdmin={isSuperAdmin}
          requiresSuperAdmin={true}
        />
        <div className="p-6">
          {isSuperAdmin ? (
            <UsersSection />
          ) : (
            <RestrictedSection />
          )}
        </div>
      </section>

      <section id="analytics" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={PieChart}
          title="Analytics"
          subtitle="Track system performance and metrics"
          isSuperAdmin={isSuperAdmin}
        />
        <div className="p-6">
          <AnalyticsSection />
        </div>
      </section>

      <section id="appointments" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Calendar}
          title="Appointments"
          subtitle="Manage scheduling and bookings"
          isSuperAdmin={isSuperAdmin}
        />
        <div className="p-6">
          <AppointmentsSection />
        </div>
      </section>

      <section id="marketplace" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={ShoppingBag}
          title="Marketplace"
          subtitle="Manage marketplace items and transactions"
          isSuperAdmin={isSuperAdmin}
          requiresSuperAdmin={true}
        />
        <div className="p-6">
          {isSuperAdmin ? (
            <MarketplaceSection />
          ) : (
            <RestrictedSection />
          )}
        </div>
      </section>

      <section id="integrations" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Link2}
          title="Integrations"
          subtitle="Configure third-party integrations"
          isSuperAdmin={isSuperAdmin}
        />
        <div className="p-6">
          <IntegrationsSection />
        </div>
      </section>

      <section id="subscriptions" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={CreditCard}
          title="Subscriptions"
          subtitle="Manage subscription plans and billing"
          isSuperAdmin={isSuperAdmin}
          requiresSuperAdmin={true}
        />
        <div className="p-6">
          {isSuperAdmin ? (
            <SubscriptionsSection />
          ) : (
            <RestrictedSection />
          )}
        </div>
      </section>

      <section id="training" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={BookOpen}
          title="Training"
          subtitle="Manage AI training and data"
          isSuperAdmin={isSuperAdmin}
        />
        <div className="p-6">
          <TrainingSection />
        </div>
      </section>

      <section id="clients" className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Shield}
          title="Client Management"
          subtitle="Manage client access and features"
          isSuperAdmin={isSuperAdmin}
        />
        <div className="p-6">
          <ClientsSection />
        </div>
      </section>
    </div>
  );
}
