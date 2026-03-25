import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, Filter, Phone, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const filtered = enquiries.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.phone.includes(search);
    const matchCategory = category === "All Categories" || e.category === category;
    const matchStatus = status === "all" || e.status === status;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Enquiries</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Track and manage gym enquiries</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 purple-gradient text-white text-sm font-semibold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Enquiry
        </button>
      </div>

      {/* Stats mini-row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-up stagger-1">
        {[
          { label: "Total",    value: enquiries.length,     color: "text-primary", bg: "bg-primary-light" },
          { label: "New",      value: enquiries.filter(e => e.status === "new").length,        color: "text-primary", bg: "bg-primary-light" },
          { label: "Interested",value: enquiries.filter(e => e.status === "interested").length, color: "text-success", bg: "bg-success-bg" },
          { label: "Converted",value: enquiries.filter(e => e.status === "converted").length,  color: "text-success", bg: "bg-success-bg" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl px-4 py-3 sm:py-4 shadow-sm">
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className={cn("text-lg sm:text-2xl font-extrabold mt-0.5", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 animate-fade-up stagger-2">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or phone..."
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
           <div className="flex-shrink-0 flex items-center gap-2">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary h-[36px]"
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary h-[36px]"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="interested">Interested</option>
                <option value="converted">Converted</option>
              </select>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="animate-fade-up stagger-3">
        {isMobile ? (
          <div className="space-y-3">
            {filtered.map((e) => {
              const sc = statusConfig[e.status as keyof typeof statusConfig];
              return (
                <div key={e.id} className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 purple-gradient rounded-xl flex items-center justify-center text-white text-xs font-bold">
                        {e.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{e.name}</p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {e.phone}
                        </p>
                      </div>
                    </div>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter", sc.className)}>
                      {sc.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-border/50">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[9px] text-muted-foreground uppercase font-bold flex items-center gap-1"><Tag className="w-2.5 h-2.5" /> Category</p>
                      <p className="text-xs font-semibold text-foreground">{e.category}</p>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <p className="text-[9px] text-muted-foreground uppercase font-bold flex items-center justify-end gap-1"><Calendar className="w-2.5 h-2.5" /> Follow-up</p>
                      <p className="text-xs font-semibold text-foreground">{e.followUp}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <button className="flex-1 py-2 rounded-xl bg-muted text-muted-foreground hover:text-primary transition-all flex items-center justify-center gap-2 text-[11px] font-bold tracking-tight">
                       <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-red-50 text-destructive/80 hover:text-destructive transition-all flex items-center justify-center gap-2 text-[11px] font-bold tracking-tight">
                       <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-[hsl(var(--background-secondary))]">
                  {["Name","Category","Follow-up","Status","Actions"].map(h => (
                    <th key={h} className="text-xs font-bold text-muted-foreground uppercase tracking-wide px-4 py-4 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => {
                  const sc = statusConfig[e.status as keyof typeof statusConfig];
                  return (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-[hsl(var(--background-secondary))] transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 purple-gradient rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0">{e.avatar}</div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{e.name}</p>
                            <p className="text-[11px] text-muted-foreground">{e.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground font-medium">{e.category}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{e.followUp}</td>
                      <td className="px-4 py-4">
                        <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-tight", sc.className)}>{sc.label}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-2 rounded-lg hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-4 py-4 border-t border-border mt-2">
          <p className="text-[11px] font-medium text-muted-foreground">Showing {filtered.length} of {enquiries.length} enquiries</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-fade-up sm:animate-scale-in">
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6 sm:hidden" onClick={() => setShowModal(false)} />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Add New Enquiry</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground hidden sm:block">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar px-1">
              {[["Full Name","text"],["Phone Number","tel"],["Email","email"]].map(([l,t]) => (
                <div key={l}>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">{l}</label>
                  <input type={t} placeholder={`Enter ${l.toLowerCase()}`} className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all" />
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Category</label>
                  <select className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all">
                    {categories.filter(c => c !== "All Categories").map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Follow-up Date</label>
                  <input type="date" className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Notes</label>
                <textarea rows={2} placeholder="Additional notes..." className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground resize-none transition-all" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pb-4 sm:pb-0">
              <button onClick={() => setShowModal(false)} className="order-2 sm:order-1 flex-1 py-3 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-all">Cancel</button>
              <button onClick={() => setShowModal(false)} className="order-1 sm:order-2 flex-1 py-3 rounded-xl purple-gradient text-white text-sm font-bold shadow-purple-sm hover:opacity-90 transition-all">Add Enquiry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
