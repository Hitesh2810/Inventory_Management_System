"use client";

import Link from "next/link";
import { FaBoxes, FaClipboardList, FaTruck, FaUsers, FaChartLine, FaLock } from "react-icons/fa";

export default function AboutPage() {
  const features = [
    {
      title: "Product Management",
      description: "Manage inventory products with real-time stock updates.",
      icon: FaBoxes,
    },
    {
      title: "Order Management",
      description: "Track and manage customer orders efficiently.",
      icon: FaClipboardList,
    },
    {
      title: "Supplier Management",
      description: "Maintain supplier information and procurement records.",
      icon: FaTruck,
    },
    {
      title: "Customer Management",
      description: "Manage users and customer accounts.",
      icon: FaUsers,
    },
    {
      title: "Sales Analytics",
      description: "Monitor revenue, sales performance, and business growth.",
      icon: FaChartLine,
    },
    {
      title: "Secure Dashboard",
      description: "Role-based access for admins and users.",
      icon: FaLock,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 py-16">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">About Inventory Management System</p>
            <h1 className="mt-4 text-5xl font-black text-white">About Inventory Management System</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">Smart Inventory Management for Modern Businesses</p>

            <p className="mt-6 max-w-3xl text-base text-slate-300">
              Inventory Management System (IMS) is a modern platform designed to help businesses efficiently manage products, inventory, customers, suppliers, orders, and sales from a centralized dashboard.
            </p>

            <p className="mt-4 max-w-3xl text-base text-slate-300">
              Our mission is to simplify inventory operations through a fast, secure, and user-friendly experience.
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white">Why Choose IMS?</h2>
              <ul className="mt-4 space-y-2 text-slate-200">
                <li>• Modern UI</li>
                <li>• Fast Performance</li>
                <li>• Real-Time Inventory Tracking</li>
                <li>• Secure User Authentication</li>
                <li>• Easy Order Management</li>
                <li>• Scalable Architecture</li>
              </ul>
            </div>
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-[#07101f]/80 p-8 shadow-xl shadow-cyan-900/20">
            <h2 className="text-2xl font-bold text-white">Features</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-1">
              {features.map(({ title, description, icon: Icon }) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="rounded-lg bg-cyan-400/10 p-3 text-cyan-200">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="text-sm text-slate-300">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-slate-400">
              <Link href="/" className="text-cyan-300 hover:underline">Back to Home</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
