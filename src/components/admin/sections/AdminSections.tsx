
import { Settings2, MessageSquare, Users, PieChart, Calendar, ShoppingBag, Link2, CreditCard, BookOpen } from "lucide-react";
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

const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
  <div className="border-b border-[#1F2937] bg-[#111827]/50 p-4 sm:p-6">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-purple-500/10">
        <Icon className="w-5 h-5 text-purple-500" />
      </div>
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  </div>
);

export function AdminSections() {
  return (
    <div className="space-y-8">
      <section id="general" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Settings2}
          title="General Settings"
          subtitle="Configure your system's general settings"
        />
        <div className="p-4 sm:p-6 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5"></div>
            <div className="relative z-10">
              <GeneralSettings />
            </div>
          </div>
        </div>
      </section>

      <section id="chat" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={MessageSquare}
          title="Chat Management"
          subtitle="Manage chat configurations and interactions"
        />
        <div className="p-4 sm:p-6">
          <ChatSection />
        </div>
      </section>

      <section id="users" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Users}
          title="User Management"
          subtitle="Manage user accounts and permissions"
        />
        <div className="p-4 sm:p-6">
          <UsersSection />
        </div>
      </section>

      <section id="tokens" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={CreditCard}
          title="Token Management"
          subtitle="Monitor and manage system tokens"
        />
        <div className="p-4 sm:p-6">
          <TokensSection />
        </div>
      </section>

      <section id="analytics" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={PieChart}
          title="Analytics"
          subtitle="Track system performance and metrics"
        />
        <div className="p-4 sm:p-6">
          <AnalyticsSection />
        </div>
      </section>

      <section id="appointments" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Calendar}
          title="Appointments"
          subtitle="Manage scheduling and bookings"
        />
        <div className="p-4 sm:p-6">
          <AppointmentsSection />
        </div>
      </section>

      <section id="marketplace" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={ShoppingBag}
          title="Marketplace"
          subtitle="Manage marketplace items and transactions"
        />
        <div className="p-4 sm:p-6">
          <MarketplaceSection />
        </div>
      </section>

      <section id="integrations" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={Link2}
          title="Integrations"
          subtitle="Configure third-party integrations"
        />
        <div className="p-4 sm:p-6">
          <IntegrationsSection />
        </div>
      </section>

      <section id="subscriptions" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={CreditCard}
          title="Subscriptions"
          subtitle="Manage subscription plans and billing"
        />
        <div className="p-4 sm:p-6">
          <SubscriptionsSection />
        </div>
      </section>

      <section id="training" className="bg-[#111827] rounded-xl border border-[#1F2937] overflow-hidden hover:border-purple-500/30 transition-colors">
        <SectionHeader 
          icon={BookOpen}
          title="Training"
          subtitle="Manage AI training and data"
        />
        <div className="p-4 sm:p-6">
          <TrainingSection />
        </div>
      </section>
    </div>
  );
}
