"use client";

// USER PRODUCTS PAGE - COMPLETELY SEPARATE FROM ADMIN PRODUCTS AT /products
// This page shows products for authenticated users only

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

export default function UserProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  async function fetchProducts() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products/");
      const data = res.data.results || res.data;
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const loadProducts = setTimeout(fetchProducts, 0);
    return () => clearTimeout(loadProducts);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.product_name?.toLowerCase().includes(search.toLowerCase());
      const productCategory = p.category_name || String(p.category || "");
      const matchesCat = category ? productCategory.toLowerCase().includes(category.toLowerCase()) : true;
      return matchesSearch && matchesCat;
    });
  }, [products, search, category]);

  return (
    <div className="mx-auto max-w-7xl">
      <Toaster />
      <div className="rounded-[32px] border border-white/10 bg-[#07101f]/70 p-6 shadow-2xl shadow-cyan-900/30 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">Products</p>
            <h1 className="mt-3 text-4xl font-black text-white">Explore your inventory collection</h1>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/20">
            <p className="text-sm text-slate-400">Total Items</p>
            <p className="mt-2 text-3xl font-black text-white">{filtered.length}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.8fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#050816]/70 p-5">
            <Filters search={search} setSearch={setSearch} category={category} setCategory={setCategory} />
          </div>
          <div className="rounded-[32px] border border-white/10 bg-[#050816]/70 p-5">
            <p className="text-sm text-slate-300">Filter by category, stock status, and search across inventory.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
            No products found.
          </div>
        ) : null}
      </div>
    </div>
  );
}
