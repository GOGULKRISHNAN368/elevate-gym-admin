import { useState } from "react";
import { Plus, UserCheck, Star, Phone, Mail, Edit2, Trash2, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const staffList = [
  { id: 1, name: "Rajesh Kumar",    role: "Head Trainer",      outlet: "Mumbai Central",  phone: "+91 98765 11111", email: "rajesh@fitcore.in", status: "active",  joined: "Jan 2023", rating: 4.8, avatar: "RK" },
  { id: 2, name: "Priti Sharma",    role: "Yoga Instructor",   outlet: "Bangalore South", phone: "+91 87654 22222", email: "priti@fitcore.in",  status: "active",  joined: "Mar 2023", rating: 4.9, avatar: "PS" },
  { id: 3, name: "Manish Patel",    role: "Nutrition Coach",   outlet: "Delhi North",     phone: "+91 76543 33333", email: "manish@fitcore.in", status: "active",  joined: "Jun 2023", rating: 4.6, avatar: "MP" },
  { id: 4, name: "Divya Nair",      role: "Receptionist",      outlet: "Mumbai Central",  phone: "+91 65432 44444", email: "divya@fitcore.in",  status: "active",  joined: "Aug 2023", rating: 4.5, avatar: "DN" },
  { id: 5, name: "Aakash Singh",    role: "Personal Trainer",  outlet: "Chennai East",    phone: "+91 54321 55555", email: "aakash@fitcore.in", status: "inactive",joined: "Sep 2022", rating: 4.2, avatar: "AS" },
  { id: 6, name: "Sneha Reddy",     role: "Manager",           outlet: "Hyderabad West",  phone: "+91 43210 66666", email: "sneha@fitcore.in",  status: "active",  joined: "Oct 2022", rating: 4.7, avatar: "SR" },
];

const roleColors: Record<string, string> = {
  "Head Trainer":    "bg-primary-light text-primary",
  "Yoga Instructor": "bg-success-bg text-success",
  "Nutrition Coach": "bg-warning-bg text-warning",
  "Receptionist":    "bg-blue-50 text-blue-600",
  "Personal Trainer":"bg-purple-50 text-primary",
  "Manager":         "bg-red-50 text-destructive",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 text-warning fill-warning" />
      <span className="text-xs font-bold text-foreground">{rating}</span>
    </div>
  );
}

export default function StaffsPage() {
  const [view, setView] = useState<"grid"|"list">("grid");
  const [showModal, setShowModal] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Staff Management</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Manage gym trainers and staff members</p>
        </div>
        <div className="flex items-center gap-2">
          {!isMobile && (
            <div className="flex bg-muted rounded-xl p-1">
              {(["grid","list"] as const).map(v => (
                <button key={v} onClick={() => setView(v)} className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all capitalize", (view === v || (isMobile && v === "grid")) ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
                  {v}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setShowModal(true)} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 purple-gradient text-white text-sm font-bold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all">
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-up stagger-1">
        {[
          { label: "Total Staff",    value: staffList.length },
          { label: "Active",         value: staffList.filter(s => s.status === "active").length },
          { label: "Avg Rating",     value: (staffList.reduce((s,m) => s + m.rating, 0) / staffList.length).toFixed(1) },
          { label: "Outlets",        value: new Set(staffList.map(s => s.outlet)).size },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl px-4 py-3 sm:py-4 shadow-sm">
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="text-lg sm:text-2xl font-extrabold text-foreground mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      {(view === "grid" || isMobile) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 animate-fade-up stagger-2">
          {staffList.map((staff, i) => (
            <div key={staff.id} className={cn("bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all active:scale-[0.99]")}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 purple-gradient rounded-2xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-purple-sm">
                  {staff.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-foreground truncate text-sm sm:text-base">{staff.name}</p>
                    <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full ml-2 shrink-0 uppercase tracking-tight", staff.status === "active" ? "bg-success-bg text-success" : "bg-muted text-muted-foreground")}>
                      {staff.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-lg mt-1.5 inline-block uppercase tracking-wider", roleColors[staff.role] || "bg-muted text-muted-foreground")}>
                    {staff.role}
                  </span>
                </div>
              </div>
              <div className="space-y-2.5 mb-5 py-4 border-y border-border/50">
                <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium text-muted-foreground">
                  <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center shrink-0">
                     <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{staff.outlet}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium text-muted-foreground">
                  <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center shrink-0">
                     <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium text-muted-foreground">
                  <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center shrink-0">
                     <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{staff.email}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <StarRating rating={staff.rating} />
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-light text-primary hover:bg-primary hover:text-white transition-all text-[11px] font-bold">
                     <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="p-2 rounded-xl bg-red-50 text-destructive/80 hover:bg-destructive hover:text-white transition-all">
                     <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-up stagger-2 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-[hsl(var(--background-secondary))]">
                  {["Staff","Role","Outlet","Phone","Rating","Status","Actions"].map(h => (
                    <th key={h} className="text-xs font-bold text-muted-foreground uppercase tracking-wide px-4 py-4 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffList.map(staff => (
                  <tr key={staff.id} className="border-b border-border last:border-0 hover:bg-[hsl(var(--background-secondary))] transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 purple-gradient rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-purple-sm">{staff.avatar}</div>
                        <p className="text-sm font-semibold text-foreground whitespace-nowrap">{staff.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider", roleColors[staff.role] || "bg-muted text-muted-foreground")}>{staff.role}</span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-muted-foreground whitespace-nowrap">{staff.outlet}</td>
                    <td className="px-4 py-4 text-sm font-medium text-muted-foreground whitespace-nowrap">{staff.phone}</td>
                    <td className="px-4 py-4"><StarRating rating={staff.rating} /></td>
                    <td className="px-4 py-4">
                      <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tight", staff.status === "active" ? "bg-success-bg text-success" : "bg-muted text-muted-foreground")}>
                        {staff.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-xl hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-fade-up sm:animate-scale-in">
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6 sm:hidden" onClick={() => setShowModal(false)} />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Add New Staff</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground hidden sm:block">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar px-1">
              {[["Full Name","text"],["Phone","tel"],["Email","email"]].map(([l,t]) => (
                <div key={l}>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">{l}</label>
                  <input type={t} placeholder={`Enter ${l.toLowerCase()}`} className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all" />
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Role</label>
                  <select className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all">
                    <option>Head Trainer</option><option>Personal Trainer</option><option>Yoga Instructor</option><option>Nutrition Coach</option><option>Receptionist</option><option>Manager</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Outlet</label>
                  <select className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary text-foreground transition-all">
                    <option>Mumbai Central</option><option>Delhi North</option><option>Bangalore South</option><option>Chennai East</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pb-4 sm:pb-0">
              <button onClick={() => setShowModal(false)} className="order-2 sm:order-1 flex-1 py-3 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-all">Cancel</button>
              <button onClick={() => setShowModal(false)} className="order-1 sm:order-2 flex-1 py-3 rounded-xl purple-gradient text-white text-sm font-bold shadow-purple-sm hover:opacity-90 transition-all">Add Staff</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
