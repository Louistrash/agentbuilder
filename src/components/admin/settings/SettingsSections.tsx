
import { ChatSection } from "../sections/ChatSection";
import { IntegrationsSection } from "../sections/IntegrationsSection";

export const SettingsSections = () => {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-[#161B22]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-6">Chat Settings</h3>
        <ChatSection />
      </div>
      
      <div className="p-6 bg-[#161B22]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-6">Integrations</h3>
        <IntegrationsSection />
      </div>
    </div>
  );
};
