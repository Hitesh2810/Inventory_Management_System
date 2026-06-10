"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => { fetchPayments(); }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/payments/");
      const data = res.data.results || res.data;
      setPayments(data);
    } catch (err) { console.log(err); }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-[20px] border border-white/6 bg-[#07112d]/60 p-6">
        <h1 className="text-3xl font-black">Payments</h1>
        <p className="mt-2 text-slate-300">Your transactions and payment methods.</p>

        <div className="mt-6 grid gap-4">
          {payments.map((p) => (
            <div key={p.id} className="rounded-lg border border-white/6 bg-white/2 p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">₹{p.amount}</div>
                <div className="text-sm text-slate-300">{p.method || p.payment_method || '—'}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${p.status === 'Success' ? 'bg-emerald-300/20 text-emerald-300' : 'bg-rose-300/20 text-rose-300'}`}>
                {p.status || 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
