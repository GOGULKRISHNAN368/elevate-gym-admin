import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopNavbar from "./TopNavbar";

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[hsl(var(--background-secondary))]">
      <AppSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(p => !p)} />
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
        <TopNavbar onMenuClick={() => setSidebarCollapsed(p => !p)} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
