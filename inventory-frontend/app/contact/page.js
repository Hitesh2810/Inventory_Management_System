"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import UserNavbar from "@/app/user/components/UserNavbar";

export default function ContactPage() {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadContactDefaults = setTimeout(() => {
      setRole(localStorage.getItem("role"));
      setForm((current) => ({
        ...current,
        name: localStorage.getItem("username") || "",
        email: localStorage.getItem("email") || "",
      }));
    }, 0);

    return () => clearTimeout(loadContactDefaults);
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      await axios.post("http://127.0.0.1:8000/api/contact-messages/", form);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setStatus("Message submitted successfully.");
    } catch (error) {
      setStatus(error.response?.data?.error || "Unable to submit message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white px-4 py-16">
      {role === "user" ? <UserNavbar /> : null}
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Contact Us</p>
            <h1 className="mt-4 text-5xl font-black text-white">Get in touch with the Inventory Management team</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">Have a question about products, orders, support, or your account? Send us a message and we&apos;ll respond quickly.</p>
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
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <label className="block text-sm font-semibold text-slate-200">
                Full Name
                <input name="name" value={form.name} onChange={handleChange} type="text" required placeholder="Your name" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none" />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Email
                <input name="email" value={form.email} onChange={handleChange} type="email" required placeholder="you@example.com" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none" />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Phone Number
                <input name="phone" value={form.phone} onChange={handleChange} type="tel" required placeholder="+91 98765 43210" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none" />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Subject
                <input name="subject" value={form.subject} onChange={handleChange} type="text" required placeholder="Subject" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none" />
              </label>
              <label className="block text-sm font-semibold text-slate-200">
                Message
                <textarea name="message" value={form.message} onChange={handleChange} rows="5" required placeholder="How can we help?" className="mt-3 w-full rounded-3xl border border-white/10 bg-[#050816]/70 px-4 py-3 text-white outline-none" />
              </label>
              {status ? <p className="text-sm font-semibold text-cyan-200">{status}</p> : null}
              <button type="submit" disabled={submitting} className="w-full rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400">
                {submitting ? "Submitting..." : "Submit"}
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
