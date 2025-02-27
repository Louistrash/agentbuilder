
import { AnalyticsOverview } from "../analytics/AnalyticsOverview";
import { ChatMetricsChart } from "../analytics/ChatMetricsChart";
import { TopQueriesTable } from "../analytics/TopQueriesTable";

export const AnalyticsOverviewSection = () => {
  return (
    <div className="p-6 bg-[#161B22]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-6">Analytics Overview</h3>
      <AnalyticsOverview />
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        <div className="p-4 bg-[#0D1117]/80 backdrop-blur-sm rounded-xl border border-white/10">
          <ChatMetricsChart />
        </div>
        <div className="p-4 bg-[#0D1117]/80 backdrop-blur-sm rounded-xl border border-white/10">
          <TopQueriesTable />
        </div>
      </div>
    </div>
  );
};
