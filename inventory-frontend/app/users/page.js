"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ThemedPageShell from "@/app/components/ThemedPageShell";
import { FaUsers } from "react-icons/fa";

export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") || "" : ""
  );

const fetchUsers = useCallback(async () => {

  try {

    const res = await axios.get(
      "http://127.0.0.1:8000/api/users/users/"
    );

    console.log(res.data);

    setUsers(res.data);

  } catch (error) {

    console.log(error);

  }

}, []);

  useEffect(() => {
    const loadUsers = setTimeout(fetchUsers, 0);
    return () => clearTimeout(loadUsers);
  }, [fetchUsers]);

  return (
    <ThemedPageShell
      title="Users Management"
      subtitle="View and manage user accounts"
      icon={FaUsers}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search Users..."
    >
      <section className="mb-10 rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Users Management</h1>
            <p className="mt-2 text-slate-300">View and manage user accounts in the same admin dashboard style.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-[#07112d]/80 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl overflow-hidden">
        <div className="px-8 py-8 border-b border-white/10">
          <h2 className="text-3xl font-bold">User Directory</h2>
          <p className="mt-2 text-slate-400">All registered users displayed with clean dashboard styling.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="bg-[#03101f] text-slate-300 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Username</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Address</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users
                  .filter((user) => {
                    const query = search.toLowerCase();
                    return (
                      String(user.username || "").toLowerCase().includes(query) ||
                      String(user.email || "").toLowerCase().includes(query)
                    );
                  })
                  .map((user) => (
                  <tr key={user.id} className="border-t border-white/10 hover:bg-white/5 transition">
                    <td className="px-6 py-5">{user.id}</td>
                    <td className="px-6 py-5">{user.username}</td>
                    <td className="px-6 py-5">{user.email}</td>
                    <td className="px-6 py-5">{user.role}</td>
                    <td className="px-6 py-5 whitespace-pre-line">
                      {[
                        user.address_line1,
                        user.address_line2,
                        user.address_city,
                        user.address_state,
                        user.address_country,
                        user.address_pincode,
                      ].filter(Boolean).join(",\n") || "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </ThemedPageShell>
  );
} 
