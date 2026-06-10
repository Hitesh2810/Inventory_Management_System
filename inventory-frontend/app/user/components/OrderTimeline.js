"use client";

export default function OrderTimeline({ status }) {
  const steps = ["Pending", "Processing", "Shipped", "Delivered"];

  return (
    <div className="mt-3">
      <div className="flex items-center gap-4">
        {steps.map((s) => {
          const done = steps.indexOf(s) <= steps.indexOf(status || "Pending");
          return (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${done ? "bg-emerald-300" : "bg-white/6"}`} />
              <div className={`text-xs ${done ? "text-slate-200" : "text-slate-400"}`}>{s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
