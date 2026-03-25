import { useState } from "react";
import { Plus, Receipt, TrendingDown, Filter, Edit2, Trash2, X, Building2, Tag, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

const expenses = [
  { id: 1, title: "Equipment Maintenance",   amount: 8500,  date: "Jun 1, 2025",  outlet: "Mumbai Central",  category: "Maintenance" },
  { id: 2, title: "Staff Salaries",          amount: 85000, date: "Jun 1, 2025",  outlet: "All Outlets",     category: "Salaries" },
  { id: 3, title: "Electricity Bill",        amount: 12000, date: "Jun 3, 2025",  outlet: "Mumbai Central",  category: "Utilities" },
  { id: 4, title: "Protein Supplement Stock",amount: 22000, date: "Jun 5, 2025",  outlet: "Delhi North",     category: "Inventory" },
  { id: 5, title: "Marketing Campaign",      amount: 15000, date: "Jun 8, 2025",  outlet: "All Outlets",     category: "Marketing" },
  { id: 6, title: "Internet & WiFi",         amount: 3500,  date: "Jun 10, 2025", outlet: "Bangalore South", category: "Utilities" },
  { id: 7, title: "New Treadmills (2x)",     amount: 48000, date: "Jun 12, 2025", outlet: "Mumbai Central",  category: "Equipment" },
  { id: 8, title: "Cleaning Supplies",       amount: 2800,  date: "Jun 14, 2025", outlet: "Chennai East",    category: "Maintenance" },
];

const monthlyData = [
  { month: "Jan", amount: 120000 }, { month: "Feb", amount: 95000 },
  { month: "Mar", amount: 135000 }, { month: "Apr", amount: 108000 },
  { month: "May", amount: 142000 }, { month: "Jun", amount: 197000 },
];

const categoryColor: Record<string, string> = {
  Maintenance: "bg-warning-bg text-warning",
  Salaries:    "bg-primary-light text-primary",
  Utilities:   "bg-blue-50 text-blue-600",
  Inventory:   "bg-success-bg text-success",
  Marketing:   "bg-red-50 text-destructive",
  Equipment:   "bg-purple-50 text-primary",
};

export default function ExpensesPage() {
  const [filterCat, setFilterCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const isMobile = useIsMobile();
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const filtered = filterCat === "All" ? expenses : expenses.filter(e => e.category === filterCat);
  const categories = ["All", ...Array.from(new Set(expenses.map(e => e.category)))];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Expenses</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Track and manage all gym expenses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 purple-gradient text-white text-sm font-semibold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 animate-fade-up stagger-1">
        <div className="stat-card p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
              <TrendingDown className="w-4 h-4 sm:w-5 h-5 text-destructive" />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Month</p>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-foreground">₹{total.toLocaleString()}</p>
        </div>
        <div className="stat-card p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4 sm:w-5 h-5 text-primary" />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">Entries</p>
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-foreground">{expenses.length}</p>
        </div>
        <div className="stat-card p-4 sm:p-5 hidden lg:flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-warning-bg rounded-xl flex items-center justify-center shrink-0">
              <Filter className="w-5 h-5 text-warning" />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">Categories</p>
          </div>
          <p className="text-2xl font-extrabold text-foreground">{categories.length - 1}</p>
        </div>
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Chart */}
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 animate-fade-up stagger-2 shadow-sm">
          <h2 className="font-bold text-foreground text-sm sm:text-base mb-4 sm:mb-6">Monthly Overview</h2>
          <div className="h-[180px] sm:h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barSize={isMobile ? 12 : 18} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip cursor={{fill: 'hsl(var(--muted)/0.3)'}} contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)", fontSize: 11, fontWeight: 600 }} />
                <Bar dataKey="amount" fill="hsl(0,84%,60%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border overflow-hidden animate-fade-up stagger-3 shadow-sm">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilterCat(c)}
                className={cn(
                  "flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                  filterCat === c ? "bg-primary text-primary-foreground shadow-purple-sm" : "text-muted-foreground hover:bg-muted"
                )}
              >{c}</button>
            ))}
          </div>
          
          {isMobile ? (
             <div className="divide-y divide-border/50">
                {filtered.map(e => (
                   <div key={e.id} className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                         <div>
                            <p className="text-sm font-bold text-foreground">{e.title}</p>
                            <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight mt-1 inline-block", categoryColor[e.category] || "bg-muted text-muted-foreground")}>
                               {e.category}
                            </span>
                         </div>
                         <p className="text-sm font-extrabold text-destructive">-₹{e.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                               <Calendar className="w-3 h-3 text-muted-foreground" />
                               <span className="text-[11px] font-medium text-muted-foreground">{e.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                               <Building2 className="w-3 h-3 text-muted-foreground" />
                               <span className="text-[11px] font-medium text-muted-foreground">{e.outlet}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-1">
                            <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary transition-all"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button className="p-2 rounded-lg bg-red-50 text-destructive/80 hover:text-destructive transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-[hsl(var(--background-secondary))]">
                    {["Title","Amount","Date","Outlet","Category","Actions"].map(h => (
                      <th key={h} className="text-xs font-bold text-muted-foreground uppercase tracking-wide px-4 py-4 text-left whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(e => (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-[hsl(var(--background-secondary))] transition-colors">
                      <td className="px-4 py-4 text-sm font-semibold text-foreground whitespace-nowrap">{e.title}</td>
                      <td className="px-4 py-4 text-sm font-bold text-destructive whitespace-nowrap">-₹{e.amount.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">{e.date}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground whitespace-nowrap">{e.outlet}</td>
                      <td className="px-4 py-4">
                        <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-tight", categoryColor[e.category] || "bg-muted text-muted-foreground")}>{e.category}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-primary-light text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-fade-up sm:animate-scale-in">
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6 sm:hidden" onClick={() => setShowModal(false)} />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Add New Expense</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground hidden sm:block">
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar px-1">
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Expense Title</label>
                <input type="text" placeholder="e.g. Equipment Maintenance" className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Amount (₹)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Date</label>
                  <input type="date" className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Category</label>
                  <select className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all">
                    <option>Maintenance</option><option>Salaries</option><option>Utilities</option><option>Inventory</option><option>Marketing</option><option>Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Outlet</label>
                  <select className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all">
                    <option>Mumbai Central</option><option>Delhi North</option><option>Bangalore South</option><option>Chennai East</option><option>All Outlets</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pb-4 sm:pb-0">
              <button onClick={() => setShowModal(false)} className="order-2 sm:order-1 flex-1 py-3 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-all">Cancel</button>
              <button onClick={() => setShowModal(false)} className="order-1 sm:order-2 flex-1 py-3 rounded-xl purple-gradient text-white text-sm font-bold shadow-purple-sm hover:opacity-90 transition-all">Add Expense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
