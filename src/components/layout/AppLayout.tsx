import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopNavbar from "./TopNavbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function AppLayout() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <div className="flex min-h-screen bg-[hsl(var(--background-secondary))]">
      {/* Sidebar - Position fixed on mobile */}
      <div 
        className={cn(
          "z-40 transition-all duration-300",
          isMobile ? "fixed inset-y-0 left-0 bg-background shadow-2xl" : "relative shrink-0",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <AppSidebar 
          collapsed={!isMobile && !sidebarOpen} 
          onToggle={() => setSidebarOpen(p => !p)} 
        />
      </div>

      {/* Backdrop for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 animate-in fade-in duration-300" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
        <TopNavbar onMenuClick={() => setSidebarOpen(p => !p)} />
        <main className={cn(
          "flex-1 overflow-auto",
          isMobile ? "p-4" : "p-6"
        )}>
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
