
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Users, 
  Coins, 
  CalendarDays,
  Boxes,
  Rocket,
  CreditCard,
  BookOpen
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
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      icon: <Settings className="h-6 w-6 text-[#6366F1]" />,
      title: "General",
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
      icon: <BarChart3 className="h-6 w-6 text-[#10B981]" />,
      title: "Analytics",
      color: "bg-[#10B981]/10",
      href: "analytics"
    },
    {
      icon: <Coins className="h-6 w-6 text-[#F59E0B]" />,
      title: "Tokens",
      color: "bg-[#F59E0B]/10",
      href: "tokens"
    },
    {
      icon: <CalendarDays className="h-6 w-6 text-[#6366F1]" />,
      title: "Appointments",
      color: "bg-[#6366F1]/10",
      href: "appointments"
    },
    {
      icon: <Boxes className="h-6 w-6 text-[#EC4899]" />,
      title: "Marketplace",
      color: "bg-[#EC4899]/10",
      href: "marketplace"
    },
    {
      icon: <Rocket className="h-6 w-6 text-[#10B981]" />,
      title: "Integrations",
      color: "bg-[#10B981]/10",
      href: "integrations"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#F59E0B]" />,
      title: "Subscriptions",
      color: "bg-[#F59E0B]/10",
      href: "subscriptions"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#3B82F6]" />,
      title: "Training",
      color: "bg-[#3B82F6]/10",
      href: "training"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
  );
}
