
import { DashboardGrid } from "./dashboard/DashboardGrid";
import { AnalyticsOverview } from "./analytics/AnalyticsOverview";
import { ChatMetricsChart } from "./analytics/ChatMetricsChart";
import { TopQueriesTable } from "./analytics/TopQueriesTable";

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

      <div className="mt-8">
        <h3 className="text-lg sm:text-xl font-semibold">General Settings</h3>
        <p className="text-sm sm:text-base text-muted-foreground">Configure your application settings</p>
      </div>
    </div>
  );
};
