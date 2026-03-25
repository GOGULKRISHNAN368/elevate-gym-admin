import { TrendingUp, TrendingDown, DollarSign, Users, RefreshCw, UserPlus } from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const monthlyData = [
  { month: "Jan", income: 185000, expenses: 120000, profit: 65000, renewals: 48, admissions: 22 },
  { month: "Feb", income: 204000, expenses: 95000,  profit: 109000,renewals: 54, admissions: 28 },
  { month: "Mar", income: 196000, expenses: 135000, profit: 61000, renewals: 51, admissions: 25 },
  { month: "Apr", income: 232000, expenses: 108000, profit: 124000,renewals: 62, admissions: 35 },
  { month: "May", income: 258000, expenses: 142000, profit: 116000,renewals: 69, admissions: 41 },
  { month: "Jun", income: 247000, expenses: 197000, profit: 50000, renewals: 65, admissions: 38 },
];

const expenseBreakdown = [
  { name: "Salaries",   value: 85000, color: "hsl(258,88%,66%)" },
  { name: "Equipment",  value: 48000, color: "hsl(142,71%,45%)" },
  { name: "Marketing",  value: 15000, color: "hsl(38,93%,51%)" },
  { name: "Utilities",  value: 15500, color: "hsl(0,84%,60%)" },
  { name: "Other",      value: 33500, color: "hsl(220,9%,70%)" },
];

const kpis = [
  { label: "Income",          value: "₹14.7L", change: "+18%", up: true,  icon: TrendingUp,  color: "text-success",    bg: "bg-success-bg" },
  { label: "Expenses",        value: "₹7.9L",  change: "+6%",  up: false, icon: TrendingDown,color: "text-destructive", bg: "bg-red-50" },
  { label: "Net Profit",      value: "₹6.7L",  change: "+32%", up: true,  icon: DollarSign,  color: "text-primary",    bg: "bg-primary-light" },
  { label: "Renewals",        value: "349",     change: "+11%", up: true,  icon: RefreshCw,   color: "text-warning",    bg: "bg-warning-bg" },
  { label: "Admissions",      value: "189",     change: "+22%", up: true,  icon: UserPlus,    color: "text-success",    bg: "bg-success-bg" },
  { label: "Active",          value: "892",     change: "+8%",  up: true,  icon: Users,       color: "text-primary",    bg: "bg-primary-light" },
];

export default function FinancePage() {
  const isMobile = useIsMobile();
  const totalIncome   = monthlyData.reduce((s, m) => s + m.income, 0);
  const totalExpenses = monthlyData.reduce((s, m) => s + m.expenses, 0);
  const profitMargin  = (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      <div className="animate-fade-up">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Finance Dashboard</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Financial overview across all outlets</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k, i) => (
          <div key={k.label} className={cn("stat-card p-4 flex flex-col justify-between shadow-sm animate-fade-up")}>
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center mb-3", k.bg)}>
              <k.icon className={cn("w-4 h-4", k.color)} />
            </div>
            <div>
              <p className="text-lg font-extrabold text-foreground leading-tight">{k.value}</p>
              <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">{k.label}</p>
            </div>
            <span className={cn("text-[10px] font-bold mt-2", k.up ? "text-success" : "text-destructive")}>{k.change} vs LY</span>
          </div>
        ))}
      </div>

      {/* Profit Margin Banner */}
      <div className="purple-gradient rounded-2xl p-5 sm:p-7 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-fade-up shadow-purple-sm">
        <div className="w-full sm:w-auto">
          <p className="text-xs sm:text-sm font-bold text-white/80 uppercase tracking-widest">Profit Margin (YTD)</p>
          <p className="text-4xl sm:text-5xl font-extrabold mt-2">{profitMargin}%</p>
          <p className="text-xs sm:text-sm text-white/70 mt-2 font-medium">Based on ₹{(totalIncome/100000).toFixed(1)}L income vs ₹{(totalExpenses/100000).toFixed(1)}L expenses</p>
        </div>
        <div className="text-right w-full sm:w-auto border-t sm:border-t-0 border-white/20 pt-4 sm:pt-0">
          <p className="text-xs sm:text-sm text-white/80 font-bold uppercase tracking-widest">Total Net Profit</p>
          <p className="text-2xl sm:text-4xl font-extrabold mt-1">₹{((totalIncome - totalExpenses)/100000).toFixed(2)}L</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-4 sm:p-6 animate-fade-up shadow-sm">
          <h2 className="font-bold text-foreground text-sm sm:text-base mb-6">Income vs Expenses</h2>
          <div className="h-[220px] sm:h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ left: -15, right: 10 }}>
                <defs>
                  <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142,71%,45%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(142,71%,45%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0,84%,60%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(0,84%,60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1 }} contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)", fontSize: 11, fontWeight: 600 }} />
                <Legend wrapperStyle={{ fontSize: 10, fontWeight: 600, paddingTop: 10 }} />
                <Area type="monotone" dataKey="income"   name="Income"   stroke="hsl(142,71%,45%)" strokeWidth={3} fill="url(#incGrad)" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(0,84%,60%)"   strokeWidth={3} fill="url(#expGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown Pie */}
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 animate-fade-up shadow-sm">
          <h2 className="font-bold text-foreground text-sm sm:text-base mb-6">Breakdown</h2>
          <div className="h-[180px] sm:h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={isMobile ? 50 : 45} outerRadius={isMobile ? 75 : 70} paddingAngle={4} dataKey="value">
                  {expenseBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: 12, fontSize: 11, fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-6">
            {expenseBreakdown.map(e => (
              <div key={e.name} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">{e.name}</span>
                </div>
                <span className="text-xs font-extrabold text-foreground">₹{e.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admissions & Renewals Chart */}
      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 animate-fade-up shadow-sm">
        <h2 className="font-bold text-foreground text-sm sm:text-base mb-6">Retention & Growth</h2>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} barGap={4} barSize={isMobile ? 12 : 20} margin={{ left: -25, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'hsl(var(--muted)/0.3)'}} contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)", fontSize: 11, fontWeight: 600 }} />
              <Legend wrapperStyle={{ fontSize: 10, fontWeight: 600, paddingTop: 10 }} />
              <Bar dataKey="admissions" name="Admissions" fill="hsl(258,88%,66%)" radius={[4,4,0,0]} />
              <Bar dataKey="renewals"   name="Renewals"   fill="hsl(142,71%,45%)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
