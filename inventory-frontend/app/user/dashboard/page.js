"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaBox,
  FaShoppingCart,
  FaChartLine,
  FaRupeeSign,
} from "react-icons/fa";
import StatCard from "../components/StatCard";
import { motion } from "framer-motion";

export default function UserDashboard() {

  const [username, setUsername] = useState("");

  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [growth, setGrowth] = useState(0);
  const router = useRouter();

const handleLogout = () => {

  localStorage.clear();

  router.push("/login");

};

useEffect(() => {

  const role = localStorage.getItem("role");

  if (!role) {
    router.push("/login");
    return;
  }

  setUsername(
    localStorage.getItem("username") || "User"
  );

  fetchDashboardData();

}, []);
  // FETCH DASHBOARD DATA
  const fetchDashboardData = async () => {

    try {

      // PRODUCTS
      const productsRes = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      );

      // ORDERS
      const ordersRes = await axios.get(
        "http://127.0.0.1:8000/api/orders/"
      );

      // SALES
      const salesRes = await axios.get(
        "http://127.0.0.1:8000/api/sales/"
      );

 setProductsCount(
  productsRes.data.results
    ? productsRes.data.results.length
    : productsRes.data.length
);

 setOrdersCount(
  ordersRes.data.results
    ? ordersRes.data.results.length
    : ordersRes.data.length
);

 setSalesCount(
  salesRes.data.results
    ? salesRes.data.results.length
    : salesRes.data.length
);
      // SIMPLE GROWTH %
const products =
  productsRes.data.results || productsRes.data;

const sales =
  salesRes.data.results || salesRes.data;

const growthPercent =
  products.length > 0
    ? Math.round(
        (sales.length / products.length) * 100
      )
    : 0;

      setGrowth(growthPercent);

    } catch (error) {
      console.log(error);
    }
  };

  

return (
  <div className="min-h-screen overflow-hidden">
    <div className="relative isolate overflow-hidden rounded-[40px] bg-[#07101f] px-6 py-14 shadow-2xl shadow-cyan-900/40 sm:px-10 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.18),_transparent_20%),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.14),_transparent_18%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.12),_transparent_22%)]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/20">Futuristic User Dashboard</div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Welcome to Inventory Management System</h1>
            <p className="max-w-2xl text-lg text-slate-300">Manage products, orders and inventory efficiently with a premium futuristic interface designed for modern workflows.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/user/products" className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]">Browse Products</Link>
              <Link href="/user/orders" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:text-cyan-200">View Orders</Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total Products</p>
                  <p className="text-3xl font-black text-white">{productsCount}</p>
                </div>
                <div className="rounded-3xl bg-cyan-500/15 px-4 py-3 text-cyan-200">{growth}%</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-[#050816]/70 p-5">
                  <p className="text-sm text-slate-400">Orders</p>
                  <p className="mt-3 text-2xl font-black text-white">{ordersCount}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#050816]/70 p-5">
                  <p className="text-sm text-slate-400">Estimated Spend</p>
                  <p className="mt-3 text-2xl font-black text-white">₹{salesCount * 100}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-10 max-w-7xl space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <StatCard title="Total Products" value={productsCount} icon={<FaBox />} accent="from-cyan-500 to-blue-600" />
        <StatCard title="Total Orders" value={ordersCount} icon={<FaShoppingCart />} accent="from-violet-500 to-purple-500" />
        <StatCard title="Total Spent" value={<span>₹{salesCount * 100}</span>} icon={<FaRupeeSign />} accent="from-emerald-400 to-teal-400" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[32px] border border-white/10 bg-[#07101f]/70 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Recent Orders</h2>
              <p className="mt-1 text-sm text-slate-400">Keep track of your latest order activity.</p>
            </div>
            <div className="rounded-full bg-cyan-500/15 px-3 py-2 text-sm font-semibold text-cyan-200">Live</div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[#050816]/80 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">#ORD-1001</p>
                  <p className="text-sm text-slate-500">2 items · 08 Jun 2026</p>
                </div>
                <span className="rounded-full bg-emerald-300/15 px-3 py-2 text-sm font-semibold text-emerald-200">Delivered</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#050816]/80 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">#ORD-1000</p>
                  <p className="text-sm text-slate-500">1 item · 07 Jun 2026</p>
                </div>
                <span className="rounded-full bg-amber-300/15 px-3 py-2 text-sm font-semibold text-amber-200">Processing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[#07101f]/70 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white">Profile</h2>
          <div className="mt-5 space-y-4 text-slate-300">
            <div>
              <div className="text-sm text-slate-400">Username</div>
              <div className="mt-1 text-lg font-semibold text-white">{username}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Subscription</div>
              <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-200">Free</div>
            </div>
            <button className="w-full rounded-3xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]">Manage Subscription</button>
          </div>
        </div>
      </div>
    </motion.section>
  </div>
);
}