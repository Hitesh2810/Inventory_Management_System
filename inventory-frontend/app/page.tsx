"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("role") === "user") {
      router.push("/user/home");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl rounded-[40px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">Inventory Management</p>
              <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
                Welcome to Inventory Management System
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-300">
                Manage products, orders and inventory efficiently with a premium futuristic interface designed for modern workflows.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/user/products" className="rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
                Browse Products
              </Link>
              <Link href="/user/orders" className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:border-cyan-400/40 hover:text-cyan-200">
                View Orders
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#07101f]/70 p-8 shadow-2xl shadow-cyan-900/20">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Welcome</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Start by logging in to access your dashboard.</h2>
            <p className="mt-4 text-slate-300">If you are a registered user, use the login page to continue to your personalized dashboard.</p>
            <Link href="/login" className="mt-8 inline-flex rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
