import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  { id: 1, name: "Basic Monthly",   duration: "1 Month",   price: 1200,  admissions: 64, active: true,  features: ["Gym Access","Locker","Cardio Area"] },
  { id: 2, name: "Premium Monthly", duration: "1 Month",   price: 2500,  admissions: 42, active: true,  features: ["Gym Access","Locker","Cardio Area","Personal Trainer","Sauna"] },
  { id: 3, name: "Elite Monthly",   duration: "1 Month",   price: 4000,  admissions: 28, active: true,  features: ["All Premium","Yoga Classes","Nutrition Plan","Priority Booking"] },
  { id: 4, name: "Basic Annual",    duration: "12 Months", price: 10800, admissions: 38, active: true,  features: ["Gym Access","Locker","Cardio Area","2 Months Free"] },
  { id: 5, name: "Premium Annual",  duration: "12 Months", price: 22000, admissions: 19, active: true,  features: ["All Premium","2 Months Free","Annual Health Check"] },
  { id: 6, name: "Elite Annual",    duration: "12 Months", price: 36000, admissions: 11, active: false, features: ["All Elite","3 Months Free","Exclusive Lounge"] },
];

export default function PlansPage() {
  const [planList, setPlanList] = useState(plans);
  const [showModal, setShowModal] = useState(false);

  const toggleActive = (id: number) => {
    setPlanList(p => p.map(pl => pl.id === id ? { ...pl, active: !pl.active } : pl));
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Plans</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Create and manage membership plans</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 purple-gradient text-white text-sm font-semibold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" /> Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {planList.map((plan, i) => (
          <div key={plan.id} className={cn("bg-card rounded-2xl border border-border p-6 animate-fade-up", `stagger-${i + 1}`)}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-foreground text-base">{plan.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{plan.duration} · {plan.admissions} members</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(plan.id)}
                  className={cn(
                    "w-10 h-5 rounded-full relative transition-colors",
                    plan.active ? "bg-success" : "bg-muted"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
                    plan.active ? "translate-x-5" : "translate-x-0.5"
                  )} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-border mb-4">
              <span className="text-3xl font-bold text-foreground">₹{plan.price.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm"> /{plan.duration.toLowerCase()}</span>
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-5">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors">
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button className="flex items-center justify-center w-9 h-9 rounded-xl border border-border text-muted-foreground hover:bg-red-50 hover:text-destructive hover:border-red-200 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {!plan.active && (
              <div className="mt-3 py-1.5 text-center text-xs font-medium text-muted-foreground bg-muted rounded-xl">
                Inactive Plan
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Plan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-purple p-6 w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-foreground">Create Plan</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {[["Plan Name","text"],["Duration (months)","number"],["Price (₹)","number"]].map(([label, type]) => (
                <div key={label}>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
                  <input type={type} placeholder={`Enter ${label.toLowerCase()}`} className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground" />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Features (comma-separated)</label>
                <textarea rows={3} placeholder="Gym Access, Locker, Cardio Area..." className="w-full px-3 py-2 bg-[hsl(var(--background-secondary))] border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl purple-gradient text-white text-sm font-semibold hover:opacity-90">Create Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
