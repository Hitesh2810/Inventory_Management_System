"use client";

import ThemedPageShell from "@/app/components/ThemedPageShell";
import { FaCog } from "react-icons/fa";
import { useState } from "react";

export default function SettingsPage() {
  const [siteName, setSiteName] = useState("Inventory Management System");
  const [currency, setCurrency] = useState("INR");

  return (
    <ThemedPageShell
      title="Settings"
      subtitle="Application and account settings"
      icon={FaCog}
    >
      <section className="mb-10 rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
            <FaCog size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-black">Settings</h1>
            <p className="mt-1 text-slate-300">Adjust application preferences and account-related settings.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-[#07112d]/80 p-6 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl">
        <form className="grid gap-4 max-w-xl">
          <label className="text-sm text-slate-300">Site Name</label>
          <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="ims-input" />

          <label className="text-sm text-slate-300">Default Currency</label>
          <input value={currency} onChange={(e) => setCurrency(e.target.value)} className="ims-input" />

          <div className="mt-4">
            <button type="button" className="ims-primary-btn">Save Settings</button>
          </div>
        </form>
      </section>
    </ThemedPageShell>
  );
}
