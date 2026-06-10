"use client";

import { useState } from "react";
import Link from "next/link";
import { getCartItems, getCartTotal, saveCartItems } from "../utils/cart";

export default function CartPage() {
  const [items, setItems] = useState(() => getCartItems());

  const updateQuantity = (id, quantity) => {
    const nextItems = items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, Math.min(Number(item.stock), Number(quantity))) }
        : item
    );

    setItems(nextItems);
    saveCartItems(nextItems);
  };

  const removeItem = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
    saveCartItems(nextItems);
  };

  const total = getCartTotal(items);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-[32px] border border-white/10 bg-[#07101f]/70 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">View Cart</p>
            <h1 className="mt-3 text-4xl font-black text-white">Your shopping cart</h1>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            {items.length} item{items.length === 1 ? "" : "s"} selected
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2.2fr_0.8fr]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#050816]/80 p-6">
                <p className="font-semibold text-white">No items in cart yet</p>
                <p className="mt-2 text-sm text-slate-500">Add products from the catalog to see them here.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="grid gap-4 rounded-2xl border border-white/10 bg-[#050816]/80 p-4 md:grid-cols-[120px_1fr_auto]">
                  <img src={item.image_url} alt={item.product_name} className="h-28 w-full rounded-lg object-cover md:w-28" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">{item.category_name}</p>
                    <h2 className="mt-2 text-xl font-bold text-white">{item.product_name}</h2>
                    <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                    <p className="mt-3 text-sm text-slate-300">Stock: {item.stock}</p>
                  </div>
                  <div className="flex flex-col gap-3 md:items-end">
                    <p className="text-lg font-black text-white">&#8377;{Number(item.price).toLocaleString("en-IN")}</p>
                    <div className="flex items-center overflow-hidden rounded-lg border border-white/10">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 text-slate-200">-</button>
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        className="w-16 bg-white/5 px-2 py-2 text-center text-white outline-none"
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 text-slate-200">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-sm font-semibold text-rose-300">Remove</button>
                  </div>
                </div>
              ))
            )}

            <div className="rounded-2xl border border-white/10 bg-[#050816]/80 p-6">
              <div className="flex flex-wrap gap-3">
                <Link href="/user/products" className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-cyan-500/20">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#050816]/80 p-6 shadow-lg shadow-cyan-500/10">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Order summary</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-slate-300">
                <span>Subtotal</span>
                <span>&#8377;{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Tax</span>
                <span>&#8377;0</span>
              </div>
              <div className="rounded-lg bg-white/5 p-4 text-white">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>&#8377;{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <Link
                href="/user/checkout"
                className={`block rounded-lg px-4 py-3 text-center text-sm font-bold ${items.length ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400" : "pointer-events-none bg-slate-700 text-slate-400"}`}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
