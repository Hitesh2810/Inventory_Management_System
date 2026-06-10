"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert('Message sent'); };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-[20px] border border-white/6 bg-[#07112d]/60 p-6">
        <h1 className="text-3xl font-black">Contact Support</h1>
        <p className="mt-2 text-slate-300">We’re here to help — send a message and we’ll reply shortly.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="rounded-2xl bg-white/3 p-3 outline-none" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="rounded-2xl bg-white/3 p-3 outline-none" />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="rounded-2xl bg-white/3 p-3 outline-none h-32" />
          <div className="flex justify-end">
            <button className="rounded-2xl bg-cyan-500 px-4 py-2 font-semibold text-black">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}
