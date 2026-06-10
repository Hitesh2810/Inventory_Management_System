"use client";

export default function StatCard({ title, value, icon, accent }) {
  return (
    <div className="rounded-2xl border border-white/6 bg-gradient-to-br from-white/6 to-transparent p-5 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-slate-300">{title}</div>
          <div className="text-2xl font-black mt-2">{value}</div>
        </div>
        <div className={`h-12 w-12 rounded-xl ${accent} grid place-items-center text-white shadow-md`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
