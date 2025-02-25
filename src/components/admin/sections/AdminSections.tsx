
import { Settings2 } from "lucide-react";
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

export function AdminSections() {
  return (
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
  );
}
