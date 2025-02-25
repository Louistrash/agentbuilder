
import { Card } from "@/components/ui/card";
import { 
  Settings2, 
  Users, 
  MessageSquare, 
  CalendarDays,
  ShoppingBag,
  Link
} from "lucide-react";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  href: string;
}

const MenuItem = ({ icon, title, color, href }: MenuItemProps) => (
  <Card 
    className="border-[#30363D] p-4 bg-[#0D1117] hover:bg-[#161B22] transition-all duration-300 group cursor-pointer"
    onClick={() => {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.log(`Section with id ${href} not found`);
      }
    }}
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:bg-opacity-20 transition-colors`}>
        {icon}
      </div>
      <span className="font-medium text-white group-hover:text-white/90">{title}</span>
    </div>
  </Card>
);

export function AdminMenu() {
  const menuItems = [
    {
      icon: <Settings2 className="h-6 w-6 text-[#6366F1]" />,
      title: "General Settings",
      color: "bg-[#6366F1]/10",
      href: "general"
    },
    {
      icon: <Users className="h-6 w-6 text-[#EC4899]" />,
      title: "Users",
      color: "bg-[#EC4899]/10",
      href: "users"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-[#3B82F6]" />,
      title: "Chat",
      color: "bg-[#3B82F6]/10",
      href: "chat"
    },
    {
      icon: <CalendarDays className="h-6 w-6 text-[#10B981]" />,
      title: "Appointments",
      color: "bg-[#10B981]/10",
      href: "appointments"
    },
    {
      icon: <ShoppingBag className="h-6 w-6 text-[#F59E0B]" />,
      title: "Marketplace",
      color: "bg-[#F59E0B]/10",
      href: "marketplace"
    },
    {
      icon: <Link className="h-6 w-6 text-[#6366F1]" />,
      title: "Integrations",
      color: "bg-[#6366F1]/10",
      href: "integrations"
    }
  ];

  return (
    <div className="bg-[#0D1117] border-b border-[#30363D] px-4 py-4 lg:ml-64">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              icon={item.icon}
              title={item.title}
              color={item.color}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
