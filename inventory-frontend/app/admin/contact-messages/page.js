"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEnvelopeOpenText, FaEye, FaTrash } from "react-icons/fa";

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminContactMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  async function fetchMessages() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contact-messages/");
      const data = response.data.results || response.data || [];
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      router.push("/admin");
      return;
    }

    const loadMessages = setTimeout(fetchMessages, 0);
    return () => clearTimeout(loadMessages);
  }, [router]);

  async function markAsRead(message) {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/contact-messages/${message.id}/mark-read/`);
      setMessages((current) => current.map((item) => (item.id === message.id ? response.data : item)));
      setSelectedMessage((current) => (current?.id === message.id ? response.data : current));
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMessage(message) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/contact-messages/${message.id}/`);
      setMessages((current) => current.filter((item) => item.id !== message.id));
      setSelectedMessage((current) => (current?.id === message.id ? null : current));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-[#050b20] px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/70">Admin Dashboard</p>
            <h1 className="mt-3 text-4xl font-black">Contact Messages</h1>
          </div>
          <button onClick={() => router.push("/admin/dashboard")} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-slate-100 transition hover:bg-white/15">
            Back to Dashboard
          </button>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-white/10 bg-[#0b1b43]/75 shadow-xl shadow-black/20">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-white/[0.07] text-slate-300">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-4 font-bold text-white">{message.full_name}</td>
                  <td className="px-4 py-4 text-slate-300">{message.email}</td>
                  <td className="px-4 py-4 text-slate-300">{message.phone_number}</td>
                  <td className="px-4 py-4 text-slate-200">{message.subject}</td>
                  <td className="max-w-xs truncate px-4 py-4 text-slate-300">{message.message}</td>
                  <td className="px-4 py-4 text-slate-300">{formatDate(message.created_at)}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-md px-3 py-1 text-xs font-bold capitalize ${message.status === "read" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelectedMessage(message)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/10 text-cyan-100 transition hover:bg-white/15" title="View">
                        <FaEye />
                      </button>
                      <button onClick={() => markAsRead(message)} className="grid h-9 w-9 place-items-center rounded-lg border border-emerald-300/20 bg-emerald-400/10 text-emerald-100 transition hover:bg-emerald-400/15" title="Mark as Read">
                        <FaEnvelopeOpenText />
                      </button>
                      <button onClick={() => deleteMessage(message)} className="grid h-9 w-9 place-items-center rounded-lg border border-rose-300/20 bg-rose-400/10 text-rose-100 transition hover:bg-rose-400/15" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {messages.length === 0 ? (
            <div className="px-6 py-16 text-center text-slate-300">No contact messages yet.</div>
          ) : null}
        </div>

        {selectedMessage ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-[#071634]/80 p-6 shadow-xl shadow-black/20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black">{selectedMessage.subject}</h2>
                <p className="mt-2 text-sm text-slate-300">
                  {selectedMessage.full_name} | {selectedMessage.email} | {selectedMessage.phone_number}
                </p>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-slate-100 transition hover:bg-white/15">
                Close
              </button>
            </div>
            <p className="mt-5 whitespace-pre-line leading-7 text-slate-200">{selectedMessage.message}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
