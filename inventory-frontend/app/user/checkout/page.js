"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { clearCart, getCartItems, getCartTotal } from "../utils/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const [items] = useState(() => getCartItems());
  const [placing, setPlacing] = useState(false);

  const placeOrder = async () => {
    const username = localStorage.getItem("username");

    if (!username) {
      toast.error("Please login before checkout");
      router.push("/login");
      return;
    }

    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    setPlacing(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/orders/checkout/", {
        username,
        email: localStorage.getItem("email"),
        items: items.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      toast.success("Order placed successfully");
      router.push("/user/orders");
    } catch (error) {
      toast.error(error.response?.data?.error || "Unable to place order");
    } finally {
      setPlacing(false);
    }
  };

  const total = getCartTotal(items);

  return (
    <div className="mx-auto max-w-6xl">
      <Toaster />
      <div className="rounded-[32px] border border-white/10 bg-[#07101f]/70 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">Checkout</p>
            <h1 className="mt-3 text-4xl font-black text-white">Review and place order</h1>
          </div>
          <button
            onClick={placeOrder}
            disabled={placing || !items.length}
            className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-white/[0.07] text-slate-300">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-white/5">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image_url} alt={item.product_name} className="h-14 w-14 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-white">{item.product_name}</p>
                        <p className="text-xs text-slate-400">{item.category_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-200">{item.quantity}</td>
                  <td className="px-4 py-4 text-slate-200">&#8377;{Number(item.price).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-4 font-bold text-white">
                    &#8377;{(Number(item.price) * Number(item.quantity)).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between text-slate-300">
              <span>Total Amount</span>
              <span className="text-2xl font-black text-white">&#8377;{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
