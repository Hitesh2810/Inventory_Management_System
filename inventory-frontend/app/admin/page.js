"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", formData);

      if (res.data.role !== "admin") {
        toast.error("This login is for administrators only.");
        return;
      }

      localStorage.setItem("role", "admin");
      localStorage.setItem("username", res.data.username);

      toast.success("Admin login successful");
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#081021] text-white flex items-center justify-center px-4 py-16">
      <Toaster />
      <div className="w-full max-w-4xl rounded-[32px] border border-white/10 bg-[#0b1224]/90 p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/90">Admin Portal</p>
            <h1 className="mt-4 text-5xl font-black text-white">Inventory Management Admin</h1>
            <p className="mt-4 max-w-xl text-slate-300">Secure admin access for inventory control, user management, orders, and sales reporting.</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-lg shadow-cyan-900/20">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">Admin Login</p>
            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold text-slate-200">
                Username
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Password
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                />
              </label>
              <button type="submit" className="w-full rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Login as Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
