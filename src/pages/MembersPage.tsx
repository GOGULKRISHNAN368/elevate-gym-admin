import { useState } from "react";
import { Search, Plus, MoreHorizontal, Filter, Edit2, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const members = [
  { id: 1, name: "Priya Sharma",    phone: "+91 98765 43210", plan: "Elite Monthly",   status: "active",   joined: "Jan 12, 2025", expiry: "Jun 12, 2025",  avatar: "PS" },
  { id: 2, name: "Rahul Verma",     phone: "+91 87654 32109", plan: "Basic Annual",    status: "active",   joined: "Feb 3, 2025",  expiry: "Feb 3, 2026",   avatar: "RV" },
  { id: 3, name: "Ananya Patel",    phone: "+91 76543 21098", plan: "Premium Monthly", status: "expiring", joined: "Mar 1, 2025",  expiry: "Jun 1, 2025",   avatar: "AP" },
  { id: 4, name: "Karan Singh",     phone: "+91 65432 10987", plan: "Elite Annual",    status: "active",   joined: "Nov 20, 2024", expiry: "Nov 20, 2025",  avatar: "KS" },
  { id: 5, name: "Meera Nair",      phone: "+91 54321 09876", plan: "Basic Monthly",   status: "expired",  joined: "Dec 5, 2024",  expiry: "May 5, 2025",   avatar: "MN" },
  { id: 6, name: "Vikram Iyer",     phone: "+91 43210 98765", plan: "Premium Annual",  status: "active",   joined: "Jan 8, 2025",  expiry: "Jan 8, 2026",   avatar: "VI" },
  { id: 7, name: "Sunita Rao",      phone: "+91 32109 87654", plan: "Elite Monthly",   status: "expiring", joined: "Apr 10, 2025", expiry: "Jun 10, 2025",  avatar: "SR" },
  { id: 8, name: "Ajay Kapoor",     phone: "+91 21098 76543", plan: "Basic Annual",    status: "active",   joined: "Mar 15, 2025", expiry: "Mar 15, 2026",  avatar: "AK" },
];

const statusConfig = {
  active:   { label: "Active",   className: "bg-success-bg text-success" },
  expiring: { label: "Expiring", className: "bg-warning-bg text-warning" },
  expired:  { label: "Expired",  className: "bg-red-50 text-destructive" },
};

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.phone.includes(search);
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Members</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage gym members and memberships</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 purple-gradient text-white text-sm font-semibold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-up stagger-1">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {["all","active","expiring","expired"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors",
                filterStatus === s ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-muted"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-up stagger-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-[hsl(var(--background-secondary))]">
                {["Member","Phone","Plan","Joined","Expiry","Status","Actions"].map(h => (
                  <th key={h} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => {
                const sc = statusConfig[m.status as keyof typeof statusConfig];
                return (
                  <tr key={m.id} className="border-b border-border last:border-0 hover:bg-[hsl(var(--background-secondary))] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 purple-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {m.avatar}
                        </div>
                        <span className="text-sm font-medium text-foreground whitespace-nowrap">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{m.phone}</td>
                    <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{m.plan}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{m.joined}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{m.expiry}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", sc.className)}>{sc.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {members.length} members</p>
          <div className="flex gap-1">
            {[1,2,3].map(p => (
              <button key={p} className={cn("w-7 h-7 rounded-lg text-xs font-medium", p === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-purple p-6 w-full max-w-lg animate-scale-in">
            <h2 className="text-lg font-bold text-foreground mb-5">Add New Member</h2>
            <div className="grid grid-cols-2 gap-4">
              {[["Full Name","text"],["Phone Number","tel"],["Email","email"],["Date of Birth","date"]].map(([label, type]) => (
                <div key={label} className={label === "Full Name" ? "col-span-2" : ""}>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
                  <input type={type} placeholder={`Enter ${label.toLowerCase()}`} className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Plan</label>
                <select className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground">
                  <option>Basic Monthly</option><option>Premium Monthly</option><option>Elite Monthly</option><option>Basic Annual</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Start Date</label>
                <input type="date" className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl purple-gradient text-white text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all">Add Member</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
