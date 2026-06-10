"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { addCartItem } from "../../utils/cart";

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${params.id}/`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
  }, [params.id]);

  const addToCart = () => {
    if (!product?.stock) {
      toast.error("This product is out of stock");
      return;
    }

    addCartItem(product, quantity);
    toast.success("Added to cart");
  };

  if (!product) {
    return <div className="mx-auto max-w-5xl text-slate-300">Loading product...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Toaster />
      <div className="grid gap-8 rounded-[32px] border border-white/10 bg-[#07101f]/70 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl lg:grid-cols-[1fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <img src={product.image_url} alt={product.product_name} className="h-full min-h-[420px] w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/70">{product.category_name}</p>
          <h1 className="mt-3 text-4xl font-black text-white">{product.product_name}</h1>
          <p className="mt-4 text-3xl font-black text-cyan-100">
            &#8377;{Number(product.price).toLocaleString("en-IN")}
          </p>
          <p className="mt-6 leading-7 text-slate-300">{product.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Available Stock</p>
              <p className={Number(product.stock) < 10 ? "mt-2 text-2xl font-black text-rose-300" : "mt-2 text-2xl font-black text-emerald-300"}>
                {product.stock}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Quantity</p>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(Number(product.stock), Number(e.target.value))))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#050816] px-3 py-3 text-white outline-none"
              />
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <button onClick={addToCart} className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400">
              Add To Cart
            </button>
            <Link href="/user/cart" className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
              View Cart
            </Link>
            <Link href="/user/products" className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5">
              Back To Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
