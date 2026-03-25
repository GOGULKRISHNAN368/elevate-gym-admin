import { Plus, Building2, Users, TrendingUp, MapPin, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const outlets = [
  { id: 1, name: "Mumbai Central",  city: "Mumbai",    members: 412, staff: 14, revenue: 485000, status: "active",   since: "Jan 2022" },
  { id: 2, name: "Delhi North",     city: "Delhi",     members: 289, staff: 9,  revenue: 342000, status: "active",   since: "Mar 2022" },
  { id: 3, name: "Bangalore South", city: "Bangalore", members: 356, staff: 11, revenue: 418000, status: "active",   since: "Jul 2022" },
  { id: 4, name: "Chennai East",    city: "Chennai",   members: 227, staff: 7,  revenue: 271000, status: "active",   since: "Nov 2022" },
  { id: 5, name: "Hyderabad West",  city: "Hyderabad", members: 0,   staff: 0,  revenue: 0,      status: "inactive", since: "–" },
];

export default function OutletsPage() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Gym Outlets</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Manage your gym branches and outlets</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 purple-gradient text-white text-sm font-bold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all">
          <Plus className="w-4 h-4" /> Add Outlet
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-up stagger-1">
        {[
          { label: "Total Outlets",   value: outlets.length, icon: Building2 },
          { label: "Active",          value: outlets.filter(o => o.status === "active").length, icon: Building2 },
          { label: "Members",         value: outlets.reduce((s,o) => s+o.members, 0).toLocaleString(), icon: Users },
          { label: "Staff",           value: outlets.reduce((s,o) => s+o.staff, 0), icon: Users },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl px-4 py-3 sm:py-4 shadow-sm">
            <div className="w-7 h-7 bg-primary-light rounded-lg flex items-center justify-center mb-2.5">
              <s.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-lg sm:text-2xl font-extrabold text-foreground">{s.value}</p>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Outlet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-fade-up stagger-2">
        {outlets.map((outlet, i) => (
          <div key={outlet.id} className={cn("bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-sm hover:shadow-md transition-all active:scale-[0.99]")}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 purple-gradient rounded-xl flex items-center justify-center shadow-purple-sm shrink-0">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm sm:text-base truncate">{outlet.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <p className="text-[10px] sm:text-xs font-medium text-muted-foreground truncate">{outlet.city} · Est. {outlet.since}</p>
                  </div>
                </div>
              </div>
              <span className={cn(
                "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight shrink-0",
                outlet.status === "active" ? "bg-success-bg text-success" : "bg-muted text-muted-foreground"
              )}>{outlet.status}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-5 border-y border-border/50 mb-5 bg-[hsl(var(--background-secondary))/0.3] rounded-xl">
              {[
                { label: "Members", value: outlet.members },
                { label: "Staff",   value: outlet.staff },
                { label: "Revenue", value: outlet.revenue > 0 ? `₹${(outlet.revenue/1000).toFixed(0)}k` : "–" },
              ].map(s => (
                <div key={s.label} className="text-center px-1">
                  <p className="text-base sm:text-lg font-extrabold text-foreground">{s.value}</p>
                  <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary-light text-primary text-[11px] sm:text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
                <TrendingUp className="w-3.5 h-3.5" /> Analytics
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all active:scale-[0.98]">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-red-50 hover:text-destructive hover:border-red-200 transition-all active:scale-[0.98]">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
