"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBoxes,
  FaChartLine,
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaShippingFast,
} from "react-icons/fa";

const features = [
  {
    title: "Inventory Management",
    description: "Track products, stock movement, and availability with a clean user experience.",
    icon: FaBoxes,
  },
  {
    title: "Order Tracking",
    description: "Follow your orders from placement to completion with clear status updates.",
    icon: FaShippingFast,
  },
  {
    title: "Smart Insights",
    description: "Browse inventory confidently with organized product and order information.",
    icon: FaChartLine,
  },
  {
    title: "Secure Access",
    description: "Use a dedicated user portal designed around your account and activity.",
    icon: FaLock,
  },
];

const reasons = [
  "Real-time product browsing",
  "Simple order management",
  "Secure user account access",
  "Responsive ecommerce-style interface",
  "Fast checkout journey",
  "Modern inventory experience",
];

const footerLinks = [
  ["About Us", "/contact"],
  ["Contact Us", "/contact"],
  ["Privacy Policy", "/contact"],
  ["Terms & Conditions", "/contact"],
];

export default function UserHomePage() {
  return (
    <div className="min-h-[calc(100vh-110px)] overflow-hidden text-white">
      <section className="relative isolate overflow-hidden rounded-[36px] border border-white/10 bg-[#07101f] px-6 py-16 shadow-2xl shadow-cyan-900/40 sm:px-10 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.2),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_22%),radial-gradient(circle_at_bottom_left,_rgba(20,184,166,0.12),_transparent_26%)]" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mx-auto max-w-7xl"
        >
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-100 shadow-lg shadow-cyan-500/10">
              User Inventory Portal
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to Inventory Management System
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-200">
              Browse products, place orders, and manage your account from a modern user-first inventory experience.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/user/products"
                className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:bg-cyan-400"
              >
                Browse Products
              </Link>
              <Link
                href="/user/dashboard"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:text-cyan-200"
              >
                My Dashboard
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Features</p>
          <h2 className="mt-3 text-3xl font-black text-white">Powerful Features</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <motion.article
              key={title}
              whileHover={{ y: -4 }}
              className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-950/20 backdrop-blur-xl"
            >
              <div className="mb-5 inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-200 ring-1 ring-cyan-300/20">
                <Icon />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl rounded-[28px] border border-white/10 bg-[#07101f]/70 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/70">IMS Advantage</p>
          <h2 className="mt-3 text-3xl font-black text-white">Why Choose IMS</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
              <FaCheckCircle className="shrink-0 text-cyan-300" />
              <span className="text-sm font-semibold text-slate-100">{reason}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl rounded-[28px] border border-cyan-300/10 bg-cyan-400/10 p-8 shadow-2xl shadow-cyan-900/25 backdrop-blur-xl sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-black text-white">Ready to Explore Your Inventory?</h2>
            <p className="mt-3 max-w-2xl text-slate-200">Start browsing products, reviewing orders, and managing your account from one place.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/user/products"
              className="rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:bg-cyan-400"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:text-cyan-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-10 max-w-7xl border-t border-white/10 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-black text-white">Inventory Management System</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span className="inline-flex items-center gap-2">
                <FaEnvelope className="text-cyan-300" /> support@ims.com
              </span>
              <span className="inline-flex items-center gap-2">
                <FaPhoneAlt className="text-cyan-300" /> +91 98765 43210
              </span>
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
            {footerLinks.map(([label, href]) => (
              <Link key={label} href={href} className="transition hover:text-cyan-200">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
