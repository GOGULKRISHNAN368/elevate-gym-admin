import { Bell, Shield, Palette, Building2, Globe, CreditCard, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { icon: Building2, label: "Gym Profile",        desc: "Update gym name, logo, address" },
  { icon: Bell,      label: "Notifications",       desc: "Email, SMS and push alerts" },
  { icon: Shield,    label: "Security",            desc: "Password, 2FA, sessions" },
  { icon: Palette,   label: "Appearance",          desc: "Theme, colors, branding" },
  { icon: Globe,     label: "Language & Region",   desc: "Timezone, currency, locale" },
  { icon: CreditCard,label: "Billing & Plans",     desc: "Subscription, invoices, upgrade" },
];

export default function SettingsPage() {
  const [gymName, setGymName] = useState("FitCore Pro");
  const [email, setEmail]     = useState("admin@fitcore.in");
  const [phone, setPhone]     = useState("+91 98765 00000");
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });

  return (
    <div className="space-y-6 max-w-[900px]">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your gym portal settings</p>
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fade-up stagger-1">
        {sections.map((s, i) => (
          <button key={s.label} className={cn("flex items-center gap-3 bg-card border border-border rounded-2xl p-4 text-left hover:bg-[hsl(var(--background-secondary))] hover:border-primary/40 transition-all group animate-fade-up", `stagger-${i + 1}`)}>
            <div className="w-9 h-9 bg-primary-light rounded-xl flex items-center justify-center shrink-0">
              <s.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </button>
        ))}
      </div>

      {/* Gym Profile */}
      <div className="bg-card rounded-2xl border border-border p-6 animate-fade-up stagger-3">
        <h2 className="font-semibold text-foreground mb-5">Gym Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Gym Name",   value: gymName,  onChange: setGymName },
            { label: "Admin Email",value: email,    onChange: setEmail },
            { label: "Phone",      value: phone,    onChange: setPhone },
          ].map(f => (
            <div key={f.label} className={f.label === "Gym Name" ? "sm:col-span-2" : ""}>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{f.label}</label>
              <input
                value={f.value}
                onChange={e => f.onChange(e.target.value)}
                className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Address</label>
            <textarea rows={2} defaultValue="123, Fitness Hub, Andheri West, Mumbai – 400053" className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" />
          </div>
        </div>
        <button className="mt-5 px-5 py-2 purple-gradient text-white text-sm font-semibold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all">
          Save Changes
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl border border-border p-6 animate-fade-up stagger-4">
        <h2 className="font-semibold text-foreground mb-5">Notification Preferences</h2>
        <div className="space-y-4">
          {(Object.keys(notifications) as (keyof typeof notifications)[]).map(key => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground capitalize">{key === "push" ? "Push Notifications" : key.toUpperCase() + " Alerts"}</p>
                <p className="text-xs text-muted-foreground">
                  {key === "email" ? "Receive alerts via email" : key === "sms" ? "Receive SMS for renewals & dues" : "Browser push notifications"}
                </p>
              </div>
              <button
                onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                className={cn("w-11 h-6 rounded-full relative transition-colors", notifications[key] ? "bg-primary" : "bg-muted")}
              >
                <span className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200", notifications[key] ? "translate-x-5" : "translate-x-0.5")} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-2xl border border-destructive/20 p-6 animate-fade-up stagger-5">
        <h2 className="font-semibold text-destructive mb-2">Danger Zone</h2>
        <p className="text-xs text-muted-foreground mb-4">These actions are permanent and cannot be undone.</p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-red-50 border border-red-200 text-destructive text-sm font-semibold rounded-xl hover:bg-red-100 transition-colors">
            Reset All Data
          </button>
          <button className="px-4 py-2 bg-red-50 border border-red-200 text-destructive text-sm font-semibold rounded-xl hover:bg-red-100 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
