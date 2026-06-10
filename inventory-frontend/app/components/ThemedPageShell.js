"use client";

import { useRouter } from "next/navigation";
import {
  FaBell,
  FaBox,
  FaMoon,
  FaRupeeSign,
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
  FaStar,
} from "react-icons/fa";
import { MdInventory, MdReviews } from "react-icons/md";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";

export default function ThemedPageShell({
  title,
  subtitle,
  icon: Icon = MdInventory,
  children,
  userName = "Admin",
  userRole = "Super Admin",
  userPanel = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search anything...",
}) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const navItems = userPanel
    ? [
        ["Home", FaBox, "/user/dashboard"],
        ["Products", FaBox, "/user/products"],
        ["Orders", FaShoppingCart, "/user/orders"],
        ["Payments", FaRupeeSign, "/user/payments"],
        ["Reviews", FaStar, "/user/reviews"],
        ["Contact Us", MdReviews, "/user/contact"],
        ["Subscription", FaStar, "/user/subscription"],
      ]
    : ADMIN_SIDEBAR_ITEMS;

  return (
    <div className="min-h-screen bg-[#050b20] text-white [background-image:radial-gradient(circle_at_18%_10%,rgba(0,132,255,0.22),transparent_32%),radial-gradient(circle_at_84%_14%,rgba(107,47,255,0.18),transparent_30%),linear-gradient(135deg,#061a3a_0%,#06102a_42%,#050817_100%)]">
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-[258px] border-r border-cyan-300/15 bg-[#061633]/95 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl lg:flex lg:flex-col">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 text-cyan-100 shadow-lg shadow-sky-500/30 ring-1 ring-cyan-200/30">
            <MdInventory size={25} />
          </div>
          <div>
            <p className="text-[22px] font-black leading-6 tracking-wide">IMS</p>
            <p className="text-sm font-semibold leading-4 text-cyan-100">
              {userPanel ? "User Panel" : "Inventory System"}
            </p>
          </div>
        </div>

        <nav className="mt-2 flex flex-1 flex-col gap-2 px-4 text-[15px] font-bold">
          {navItems.map(([item, NavIcon, path]) => {
            const isActive = title?.toLowerCase().includes(item.toLowerCase()) ||
              (item === "Dashboard" && title === "Admin Dashboard") ||
              (item === "Home" && title === "User Dashboard");

            return (
              <button
                type="button"
                key={item}
                onClick={() => router.push(path)}
                className={`flex w-full items-center gap-4 rounded-lg px-4 py-[11px] text-left text-slate-200 transition hover:bg-cyan-500/15 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/35 to-blue-500/25 text-white ring-1 ring-cyan-400/70 shadow-lg shadow-cyan-600/15"
                    : ""
                }`}
              >
                <NavIcon className="text-cyan-100" />
                {item}
              </button>
            );
          })}
        </nav>

        <div className="m-4 rounded-xl border border-cyan-400/15 bg-[#071b40]/80 p-4 shadow-inner shadow-cyan-950/50">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/70" />
            <div>
              <p className="text-sm font-bold">System Status</p>
              <p className="text-xs text-slate-300">All Systems Operational</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:ml-[258px]">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-[#050c25]/88 px-5 py-4 shadow-lg shadow-black/20 backdrop-blur-xl xl:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 shadow-lg shadow-sky-950/40">
                <Icon size={24} />
              </div>
              <div>
                <h1 className="text-[28px] font-black leading-8 tracking-wide text-white">
                  {title}
                </h1>
                <p className="mt-1 text-sm font-medium text-slate-300">{subtitle}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-11 min-w-72 items-center gap-3 rounded-lg border border-blue-200/15 bg-[#071634]/70 px-4 text-slate-400 shadow-inner shadow-black/20 lg:min-w-[360px]">
                <FaSearch />
                {onSearchChange ? (
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                  />
                ) : (
                  <span className="text-sm">{searchPlaceholder}</span>
                )}
              </div>
              <button className="relative grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-transparent text-slate-200">
                <FaBell />
                <span className="absolute right-2 top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[10px] font-bold">3</span>
              </button>
              <button className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-transparent text-slate-200">
                <FaMoon />
              </button>
              <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-orange-300 via-rose-400 to-blue-500 font-bold ring-2 ring-white/15">
                  {userName?.charAt(0)?.toUpperCase() || "A"}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold">{userName}</p>
                  <p className="text-xs text-slate-300">{userRole}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-[#071634]/70 text-slate-200 transition hover:border-rose-400/70 hover:text-rose-300"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-6 px-5 py-5 xl:px-8">{children}</div>
      </main>
    </div>
  );
}
