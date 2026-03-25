import { Users, TrendingUp, DollarSign, MessageSquare, AlertTriangle, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const revenueData = [
  { month: "Jan", revenue: 42000, members: 120 },
  { month: "Feb", revenue: 48000, members: 135 },
  { month: "Mar", revenue: 45000, members: 128 },
  { month: "Apr", revenue: 55000, members: 152 },
  { month: "May", revenue: 62000, members: 168 },
  { month: "Jun", revenue: 58000, members: 160 },
  { month: "Jul", revenue: 71000, members: 185 },
  { month: "Aug", revenue: 68000, members: 178 },
];

const transactions = [
  { name: "Priya Sharma",    plan: "Elite Monthly",  amount: 3500,  type: "credit", time: "2m ago",  avatar: "PS" },
  { name: "Rahul Verma",     plan: "Basic Annual",   amount: 12000, type: "credit", time: "18m ago", avatar: "RV" },
  { name: "Ananya Patel",    plan: "Premium Monthly",amount: 5500,  type: "credit", time: "1h ago",  avatar: "AP" },
  { name: "Karan Singh",     plan: "Equipment Fee",  amount: 800,   type: "debit",  time: "2h ago",  avatar: "KS" },
  { name: "Meera Nair",      plan: "Elite Annual",   amount: 38000, type: "credit", time: "3h ago",  avatar: "MN" },
];

const expiringMembers = [
  { name: "Vikram Iyer",   plan: "Elite Monthly",   expires: "2 days",  avatar: "VI" },
  { name: "Sunita Rao",    plan: "Basic Monthly",   expires: "4 days",  avatar: "SR" },
  { name: "Ajay Kapoor",   plan: "Premium Monthly", expires: "6 days",  avatar: "AK" },
];

const stats = [
  { label: "Total Members",     value: "1,284",  change: "+12%",  up: true,  icon: Users,        color: "text-primary",   bg: "bg-primary-light" },
  { label: "Active Plans",      value: "892",    change: "+8%",   up: true,  icon: Activity,     color: "text-success",   bg: "bg-success-bg" },
  { label: "Today's Revenue",   value: "₹47,350",change: "+23%",  up: true,  icon: DollarSign,   color: "text-warning",   bg: "bg-warning-bg" },
  { label: "Pending Enquiries", value: "34",     change: "-5%",   up: false, icon: MessageSquare,color: "text-destructive",bg: "bg-red-50" },
];

export default function DashboardPage() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Welcome back, Aryan! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-inter">
        {stats.map((s, i) => (
          <div key={s.label} className={cn("stat-card animate-fade-up p-4 sm:p-6", `stagger-${i + 1}`)}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{s.label}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-foreground">{s.value}</p>
              </div>
              <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0", s.bg)}>
                <s.icon className={cn("w-4 h-4 sm:w-5 h-5", s.color)} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 sm:mt-4">
              {s.up
                ? <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-success" />
                : <ArrowDownRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-destructive" />
              }
              <span className={cn("text-[10px] sm:text-xs font-bold", s.up ? "text-success" : "text-destructive")}>{s.change}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">vs last mo</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-4 sm:p-6 animate-fade-up stagger-3">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="font-bold text-foreground text-sm sm:text-base">Revenue Overview</h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Monthly revenue for 2025</p>
            </div>
            <div className="flex gap-1 sm:gap-2">
              {["1M","3M","6M"].map(p => (
                <button key={p} className={cn(
                  "text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-lg font-bold transition-all",
                  p === "6M" ? "bg-primary text-primary-foreground shadow-purple-sm" : "text-muted-foreground hover:bg-muted"
                )}>{p}</button>
              ))}
            </div>
          </div>
          <div className="h-[180px] sm:h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(258,88%,66%)" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="hsl(258,88%,66%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)", fontSize: 11, fontWeight: 600, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(258,88%,66%)" strokeWidth={3} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Members Chart */}
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 animate-fade-up stagger-4">
          <div className="mb-4 sm:mb-6">
            <h2 className="font-bold text-foreground text-sm sm:text-base">Member Growth</h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">New members per month</p>
          </div>
          <div className="h-[180px] sm:h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barSize={isMobile ? 12 : 20} margin={{ left: -20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(220,9%,46%)", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'hsl(var(--muted)/0.3)'}} contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)", fontSize: 11, fontWeight: 600 }} />
                <Bar dataKey="members" fill="hsl(258,88%,66%)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-4 sm:p-6 animate-fade-up stagger-5">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="font-bold text-foreground text-sm sm:text-base">Recent Transactions</h2>
            <button className="text-[11px] sm:text-xs text-primary font-bold hover:underline uppercase tracking-tight">View All</button>
          </div>
          <div className="space-y-1 sm:space-y-2">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 purple-gradient rounded-xl flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-foreground truncate">{t.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{t.plan} · {t.time}</p>
                </div>
                <span className={cn("text-xs sm:text-sm font-bold", t.type === "credit" ? "text-success" : "text-destructive")}>
                  {t.type === "credit" ? "+" : "-"}₹{t.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expiring Memberships */}
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 animate-fade-up stagger-6">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h2 className="font-bold text-foreground text-sm sm:text-base">Expiring Soon</h2>
          </div>
          <div className="space-y-4">
            {expiringMembers.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-warning-bg rounded-xl flex items-center justify-center text-warning text-[10px] sm:text-xs font-bold shrink-0">
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-foreground truncate">{m.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{m.plan}</p>
                </div>
                <span className="text-[10px] font-bold text-warning bg-warning-bg px-2 py-0.5 rounded-full whitespace-nowrap uppercase tracking-tighter">
                  {m.expires}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-5 w-full py-2.5 text-xs sm:text-sm font-bold text-primary bg-primary-light rounded-xl hover:bg-primary-muted transition-all active:scale-[0.98] shadow-sm">
            Send Renewal Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
