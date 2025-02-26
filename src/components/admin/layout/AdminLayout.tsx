
import { AdminMenu } from "../AdminMenu";
import { Rocket } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="sticky top-0 z-40 bg-[#0D1117]">
          <div className="border-b border-[#30363D]">
            <div className="max-w-[1600px] mx-auto px-4 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#161B22] flex items-center justify-center border border-[#30363D]">
                <Rocket className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div className="text-left">
                <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Manage your platform settings</p>
              </div>
            </div>
          </div>
          <AdminMenu />
        </div>
        <div className="container mx-auto p-4 lg:p-8 max-w-[1600px]">
          {children}
        </div>
      </main>
    </div>
  );
}
