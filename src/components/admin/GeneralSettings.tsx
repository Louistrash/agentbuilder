
import { DashboardGrid } from "./dashboard/DashboardGrid";
import { AnalyticsOverview } from "./analytics/AnalyticsOverview";
import { ChatMetricsChart } from "./analytics/ChatMetricsChart";
import { TopQueriesTable } from "./analytics/TopQueriesTable";
import { ChatSection } from "./sections/ChatSection";
import { IntegrationsSection } from "./sections/IntegrationsSection";
import { Separator } from "@/components/ui/separator";

export const GeneralSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold">Dashboard</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Overview of key metrics and performance indicators</p>
      </div>

      <AnalyticsOverview />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <ChatMetricsChart />
        <TopQueriesTable />
      </div>

      <Separator className="my-8" />

      <div>
        <h3 className="text-lg sm:text-xl font-semibold">Application Settings</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">Configure your application behavior and integrations</p>
        
        <div className="space-y-12">
          {/* Chat Behavior Settings */}
          <ChatSection />
          
          <Separator />
          
          {/* Integrations Settings */}
          <IntegrationsSection />
        </div>
      </div>
    </div>
  );
};
