
import { cn } from "@/lib/utils";
import { menuItems } from "../config/menuItems";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-[#161B22] border-r border-[#30363D] transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#30363D]">
          <h2 className="text-xl font-bold text-white hidden lg:block">
            Admin Panel
          </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-2 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
