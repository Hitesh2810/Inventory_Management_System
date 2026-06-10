"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { addCartItem } from "../utils/cart";

export default function ProductCard({ product }) {
  const addToCart = () => {
    if (!product?.stock) {
      toast.error("This product is out of stock");
      return;
    }

    addCartItem(product, 1);
    toast.success("Added to cart");
  };

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#07101f] shadow-lg shadow-cyan-950/20"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={product?.image_url || "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=900&q=80"}
          alt={product?.product_name || "Product"}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
              {product?.category_name || "Product"}
            </p>
            <h3 className="mt-2 text-lg font-bold text-white">{product?.product_name || "Product"}</h3>
          </div>
          <p className="shrink-0 rounded-lg bg-cyan-500/15 px-3 py-2 text-sm font-black text-cyan-100">
            &#8377;{Number(product?.price || 0).toLocaleString("en-IN")}
          </p>
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {product?.description || "Quality product for your inventory needs."}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-300">Available Stock</span>
          <span className={Number(product?.stock || 0) < 10 ? "font-bold text-rose-300" : "font-bold text-emerald-300"}>
            {product?.stock ?? 0}
          </span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <Link
            href={`/user/products/${product.id}`}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-center text-sm font-semibold text-slate-100 transition hover:bg-white/10"
          >
            View Details
          </Link>
          <button
            onClick={addToCart}
            className="rounded-lg bg-cyan-500 px-3 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </motion.article>
  );
}
