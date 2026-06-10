"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserHomePage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "user") {
      router.push("/user/home");
      return;
    }

    if (role === "admin") {
      router.push("/admin");
      return;
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
              <Link href="/login" className="rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
                Login
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#07101f]/70 p-8 shadow-2xl shadow-cyan-900/20">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">User Home</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Use the login page to enter your dashboard.</h2>
            <p className="mt-4 text-slate-300">After login, you will get full access to your personalized dashboard including products, orders, and account tools.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
