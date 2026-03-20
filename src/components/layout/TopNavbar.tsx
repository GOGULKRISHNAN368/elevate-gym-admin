import { Bell, Globe, ChevronDown, Menu, Search } from "lucide-react";
import { useState } from "react";

interface Props { onMenuClick: () => void }

export default function TopNavbar({ onMenuClick }: Props) {
  const [branch, setBranch] = useState("Mumbai Central");
  const branches = ["Mumbai Central", "Delhi North", "Bangalore South", "Chennai East"];

  return (
    <header className="h-[60px] bg-card border-b border-border flex items-center px-4 gap-3 shrink-0">
      {/* Mobile menu */}
      <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-muted text-muted-foreground md:hidden">
        <Menu className="w-5 h-5" />
      </button>

      {/* Branch selector */}
      <div className="relative hidden sm:block">
        <select
          value={branch}
          onChange={e => setBranch(e.target.value)}
          className="appearance-none pl-3 pr-8 py-1.5 text-sm font-medium bg-muted rounded-lg border-0 text-foreground cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none"
        >
          {branches.map(b => <option key={b}>{b}</option>)}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          placeholder="Search members, plans..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* Language */}
        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <Globe className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-muted transition-colors group">
          <div className="w-7 h-7 purple-gradient rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            AK
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-foreground leading-tight">Aryan Kumar</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Super Admin</p>
          </div>
          <ChevronDown className="w-3 h-3 text-muted-foreground ml-1 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
