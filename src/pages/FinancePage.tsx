import { TrendingUp, TrendingDown, DollarSign, Users, RefreshCw, UserPlus } from "lucide-react";
import { AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

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
  { label: "Total Income",    value: "₹14.72L", change: "+18.3%", up: true,  icon: TrendingUp,  color: "text-success",    bg: "bg-success-bg" },
  { label: "Total Expenses",  value: "₹7.97L",  change: "+6.1%",  up: false, icon: TrendingDown,color: "text-destructive", bg: "bg-red-50" },
  { label: "Net Profit",      value: "₹6.75L",  change: "+32%",   up: true,  icon: DollarSign,  color: "text-primary",    bg: "bg-primary-light" },
  { label: "Total Renewals",  value: "349",      change: "+11%",   up: true,  icon: RefreshCw,   color: "text-warning",    bg: "bg-warning-bg" },
  { label: "Total Admissions",value: "189",      change: "+22%",   up: true,  icon: UserPlus,    color: "text-success",    bg: "bg-success-bg" },
  { label: "Active Members",  value: "892",      change: "+8%",    up: true,  icon: Users,       color: "text-primary",    bg: "bg-primary-light" },
];

export default function FinancePage() {
  const totalIncome   = monthlyData.reduce((s, m) => s + m.income, 0);
  const totalExpenses = monthlyData.reduce((s, m) => s + m.expenses, 0);
  const profitMargin  = (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Financial overview across all outlets</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((k, i) => (
          <div key={k.label} className={cn("stat-card animate-fade-up", `stagger-${i + 1}`)}>
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", k.bg)}>
              <k.icon className={cn("w-5 h-5", k.color)} />
            </div>
            <p className="text-lg font-bold text-foreground leading-tight">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5 mb-2">{k.label}</p>
            <span className={cn("text-xs font-semibold", k.up ? "text-success" : "text-destructive")}>{k.change}</span>
          </div>
        ))}
      </div>

      {/* Profit Margin Banner */}
      <div className="purple-gradient rounded-2xl p-6 text-white flex items-center justify-between animate-fade-up stagger-3">
        <div>
          <p className="text-sm font-medium text-white/80">Profit Margin (YTD)</p>
          <p className="text-4xl font-bold mt-1">{profitMargin}%</p>
          <p className="text-sm text-white/70 mt-1">Based on ₹{(totalIncome/100000).toFixed(2)}L income vs ₹{(totalExpenses/100000).toFixed(2)}L expenses</p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-sm text-white/80">Net Profit</p>
          <p className="text-3xl font-bold">₹{((totalIncome - totalExpenses)/100000).toFixed(2)}L</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 animate-fade-up stagger-4">
          <h2 className="font-semibold text-foreground mb-6">Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyData}>
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
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number, n: string) => [`₹${v.toLocaleString()}`, n]} contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="income"   name="Income"   stroke="hsl(142,71%,45%)" strokeWidth={2.5} fill="url(#incGrad)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(0,84%,60%)"   strokeWidth={2.5} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown Pie */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-fade-up stagger-5">
          <h2 className="font-semibold text-foreground mb-6">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {expenseBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {expenseBreakdown.map(e => (
              <div key={e.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                  <span className="text-xs text-muted-foreground">{e.name}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">₹{e.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admissions & Renewals Chart */}
      <div className="bg-card rounded-2xl border border-border p-6 animate-fade-up stagger-6">
        <h2 className="font-semibold text-foreground mb-6">Admissions vs Renewals</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} barGap={4} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="admissions" name="New Admissions" fill="hsl(258,88%,66%)" radius={[4,4,0,0]} />
            <Bar dataKey="renewals"   name="Renewals"       fill="hsl(142,71%,45%)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
