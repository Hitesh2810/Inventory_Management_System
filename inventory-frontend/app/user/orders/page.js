"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const statusStyles = {
  pending: "bg-amber-300/15 text-amber-200",
  processing: "bg-sky-300/15 text-sky-200",
  shipped: "bg-indigo-300/15 text-indigo-200",
  delivered: "bg-emerald-300/15 text-emerald-200",
  cancelled: "bg-rose-300/15 text-rose-200",
};

export default function UserOrdersPage() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const username = localStorage.getItem("username");
      const url = username
        ? `http://127.0.0.1:8000/api/orders/?username=${encodeURIComponent(username)}`
        : "http://127.0.0.1:8000/api/orders/";
      const res = await axios.get(url);
      const data = res.data.results || res.data;
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const loadOrders = setTimeout(fetchOrders, 0);
    return () => clearTimeout(loadOrders);
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-[32px] border border-white/10 bg-[#07101f]/70 p-6 shadow-2xl shadow-cyan-900/25 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">Orders</p>
            <h1 className="mt-3 text-4xl font-black text-white">Your order history</h1>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            {orders.length} total order{orders.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="mt-8 grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-white/10 bg-[#050816]/80 p-5 shadow-lg shadow-blue-500/10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">Order #{order.id}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {order.order_date ? new Date(order.order_date).toLocaleString("en-IN") : "-"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-lg px-4 py-2 text-sm font-semibold ${statusStyles[order.order_status] || "bg-sky-500/15 text-sky-200"}`}>
                    {order.order_status || "pending"}
                  </span>
                  <span className="rounded-lg bg-cyan-500/15 px-4 py-2 text-sm font-black text-cyan-100">
                    &#8377;{Number(order.total_amount || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-white/[0.07] text-slate-300">
                    <tr>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Quantity</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.items || []).map((item) => (
                      <tr key={item.id} className="border-t border-white/5">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img src={item.product_image} alt={item.product_name} className="h-14 w-14 rounded-lg object-cover" />
                            <div>
                              <p className="font-bold text-white">{item.product_name}</p>
                              <p className="text-xs text-slate-400">{item.category_name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-200">{item.quantity}</td>
                        <td className="px-4 py-4 text-slate-200">&#8377;{Number(item.line_total || 0).toLocaleString("en-IN")}</td>
                        <td className="px-4 py-4 text-slate-200">{order.order_status}</td>
                        <td className="px-4 py-4 text-slate-400">{order.order_date ? new Date(order.order_date).toLocaleDateString("en-IN") : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
              No orders yet
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
