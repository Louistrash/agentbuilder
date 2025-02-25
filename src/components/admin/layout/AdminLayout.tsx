
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminMenu } from "../AdminMenu";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D1117] flex">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 lg:hidden bg-[#161B22] border-b border-[#30363D] px-4 h-16 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>

      {/* Sidebar */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <AdminMenu />
        <div className="container mx-auto p-4 lg:p-8 max-w-[1600px] mt-[280px] md:mt-[200px] lg:mt-[160px]">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
