import { useState } from "react";
import { Plus, UserCheck, Star, Phone, Mail, Edit2, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <span className="text-xs font-semibold text-foreground">{rating}</span>
    </div>
  );
}

export default function StaffsPage() {
  const [view, setView] = useState<"grid"|"list">("grid");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staffs</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage gym trainers and staff members</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted rounded-xl p-1">
            {(["grid","list"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={cn("px-3 py-1 rounded-lg text-xs font-medium transition-colors capitalize", view === v ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
                {v}
              </button>
            ))}
          </div>
          <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2 purple-gradient text-white text-sm font-semibold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all">
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up stagger-1">
        {[
          { label: "Total Staff",    value: staffList.length },
          { label: "Active",         value: staffList.filter(s => s.status === "active").length },
          { label: "Avg Rating",     value: (staffList.reduce((s,m) => s + m.rating, 0) / staffList.length).toFixed(1) },
          { label: "Outlets Covered",value: new Set(staffList.map(s => s.outlet)).size },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl px-4 py-3">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {staffList.map((staff, i) => (
            <div key={staff.id} className={cn("bg-card rounded-2xl border border-border p-5 animate-fade-up", `stagger-${i + 1}`)}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 purple-gradient rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {staff.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-foreground truncate">{staff.name}</p>
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full ml-2 shrink-0", staff.status === "active" ? "bg-success-bg text-success" : "bg-muted text-muted-foreground")}>
                      {staff.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block", roleColors[staff.role] || "bg-muted text-muted-foreground")}>
                    {staff.role}
                  </span>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{staff.outlet}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{staff.email}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <StarRating rating={staff.rating} />
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-up stagger-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-[hsl(var(--background-secondary))]">
                  {["Staff","Role","Outlet","Phone","Rating","Status","Actions"].map(h => (
                    <th key={h} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffList.map(staff => (
                  <tr key={staff.id} className="border-b border-border last:border-0 hover:bg-[hsl(var(--background-secondary))] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 purple-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">{staff.avatar}</div>
                        <p className="text-sm font-medium text-foreground whitespace-nowrap">{staff.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", roleColors[staff.role] || "bg-muted text-muted-foreground")}>{staff.role}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{staff.outlet}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{staff.phone}</td>
                    <td className="px-4 py-3"><StarRating rating={staff.rating} /></td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", staff.status === "active" ? "bg-success-bg text-success" : "bg-muted text-muted-foreground")}>
                        {staff.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-purple p-6 w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground">Add Staff</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {[["Full Name","text"],["Phone","tel"],["Email","email"]].map(([l,t]) => (
                <div key={l}>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{l}</label>
                  <input type={t} placeholder={`Enter ${l.toLowerCase()}`} className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Role</label>
                  <select className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground">
                    <option>Head Trainer</option><option>Personal Trainer</option><option>Yoga Instructor</option><option>Nutrition Coach</option><option>Receptionist</option><option>Manager</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Outlet</label>
                  <select className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground">
                    <option>Mumbai Central</option><option>Delhi North</option><option>Bangalore South</option><option>Chennai East</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl purple-gradient text-white text-sm font-semibold hover:opacity-90">Add Staff</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
