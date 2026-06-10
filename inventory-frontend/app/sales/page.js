"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ThemedPageShell from "@/app/components/ThemedPageShell";
import { FaRupeeSign, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

export default function SalesPage() {

  const [sales, setSales] = useState([]);

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("q") || "" : ""
  );

  const [formData, setFormData] = useState({
    product: "",
    quantity_sold: "",
    total_price: "",
  });

  // FETCH SALES
  const fetchSales = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/sales/"
      );

      setSales(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchSales();
    fetchProducts();

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD SALE
  const addSale = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/sales/",
        {
          product: Number(formData.product),

          quantity_sold: Number(formData.quantity_sold),

          total_price: Number(formData.total_price),
        }
      );

      toast.success("Sale Added Successfully");

      fetchSales();

      setFormData({
        product: "",
        quantity_sold: "",
        total_price: "",
      });

    } catch (error) {

      console.log(error.response?.data);

      toast.error("Error Adding Sale");

    }
  };

  // DELETE SALE
  const deleteSale = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/sales/${id}/`
      );

      toast.success("Sale Deleted");

      fetchSales();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <ThemedPageShell
      title="Sales Management"
      subtitle="Manage all sales transactions with dashboard-style analytics"
      icon={FaRupeeSign}
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search Sales..."
    >
      <Toaster />

      <section className="mb-10 rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white shadow-lg shadow-cyan-500/20">
              <FaRupeeSign size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Sales Management</h1>
              <p className="mt-2 text-slate-300">Manage all sales transactions with dashboard-style analytics.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#071a39]/80 px-4 py-3 shadow-inner shadow-black/20">
            <FaSearch className="text-slate-300" />
            <input
              type="text"
              placeholder="Search Sales..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>

      <section className="mb-10 rounded-[32px] border border-white/10 bg-[#07112d]/80 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Add New Sale</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="rounded-3xl border border-white/10 bg-[#03101f]/80 p-4 text-white outline-none transition focus:border-cyan-400/70"
            required
          >
            <option value="" className="text-slate-300">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id} className="bg-[#03101f] text-white">
                {product.product_name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity_sold"
            placeholder="Quantity Sold"
            value={formData.quantity_sold}
            onChange={handleChange}
            className="rounded-3xl border border-white/10 bg-[#03101f]/80 p-4 text-white outline-none transition focus:border-cyan-400/70"
            required
          />
          <input
            type="number"
            name="total_price"
            placeholder="Total Price"
            value={formData.total_price}
            onChange={handleChange}
            className="rounded-3xl border border-white/10 bg-[#03101f]/80 p-4 text-white outline-none transition focus:border-cyan-400/70"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition hover:scale-[1.01]"
        >
          <FaPlus />
          Add Sale
        </button>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-[#07112d]/80 shadow-2xl shadow-cyan-950/25 backdrop-blur-xl overflow-hidden">
        <div className="px-8 py-8 border-b border-white/10">
          <h2 className="text-3xl font-bold">Sales List</h2>
          <p className="mt-2 text-slate-400">Latest sales records with quick action options.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-200">
            <thead className="bg-[#03101f] text-slate-300 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales
                .filter((sale) => {
                  const query = search.toLowerCase();
                  return (
                    String(sale.id || "").toLowerCase().includes(query) ||
                    String(sale.product || "").toLowerCase().includes(query) ||
                    String(sale.quantity_sold || "").toLowerCase().includes(query) ||
                    String(sale.total_price || "").toLowerCase().includes(query)
                  );
                })
                .map((sale) => (
                <tr key={sale.id} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="px-6 py-5">{sale.product}</td>
                  <td className="px-6 py-5">{sale.quantity_sold}</td>
                  <td className="px-6 py-5 font-semibold">₹{sale.total_price}</td>
                  <td className="px-6 py-5">
                    <button
                      onClick={() => deleteSale(sale.id)}
                      className="inline-flex items-center rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-rose-300 transition hover:bg-rose-500/20"
                    >
                      <FaTrash />
                    </button>
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
