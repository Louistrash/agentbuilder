
import { AnalyticsOverview } from "../analytics/AnalyticsOverview";
import { ChatMetricsChart } from "../analytics/ChatMetricsChart";
import { TopQueriesTable } from "../analytics/TopQueriesTable";

export const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Analytics & Performance</h2>
        <p className="text-gray-600">View chat statistics and user engagement metrics.</p>
      </div>
      
      <AnalyticsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChatMetricsChart />
        <TopQueriesTable />
      </div>
    </div>
  );
};
