import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const enquiries = [
  { id: 1, name: "Rohit Mehta",    phone: "+91 91234 56789", category: "Membership",  followUp: "Jun 5, 2025",  status: "new",         avatar: "RM" },
  { id: 2, name: "Deepa Krishnan", phone: "+91 80123 45678", category: "Personal Training", followUp: "Jun 8, 2025", status: "contacted", avatar: "DK" },
  { id: 3, name: "Arun Desai",     phone: "+91 70012 34567", category: "Membership",  followUp: "Jun 10, 2025", status: "interested",  avatar: "AD" },
  { id: 4, name: "Nisha Gupta",    phone: "+91 60901 23456", category: "Yoga Classes",followUp: "Jun 12, 2025", status: "not_interested", avatar: "NG" },
  { id: 5, name: "Suresh Bhat",    phone: "+91 59890 12345", category: "Membership",  followUp: "Jun 15, 2025", status: "converted",   avatar: "SB" },
  { id: 6, name: "Kavita Joshi",   phone: "+91 48789 01234", category: "Nutrition",   followUp: "Jun 18, 2025", status: "new",         avatar: "KJ" },
];

const statusConfig = {
  new:            { label: "New",            className: "bg-primary-light text-primary" },
  contacted:      { label: "Contacted",      className: "bg-warning-bg text-warning" },
  interested:     { label: "Interested",     className: "bg-success-bg text-success" },
  not_interested: { label: "Not Interested", className: "bg-red-50 text-destructive" },
  converted:      { label: "Converted",      className: "bg-success-bg text-success font-bold" },
};

const months = ["All Months","January","February","March","April","May","June"];
const categories = ["All Categories","Membership","Personal Training","Yoga Classes","Nutrition"];

export default function EnquiriesPage() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("All Months");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filtered = enquiries.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.phone.includes(search);
    const matchCategory = category === "All Categories" || e.category === category;
    const matchStatus = status === "all" || e.status === status;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Enquiry Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track and manage gym enquiries</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 purple-gradient text-white text-sm font-semibold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Enquiry
        </button>
      </div>

      {/* Stats mini-row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up stagger-1">
        {[
          { label: "Total",    value: enquiries.length,     color: "text-primary" },
          { label: "New",      value: enquiries.filter(e => e.status === "new").length,        color: "text-primary" },
          { label: "Interested",value: enquiries.filter(e => e.status === "interested").length, color: "text-success" },
          { label: "Converted",value: enquiries.filter(e => e.status === "converted").length,  color: "text-success" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl px-4 py-3">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={cn("text-xl font-bold mt-0.5", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 animate-fade-up stagger-2">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or phone..."
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="px-3 py-2 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {months.map(m => <option key={m}>{m}</option>)}
        </select>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="px-3 py-2 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="px-3 py-2 bg-card border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="interested">Interested</option>
          <option value="not_interested">Not Interested</option>
          <option value="converted">Converted</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-up stagger-3">
        {filtered.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center">
              <Filter className="w-8 h-8 text-primary opacity-50" />
            </div>
            <p className="text-muted-foreground font-medium">No enquiries found</p>
            <p className="text-xs text-muted-foreground">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-[hsl(var(--background-secondary))]">
                  {["Name","Phone Number","Category","Follow-up Date","Status","Actions"].map(h => (
                    <th key={h} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => {
                  const sc = statusConfig[e.status as keyof typeof statusConfig];
                  return (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-[hsl(var(--background-secondary))] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 purple-gradient rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">{e.avatar}</div>
                          <span className="text-sm font-medium text-foreground whitespace-nowrap">{e.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{e.phone}</td>
                      <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap">{e.category}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{e.followUp}</td>
                      <td className="px-4 py-3">
                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", sc.className)}>{sc.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
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
        )}
        <div className="px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {enquiries.length} enquiries</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-purple p-6 w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground">Add Enquiry</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {[["Full Name","text"],["Phone Number","tel"],["Email","email"]].map(([l,t]) => (
                <div key={l}>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{l}</label>
                  <input type={t} placeholder={`Enter ${l.toLowerCase()}`} className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
                  <select className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground">
                    {categories.filter(c => c !== "All Categories").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Follow-up Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Notes</label>
                <textarea rows={2} placeholder="Additional notes..." className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl purple-gradient text-white text-sm font-semibold hover:opacity-90">Add Enquiry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
