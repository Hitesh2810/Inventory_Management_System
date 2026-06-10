"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaEnvelopeOpenText, FaEye, FaSearch, FaTrash } from "react-icons/fa";

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

function statusLabel(status) {
  return status === "read" ? "Read" : "Unread";
}

export default function AdminContactUsPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [search, setSearch] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") || "" : ""
  );
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return messages.filter((message) => {
      const matchesSearch =
        !query ||
        message.name?.toLowerCase().includes(query) ||
        message.email?.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || message.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [messages, search, statusFilter]);

  async function updateStatus(message, status) {
    const action = status === "read" ? "mark-read" : "mark-unread";

    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/contact-messages/${message.id}/${action}/`);
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/70">Admin Dashboard</p>
            <h1 className="mt-3 text-4xl font-black">Contact Us</h1>
          </div>
          <button onClick={() => router.push("/admin/dashboard")} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm font-bold text-slate-100 transition hover:bg-white/15">
            Back to Dashboard
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-white/10 bg-[#071634]/80 p-4 shadow-xl shadow-black/20 md:flex-row md:items-center md:justify-between">
          <div className="flex min-h-11 flex-1 items-center gap-3 rounded-lg border border-white/10 bg-[#050b20]/80 px-4 text-slate-300">
            <FaSearch />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="min-h-11 rounded-lg border border-white/10 bg-[#050b20] px-4 text-sm font-bold text-white outline-none"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0b1b43]/75 shadow-xl shadow-black/20">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-white/[0.07] text-slate-300">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Submitted Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message) => (
                <tr key={message.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-4 font-bold text-cyan-100">#{message.id}</td>
                  <td className="px-4 py-4 font-bold text-white">{message.name}</td>
                  <td className="px-4 py-4 text-slate-300">{message.email}</td>
                  <td className="px-4 py-4 text-slate-300">{message.phone}</td>
                  <td className="px-4 py-4 text-slate-200">{message.subject}</td>
                  <td className="max-w-xs truncate px-4 py-4 text-slate-300">{message.message}</td>
                  <td className="px-4 py-4 text-slate-300">{formatDate(message.created_at)}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-md px-3 py-1 text-xs font-bold ${message.status === "read" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                      {statusLabel(message.status)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelectedMessage(message)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/10 text-cyan-100 transition hover:bg-white/15" title="View">
                        <FaEye />
                      </button>
                      <button onClick={() => updateStatus(message, "read")} className="grid h-9 w-9 place-items-center rounded-lg border border-emerald-300/20 bg-emerald-400/10 text-emerald-100 transition hover:bg-emerald-400/15" title="Mark as Read">
                        <FaEnvelopeOpenText />
                      </button>
                      <button onClick={() => updateStatus(message, "unread")} className="grid h-9 w-9 place-items-center rounded-lg border border-amber-300/20 bg-amber-400/10 text-amber-100 transition hover:bg-amber-400/15" title="Mark as Unread">
                        <FaEnvelope />
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
          {filteredMessages.length === 0 ? (
            <div className="px-6 py-16 text-center text-slate-300">No contact messages found.</div>
          ) : null}
        </div>

        {selectedMessage ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-[#071634]/80 p-6 shadow-xl shadow-black/20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black">{selectedMessage.subject}</h2>
                <p className="mt-2 text-sm text-slate-300">
                  #{selectedMessage.id} | {selectedMessage.name} | {selectedMessage.email} | {selectedMessage.phone}
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
