
import { Card } from "@/components/ui/card";
import { 
  Settings2, 
  Users, 
  MessageSquare, 
  PieChart,
  CalendarDays,
  ShoppingBag,
  Link,
  CreditCard,
  BookOpen,
  Shield
} from "lucide-react";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  href: string;
}

const MenuItem = ({ icon, title, color, href }: MenuItemProps) => (
  <Card 
    className="border-[#30363D] p-4 bg-[#161B22] hover:bg-[#1C2128] transition-all duration-300 group cursor-pointer w-[95%]"
    onClick={() => {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }}
  >
    <div className="flex items-center gap-2.5">
      <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center group-hover:bg-opacity-20 transition-colors`}>
        {icon}
      </div>
      <span className="font-medium text-xs text-white group-hover:text-white/90">{title}</span>
    </div>
  </Card>
);

export function AdminMenu() {
  const menuItems = [
    // Core Setup & Management
    {
      icon: <Users className="h-4 w-4 text-[#EC4899]" />,
      title: "Users & Roles",
      color: "bg-[#EC4899]/10",
      href: "users"
    },
    {
      icon: <Shield className="h-4 w-4 text-[#3B82F6]" />,
      title: "Clients",
      color: "bg-[#3B82F6]/10",
      href: "clients"
    },
    {
      icon: <MessageSquare className="h-4 w-4 text-[#3B82F6]" />,
      title: "Chat Management",
      color: "bg-[#3B82F6]/10",
      href: "chat"
    },
    {
      icon: <BookOpen className="h-4 w-4 text-[#6366F1]" />,
      title: "Training & Data",
      color: "bg-[#6366F1]/10",
      href: "training"
    },
    // Business Operations
    {
      icon: <CalendarDays className="h-4 w-4 text-[#6366F1]" />,
      title: "Appointments",
      color: "bg-[#6366F1]/10",
      href: "appointments"
    },
    {
      icon: <ShoppingBag className="h-4 w-4 text-[#F59E0B]" />,
      title: "Marketplace",
      color: "bg-[#F59E0B]/10",
      href: "marketplace"
    },
    // Integrations & Analytics
    {
      icon: <Link className="h-4 w-4 text-[#8B5CF6]" />,
      title: "Integrations",
      color: "bg-[#8B5CF6]/10",
      href: "integrations"
    },
    {
      icon: <PieChart className="h-4 w-4 text-[#10B981]" />,
      title: "Analytics",
      color: "bg-[#10B981]/10",
      href: "analytics"
    },
    // Configuration
    {
      icon: <CreditCard className="h-4 w-4 text-[#EC4899]" />,
      title: "Billing",
      color: "bg-[#EC4899]/10",
      href: "subscriptions"
    },
    {
      icon: <Settings2 className="h-4 w-4 text-[#6366F1]" />,
      title: "Settings",
      color: "bg-[#6366F1]/10",
      href: "general"
    }
  ];

  return (
    <div className="bg-[#0D1117] border-b border-[#30363D] px-4 py-3">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
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
