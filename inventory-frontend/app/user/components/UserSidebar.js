"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBox, FaShoppingCart, FaWallet, FaStar, FaEnvelope, FaGift, FaUser, FaSignOutAlt } from "react-icons/fa";

const items = [
  ["Home", "/user/home", FaHome],
  ["Products", "/user/products", FaBox],
  ["Orders", "/user/orders", FaShoppingCart],
  ["Payments", "/user/payments", FaWallet],
  ["Reviews", "/user/reviews", FaStar],
  ["Contact", "/user/contact", FaEnvelope],
  ["Subscription", "/user/subscription", FaGift],
  ["Profile", "/user/profile", FaUser],
];

export default function UserSidebar({ isOpen, onClose }) {
  const path = usePathname();

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex lg:w-72 flex-col gap-4 p-6 border-r border-white/6 bg-gradient-to-b from-[#071021]/80 to-transparent">
        <div className="mb-4">
          <div className="text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400">User Panel</div>
          <div className="text-xs text-slate-400 mt-1">Premium Account</div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {items.map(([label, href, Icon]) => {
            const active = path === href;
            return (
              <Link key={label} href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${active ? "bg-white/6 ring-1 ring-cyan-400/30" : "hover:bg-white/3"}`}>
                <Icon className="text-cyan-300" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4">
          <button className="w-full flex items-center gap-3 rounded-lg px-4 py-3 bg-rose-600/20 text-rose-300">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div className="absolute left-0 top-0 bottom-0 w-72 p-6 bg-[#071021]/95 backdrop-blur-md">
          <div className="mb-4">
            <div className="text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400">User Panel</div>
            <div className="text-xs text-slate-400 mt-1">Premium Account</div>
          </div>
          <nav className="flex flex-col gap-2">
            {items.map(([label, href, Icon]) => {
              const active = path === href;
              return (
                <Link key={label} href={href} onClick={onClose} className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${active ? "bg-white/6" : "hover:bg-white/3"}`}>
                  <Icon className="text-cyan-300" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
