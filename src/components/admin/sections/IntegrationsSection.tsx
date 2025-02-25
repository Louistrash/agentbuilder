
import { IntegrationsSettings } from "../integrations/IntegrationsSettings";

export const IntegrationsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Integrations & API Settings</h2>
        <p className="text-gray-600">Manage external integrations and API connections.</p>
      </div>
      <IntegrationsSettings />
    </div>
  );
};
