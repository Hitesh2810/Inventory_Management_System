"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ThemedPageShell from "@/app/components/ThemedPageShell";
import { FaChartBar, FaFilePdf, FaShoppingCart, FaRupeeSign } from "react-icons/fa";

export default function ReportsPage() {

  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") || "" : ""
  );

  const [revenue, setRevenue] = useState(0);

  const fetchReportsData = async () => {

    try {

      const salesRes = await axios.get(
        "http://127.0.0.1:8000/api/sales/"
      );

      const ordersRes = await axios.get(
        "http://127.0.0.1:8000/api/orders/"
      );

      const salesData = salesRes.data.results
        ? salesRes.data.results
        : salesRes.data;

      const ordersData = ordersRes.data.results
        ? ordersRes.data.results
        : ordersRes.data;

      setSales(salesData);
      setOrders(ordersData);

      const totalRevenue = salesData.reduce(
        (total, sale) =>
          total + Number(sale.total_price),
        0
      );

      setRevenue(totalRevenue);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  // PDF DOWNLOAD

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Inventory Management Report",
      14,
      20
    );

    autoTable(doc, {
      startY: 30,
      head: [["Sale ID", "Product", "Revenue"]],
      body: sales.map((sale) => [
        sale.id,
        sale.product,
        sale.total_price,
      ]),
    });

    doc.save("inventory-report.pdf");
  };

  return (
    <ThemedPageShell
      title="Reports"
      subtitle="Inventory performance overview and analytics"
      icon={FaChartBar}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search Reports..."
    >
      <section className="mb-10 rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/20">
              <FaChartBar size={28} />
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tight">Reports & Analytics</h1>
              <p className="mt-2 text-slate-300">Inventory performance overview with dashboard-style presentation.</p>
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-rose-500 to-red-600 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-rose-500/20 transition hover:scale-[1.01]"
          >
            <FaFilePdf />
            Download PDF Report
          </button>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3 mb-10">
        <div className="rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-slate-400 text-lg">Total Revenue</h2>
              <p className="text-4xl font-black mt-3">₹{revenue}</p>
            </div>
            <FaRupeeSign size={36} className="text-emerald-400" />
          </div>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-slate-400 text-lg">Total Sales</h2>
              <p className="text-4xl font-black mt-3">{sales.length}</p>
            </div>
            <FaShoppingCart size={36} className="text-orange-400" />
          </div>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-slate-400 text-lg">Total Orders</h2>
              <p className="text-4xl font-black mt-3">{orders.length}</p>
            </div>
            <FaChartBar size={36} className="text-cyan-300" />
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl overflow-hidden">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Sales Summary</h2>
          <p className="mt-2 text-slate-400">Review recent sales and download reports with the same dashboard feel.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="bg-[#03101f] text-slate-300 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Sale ID</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sales
                .filter((sale) => {
                  const query = search.toLowerCase();
                  return (
                    String(sale.id || "").toLowerCase().includes(query) ||
                    String(sale.product || "").toLowerCase().includes(query) ||
                    String(sale.total_price || "").toLowerCase().includes(query)
                  );
                })
                .map((sale) => (
                <tr key={sale.id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="px-6 py-5">{sale.id}</td>
                  <td className="px-6 py-5">{sale.product}</td>
                  <td className="px-6 py-5 font-semibold">₹{sale.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ThemedPageShell>
  );
}
