import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, CreditCard, Receipt,
  Building2, MessageSquare, UserCheck, BarChart3,
  Settings, ChevronLeft, ChevronRight, Dumbbell, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",  to: "/" },
  { icon: Users,           label: "Members",    to: "/members" },
  { icon: CreditCard,      label: "Plans",       to: "/plans" },
  { icon: Receipt,         label: "Expenses",    to: "/expenses" },
  { icon: Building2,       label: "Outlets",     to: "/outlets" },
  { icon: MessageSquare,   label: "Enquiries",   to: "/enquiries" },
  { icon: UserCheck,       label: "Staffs",      to: "/staffs" },
  { icon: BarChart3,       label: "Finance",     to: "/finance" },
  { icon: Settings,        label: "Settings",    to: "/settings" },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AppSidebar({ collapsed, onToggle }: Props) {
  const { pathname } = useLocation();

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-card border-r border-border transition-all duration-300 shrink-0",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="flex-shrink-0 w-9 h-9 purple-gradient rounded-xl flex items-center justify-center shadow-purple-sm">
          <Dumbbell className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-scale-in overflow-hidden">
            <p className="font-bold text-sm text-foreground leading-tight">FitCore Pro</p>
            <p className="text-xs text-muted-foreground">Admin Portal</p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ icon: Icon, label, to }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-primary-light text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("shrink-0 w-[18px] h-[18px]", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      {!collapsed && (
        <div className="m-3 p-4 purple-soft rounded-2xl border border-purple-100 animate-fade-up">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary">Pro Plan</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Unlock advanced analytics &amp; multi-outlet tools.</p>
          <button className="w-full py-1.5 text-xs font-semibold text-primary-foreground purple-gradient rounded-lg transition-opacity hover:opacity-90 active:scale-[0.98]">
            Upgrade Plan
          </button>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-[68px] z-10 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center shadow-card hover:bg-muted transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />}
      </button>
    </aside>
  );
}
