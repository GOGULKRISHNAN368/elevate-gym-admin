import { Plus, Building2, Users, TrendingUp, MapPin, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const outlets = [
  { id: 1, name: "Mumbai Central",  city: "Mumbai",    members: 412, staff: 14, revenue: 485000, status: "active",   since: "Jan 2022" },
  { id: 2, name: "Delhi North",     city: "Delhi",     members: 289, staff: 9,  revenue: 342000, status: "active",   since: "Mar 2022" },
  { id: 3, name: "Bangalore South", city: "Bangalore", members: 356, staff: 11, revenue: 418000, status: "active",   since: "Jul 2022" },
  { id: 4, name: "Chennai East",    city: "Chennai",   members: 227, staff: 7,  revenue: 271000, status: "active",   since: "Nov 2022" },
  { id: 5, name: "Hyderabad West",  city: "Hyderabad", members: 0,   staff: 0,  revenue: 0,      status: "inactive", since: "–" },
];

export default function OutletsPage() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Outlets</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your gym branches and outlets</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 purple-gradient text-white text-sm font-semibold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all">
          <Plus className="w-4 h-4" /> Add Outlet
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-up stagger-1">
        {[
          { label: "Total Outlets",   value: outlets.length, icon: Building2 },
          { label: "Active Outlets",  value: outlets.filter(o => o.status === "active").length, icon: Building2 },
          { label: "Total Members",   value: outlets.reduce((s,o) => s+o.members, 0).toLocaleString(), icon: Users },
          { label: "Total Staff",     value: outlets.reduce((s,o) => s+o.staff, 0), icon: Users },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="w-9 h-9 bg-primary-light rounded-xl flex items-center justify-center mb-3">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Outlet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {outlets.map((outlet, i) => (
          <div key={outlet.id} className={cn("bg-card rounded-2xl border border-border p-6 animate-fade-up", `stagger-${i + 1}`)}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 purple-gradient rounded-xl flex items-center justify-center shadow-purple-sm">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{outlet.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{outlet.city} · Since {outlet.since}</p>
                  </div>
                </div>
              </div>
              <span className={cn(
                "text-xs font-semibold px-2.5 py-1 rounded-full",
                outlet.status === "active" ? "bg-success-bg text-success" : "bg-muted text-muted-foreground"
              )}>{outlet.status === "active" ? "Active" : "Inactive"}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 py-4 border-y border-border mb-4">
              {[
                { label: "Members", value: outlet.members },
                { label: "Staff",   value: outlet.staff },
                { label: "Revenue", value: outlet.revenue > 0 ? `₹${(outlet.revenue/1000).toFixed(0)}k` : "–" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-primary-light text-primary text-xs font-semibold hover:bg-primary-muted transition-colors">
                <TrendingUp className="w-3.5 h-3.5" /> Analytics
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors">
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-red-50 hover:text-destructive hover:border-red-200 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
