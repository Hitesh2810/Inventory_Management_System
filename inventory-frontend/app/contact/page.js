"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserNavbar from "@/app/user/components/UserNavbar";

export default function ContactPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 py-16">
      {role === "user" ? <UserNavbar /> : null}
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Contact Us</p>
            <h1 className="mt-4 text-5xl font-black text-white">Get in touch with the Inventory Management team</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">Have a question about products, orders, support, or your account? Send us a message and we'll respond quickly.</p>
            <div className="mt-8 space-y-4 rounded-[28px] border border-white/10 bg-[#050816]/80 p-6">
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="mt-2 text-lg font-semibold text-white">support@inventoryapp.com</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Phone</p>
                <p className="mt-2 text-lg font-semibold text-white">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Location</p>
                <p className="mt-2 text-lg font-semibold text-white">Bangalore, India</p>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#07101f]/80 p-8 shadow-xl shadow-cyan-900/20">
            <h2 className="text-2xl font-bold text-white">Send a Message</h2>
            <form className="mt-6 space-y-5">
              <label className="block text-sm font-semibold text-slate-200">
                Name
                <input type="text" placeholder="Your name" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none" />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Email
                <input type="email" placeholder="you@example.com" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none" />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Message
                <textarea rows="5" placeholder="How can we help?" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none" />
              </label>
              <button type="button" className="w-full rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-slate-400">
          <Link href="/" className="text-cyan-300 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
