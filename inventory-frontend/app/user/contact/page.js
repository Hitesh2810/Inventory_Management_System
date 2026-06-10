"use client";

import { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      await axios.post("http://127.0.0.1:8000/api/contact-messages/", form);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setStatus("Message submitted successfully.");
    } catch (error) {
      setStatus(error.response?.data?.error || "Unable to submit message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-[20px] border border-white/6 bg-[#07112d]/60 p-6">
        <h1 className="text-3xl font-black">Contact Support</h1>
        <p className="mt-2 text-slate-300">We&apos;re here to help - send a message and we&apos;ll reply shortly.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="rounded-2xl bg-white/3 p-3 outline-none" />
          <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="rounded-2xl bg-white/3 p-3 outline-none" />
          <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number" className="rounded-2xl bg-white/3 p-3 outline-none" />
          <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Subject" className="rounded-2xl bg-white/3 p-3 outline-none" />
          <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Message" className="rounded-2xl bg-white/3 p-3 outline-none h-32" />
          {status ? <p className="text-sm font-semibold text-cyan-200">{status}</p> : null}
          <div className="flex justify-end">
            <button disabled={submitting} className="rounded-2xl bg-cyan-500 px-4 py-2 font-semibold text-black disabled:bg-slate-700 disabled:text-slate-300">
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
