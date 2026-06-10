"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaEnvelope, FaBars, FaUserCircle, FaHome, FaBox, FaClipboardList, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { getCartItems } from "../utils/cart";

const authNavItems = [
  ["Home", "/user/home", FaHome],
  ["Products", "/user/products", FaBox],
  ["Orders", "/user/orders", FaClipboardList],
  ["Contact Us", "/contact", FaEnvelope],
  ["Cart", "/user/cart", FaShoppingCart],
  ["Dashboard", "/user/dashboard", FaUserCircle],
];

const guestNavItems = [
  ["Home", "/", FaHome],
  ["Products", "/user/products", FaBox],
  ["About Us", "/contact", FaEnvelope],
  ["Contact Us", "/contact", FaEnvelope],
];

export default function UserNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const syncCartCount = () => {
      setCartCount(
        getCartItems().reduce((total, item) => total + Number(item.quantity || 0), 0)
      );
    };

    syncCartCount();
    window.addEventListener("ims-cart-updated", syncCartCount);
    window.addEventListener("storage", syncCartCount);

    return () => {
      window.removeEventListener("ims-cart-updated", syncCartCount);
      window.removeEventListener("storage", syncCartCount);
    };
  }, []);

  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
    setAuthenticated(role === "user");
  }, []);

  const navItems = authenticated ? authNavItems : guestNavItems;

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-black/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden rounded-2xl border border-white/10 bg-white/10 p-3 text-slate-200 transition hover:bg-white/15">
            <FaBars />
          </button>
          <div className="text-lg font-black tracking-tight text-white">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent">IMS</span> User
          </div>
        </div>

        <nav className="hidden items-center gap-3 lg:flex">
          {navItems.map(([label, href, Icon]) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-cyan-500/20 text-cyan-200 shadow-[0_0_18px_rgba(6,182,212,0.35)]" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}>
                <span className="inline-flex items-center gap-2">
                  <Icon />
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {authenticated ? (
            <>
              <button onClick={handleLogout} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/15">Logout</button>
              <button className="rounded-full bg-cyan-500 px-3 py-3 text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-105">
                <FaUserCircle />
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Login
            </Link>
          )}
        </div>
      </div>

      {menuOpen ? (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden border-t border-white/10 bg-[#050816]/90 backdrop-blur-xl">
          <div className="flex flex-col gap-2 px-4 py-4">
            {navItems.map(([label, href, Icon]) => {
              const active = pathname === href;
              return (
                <Link key={label} href={href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${active ? "bg-cyan-500/20 text-cyan-200" : "text-slate-200 hover:bg-white/10"}`}>
                  <Icon /> {label}
                </Link>
              );
            })}
            {authenticated ? (
              <button onClick={handleLogout} className="mt-3 rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-semibold text-slate-200 hover:bg-white/15">Logout</button>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="mt-3 rounded-3xl bg-cyan-500 px-4 py-3 text-left text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Login
              </Link>
            )}
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
