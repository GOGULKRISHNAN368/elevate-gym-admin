import { useState } from "react";
import { Plus, Receipt, TrendingDown, Filter, Edit2, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const filtered = filterCat === "All" ? expenses : expenses.filter(e => e.category === filterCat);
  const categories = ["All", ...Array.from(new Set(expenses.map(e => e.category)))];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Expenses</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track and manage all gym expenses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 purple-gradient text-white text-sm font-semibold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up stagger-1">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-destructive" />
            </div>
            <p className="text-xs text-muted-foreground">Total This Month</p>
          </div>
          <p className="text-2xl font-bold text-foreground">₹{total.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-primary-light rounded-xl flex items-center justify-center">
              <Receipt className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Total Entries</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{expenses.length}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-warning-bg rounded-xl flex items-center justify-center">
              <Filter className="w-5 h-5 text-warning" />
            </div>
            <p className="text-xs text-muted-foreground">Categories</p>
          </div>
          <p className="text-2xl font-bold text-foreground">{categories.length - 1}</p>
        </div>
      </div>

      {/* Chart + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Chart */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-fade-up stagger-2">
          <h2 className="font-semibold text-foreground mb-4">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Expenses"]} contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)", fontSize: 12 }} />
              <Bar dataKey="amount" fill="hsl(0,84%,60%)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border overflow-hidden animate-fade-up stagger-3">
          <div className="px-4 pt-4 pb-3 border-b border-border flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilterCat(c)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                  filterCat === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                )}
              >{c}</button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-[hsl(var(--background-secondary))]">
                  {["Title","Amount","Date","Outlet","Category","Actions"].map(h => (
                    <th key={h} className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 text-left whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-[hsl(var(--background-secondary))] transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground whitespace-nowrap">{e.title}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-destructive whitespace-nowrap">-₹{e.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{e.date}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">{e.outlet}</td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", categoryColor[e.category] || "bg-muted text-muted-foreground")}>{e.category}</span>
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-purple p-6 w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground">Add Expense</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Expense Title</label>
                <input type="text" placeholder="e.g. Equipment Maintenance" className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Amount (₹)</label>
                  <input type="number" placeholder="0" className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
                  <select className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground">
                    <option>Maintenance</option><option>Salaries</option><option>Utilities</option><option>Inventory</option><option>Marketing</option><option>Equipment</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Outlet</label>
                  <select className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground">
                    <option>Mumbai Central</option><option>Delhi North</option><option>Bangalore South</option><option>Chennai East</option><option>All Outlets</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl purple-gradient text-white text-sm font-semibold hover:opacity-90">Add Expense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
