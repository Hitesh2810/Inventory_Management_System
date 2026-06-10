"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/reviews/");
      const data = res.data.results || res.data;
      setReviews(data);
    } catch (err) { console.log(err); }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-[20px] border border-white/6 bg-[#07112d]/60 p-6">
        <h1 className="text-3xl font-black">Reviews</h1>
        <p className="mt-2 text-slate-300">Read and add product reviews.</p>

        <div className="mt-6 space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-lg border border-white/6 bg-white/2 p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{r.user || r.username || 'User'}</div>
                <div className="text-sm text-slate-300">{r.rating || 5} ★</div>
              </div>
              <div className="mt-2 text-slate-300">{r.comment}</div>
            </div>
          ))}

          <div className="pt-4">
            <button onClick={() => setOpen(true)} className="rounded-2xl bg-cyan-500 px-4 py-2 font-semibold text-black">Add Review</button>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Review">
        <form className="grid gap-3">
          <input placeholder="Title" className="rounded-2xl bg-white/3 p-3 outline-none" />
          <textarea placeholder="Comment" className="rounded-2xl bg-white/3 p-3 outline-none h-28" />
          <div className="flex justify-end">
            <button onClick={() => setOpen(false)} className="rounded-2xl bg-white/6 px-4 py-2">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
