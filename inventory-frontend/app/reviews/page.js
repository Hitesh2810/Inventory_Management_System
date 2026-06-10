"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ThemedPageShell from "@/app/components/ThemedPageShell";
import { FaStar } from "react-icons/fa";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/reviews/");
      const data = res.data.results ? res.data.results : res.data;
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemedPageShell
      title="Reviews"
      subtitle="User product reviews and moderation"
      icon={FaStar}
    >
      <section className="mb-10 rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <FaStar size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-black">Product Reviews</h1>
            <p className="mt-1 text-slate-300">View and moderate product reviews submitted by users.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-[#07112d]/80 p-6 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="bg-[#03101f] text-slate-300 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Comment</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reviews) &&
                reviews.map((r) => (
                  <tr key={r.id} className="border-t border-white/10 hover:bg-white/5 transition">
                    <td className="px-6 py-4">{r.id}</td>
                    <td className="px-6 py-4">{r.product || r.product_name || "-"}</td>
                    <td className="px-6 py-4">{r.user || r.username || "-"}</td>
                    <td className="px-6 py-4">{r.rating}</td>
                    <td className="px-6 py-4">{r.comment}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </ThemedPageShell>
  );
}
