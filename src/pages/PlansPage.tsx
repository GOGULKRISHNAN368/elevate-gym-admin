import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const toggleActive = (id: number) => {
    setPlanList(p => p.map(pl => pl.id === id ? { ...pl, active: !pl.active } : pl));
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-up">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Membership Plans</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Create and manage gym membership plans</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 purple-gradient text-white text-sm font-bold rounded-xl shadow-purple-sm hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4" /> Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-fade-up stagger-1">
        {planList.map((plan, i) => (
          <div key={plan.id} className={cn("bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-sm hover:shadow-md transition-all", !plan.active && "opacity-75")}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-bold text-foreground text-sm sm:text-base">{plan.name}</p>
                <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">{plan.duration} · {plan.admissions} Members</p>
              </div>
              <button
                onClick={() => toggleActive(plan.id)}
                className={cn(
                  "w-9 h-5 rounded-full relative transition-colors shrink-0",
                  plan.active ? "bg-success" : "bg-muted"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200",
                  plan.active ? "translate-x-4.5" : "translate-x-0.5"
                )} />
              </button>
            </div>

            {/* Price */}
            <div className="py-5 border-y border-border/50 mb-5">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground">₹{plan.price.toLocaleString()}</span>
              <span className="text-muted-foreground text-xs sm:text-sm font-medium"> /{plan.duration.toLowerCase()}</span>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-6 min-h-[140px]">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[11px] sm:text-xs font-medium text-muted-foreground">
                  <div className="w-4 h-4 rounded-full bg-success-bg flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-success" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-[11px] sm:text-xs font-bold text-muted-foreground hover:bg-muted transition-all active:scale-[0.98]">
                <Edit2 className="w-3.5 h-3.5" /> Edit Plan
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-border text-muted-foreground hover:bg-red-50 hover:text-destructive hover:border-red-200 transition-all active:scale-[0.98]">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {!plan.active && (
              <div className="mt-4 py-2 text-center text-[10px] font-bold text-muted-foreground bg-muted/50 rounded-xl uppercase tracking-widest border border-dashed border-border">
                Inactive Plan
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Plan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-fade-up sm:animate-scale-in">
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6 sm:hidden" onClick={() => setShowModal(false)} />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Create New Plan</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground hidden sm:block">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar px-1">
              {[["Plan Name","text"],["Duration (months)","number"],["Price (₹)","number"]].map(([label, type]) => (
                <div key={label}>
                  <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">{label}</label>
                  <input type={type} placeholder={`Enter ${label.toLowerCase()}`} className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground transition-all" />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block uppercase tracking-wider">Features (comma-separated)</label>
                <textarea rows={3} placeholder="Gym Access, Locker, Cardio Area..." className="w-full px-3 py-2.5 bg-muted/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground resize-none transition-all" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pb-4 sm:pb-0">
              <button onClick={() => setShowModal(false)} className="order-2 sm:order-1 flex-1 py-3 rounded-xl border border-border text-sm font-bold text-muted-foreground hover:bg-muted transition-all">Cancel</button>
              <button onClick={() => setShowModal(false)} className="order-1 sm:order-2 flex-1 py-3 rounded-xl purple-gradient text-white text-sm font-bold shadow-purple-sm hover:opacity-90 transition-all">Create Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
