"use client";

export default function SubscriptionPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-[20px] border border-white/6 bg-[#07112d]/60 p-6">
        <h1 className="text-3xl font-black">Subscription</h1>
        <p className="mt-2 text-slate-300">Choose a plan that fits your needs.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/6 p-6 text-center">
            <div className="text-lg font-semibold">Free</div>
            <div className="mt-4 text-3xl font-black">₹0</div>
            <div className="mt-4 text-slate-300">Basic features</div>
            <button className="mt-6 rounded-2xl bg-white/6 px-4 py-2">Current plan</button>
          </div>
          <div className="rounded-2xl border border-white/6 p-6 text-center bg-gradient-to-br from-cyan-600/10 to-purple-600/10">
            <div className="text-lg font-semibold">Premium</div>
            <div className="mt-4 text-3xl font-black">₹499</div>
            <div className="mt-4 text-slate-300">Everything included</div>
            <button className="mt-6 rounded-2xl bg-cyan-500 px-4 py-2 text-black font-semibold">Upgrade</button>
          </div>
          <div className="rounded-2xl border border-white/6 p-6 text-center">
            <div className="text-lg font-semibold">Enterprise</div>
            <div className="mt-4 text-3xl font-black">Contact</div>
            <div className="mt-4 text-slate-300">Custom solutions</div>
            <button className="mt-6 rounded-2xl bg-white/6 px-4 py-2">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
}
