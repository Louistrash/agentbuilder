
import { AdminMenu } from "../AdminMenu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="sticky top-0 z-40 bg-[#0D1117]">
          <AdminMenu />
        </div>
        <div className="container mx-auto p-4 lg:p-8 max-w-[1600px]">
          {children}
        </div>
      </main>
    </div>
  );
}
