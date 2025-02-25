
import { MetricCards } from "./MetricCards";
import { RevenueChart } from "./RevenueChart";
import { QuickStats } from "./QuickStats";

interface DashboardOverviewProps {
  analytics: {
    totalUsers: number;
    newUsers: number;
    activeChats: number;
    revenue: number;
    appointments: number;
    marketplaceItems: number;
    integrations: number;
    trainingDocs: number;
  };
  chartData: Array<{ name: string; value: number; }>;
}

export function DashboardOverview({ analytics, chartData }: DashboardOverviewProps) {
  return (
    <div className="min-h-screen bg-[#0D1117] pt-4">
      <div className="mb-8 hidden lg:block">
        <h1 className="text-2xl font-bold text-white">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">Complete system management and analytics</p>
      </div>

      <div className="space-y-8">
        <MetricCards analytics={analytics} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
            <RevenueChart data={chartData} />
          </div>
          <div className="bg-[#161B22] rounded-xl p-4 border border-[#30363D]">
            <QuickStats 
              stats={{
                marketplaceItems: analytics.marketplaceItems,
                integrations: analytics.integrations,
                trainingDocs: analytics.trainingDocs,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
