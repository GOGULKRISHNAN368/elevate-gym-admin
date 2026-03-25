import { Bell, Shield, Palette, Building2, Globe, CreditCard, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const sections = [
  { icon: Building2, label: "Profile",   desc: "Gym details" },
  { icon: Bell,      label: "Alerts",    desc: "Notifications" },
  { icon: Shield,    label: "Security",  desc: "Password & 2FA" },
  { icon: Palette,   label: "Theme",     desc: "Branding" },
  { icon: Globe,     label: "Region",    desc: "Locale" },
  { icon: CreditCard,label: "Billing",   desc: "Plan" },
];

export default function SettingsPage() {
  const [gymName, setGymName] = useState("FitCore Pro");
  const [email, setEmail]     = useState("admin@fitcore.in");
  const [phone, setPhone]     = useState("+91 98765 00000");
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1000px]">
      <div className="animate-fade-up">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Portal Settings</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Manage your gym administrative preferences</p>
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 animate-fade-up stagger-1">
        {sections.map((s, i) => (
          <button key={s.label} className={cn("flex flex-col items-center sm:items-start gap-2 sm:gap-3 bg-card border border-border rounded-2xl p-3 sm:p-4 text-center sm:text-left hover:bg-[hsl(var(--background-secondary))] hover:border-primary/40 transition-all group animate-fade-up")}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-light rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
              <s.icon className="w-4 h-4 text-primary group-hover:text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] sm:text-sm font-bold text-foreground">{s.label}</p>
              {!isMobile && <p className="text-[10px] text-muted-foreground truncate">{s.desc}</p>}
            </div>
          </button>
        ))}
      </div>

      {/* Gym Profile */}
      <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 animate-fade-up stagger-2 shadow-sm">
        <h2 className="text-sm sm:text-base font-bold text-foreground mb-5 uppercase tracking-wider">Gym Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Gym Name",   value: gymName,  onChange: setGymName },
            { label: "Admin Email",value: email,    onChange: setEmail },
            { label: "Phone",      value: phone,    onChange: setPhone },
          ].map(f => (
            <div key={f.label} className={f.label === "Gym Name" ? "sm:col-span-2" : ""}>
              <label className="text-[10px] font-bold text-muted-foreground mb-1.5 block uppercase tracking-widest">{f.label}</label>
              <input
                value={f.value}
                onChange={e => f.onChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-[10px] font-bold text-muted-foreground mb-1.5 block uppercase tracking-widest">Address</label>
            <textarea rows={2} defaultValue="123, Fitness Hub, Andheri West, Mumbai – 400053" className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground resize-none transition-all" />
          </div>
        </div>
        <button className="mt-6 w-full sm:w-auto px-6 py-3 purple-gradient text-white text-sm font-bold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all">
          Save Profile Changes
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 animate-fade-up stagger-3 shadow-sm">
        <h2 className="text-sm sm:text-base font-bold text-foreground mb-5 uppercase tracking-wider">Alert Preferences</h2>
        <div className="space-y-4">
          {(Object.keys(notifications) as (keyof typeof notifications)[]).map(key => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0 last:pb-0">
              <div className="min-w-0 pr-4">
                <p className="text-sm font-bold text-foreground capitalize">{key === "push" ? "Push Alerts" : key.toUpperCase() + " Messaging"}</p>
                <p className="text-[11px] sm:text-xs font-medium text-muted-foreground mt-0.5">
                  {key === "email" ? "Receive alerts via email" : key === "sms" ? "Receive SMS for renewals & dues" : "Browser push notifications"}
                </p>
              </div>
              <button
                onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                className={cn("w-10 h-5.5 rounded-full relative transition-colors shrink-0", notifications[key] ? "bg-primary" : "bg-muted")}
              >
                <span className={cn("absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform duration-200", notifications[key] ? "translate-x-5" : "translate-x-0.5")} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-2xl border border-red-200 p-5 sm:p-6 animate-fade-up stagger-4 shadow-sm bg-red-50/10">
        <h2 className="text-sm sm:text-base font-bold text-destructive mb-2 uppercase tracking-wider">Danger Zone</h2>
        <p className="text-[11px] sm:text-xs font-medium text-muted-foreground mb-5">These actions are permanent and cannot be undone. Please be careful.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 px-4 py-3 bg-red-50 border border-red-200 text-destructive text-[11px] sm:text-xs font-bold rounded-xl hover:bg-destructive hover:text-white transition-all active:scale-[0.98]">
            Reset Portal Data
          </button>
          <button className="flex-1 px-4 py-3 bg-red-50 border border-red-200 text-destructive text-[11px] sm:text-xs font-bold rounded-xl hover:bg-destructive hover:text-white transition-all active:scale-[0.98]">
            Delete Gym Account
          </button>
        </div>
      </div>
    </div>
  );
}
