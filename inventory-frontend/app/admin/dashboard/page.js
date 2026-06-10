"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import SalesChart from "@/app/components/SalesChart";
import { ADMIN_SIDEBAR_ITEMS } from "@/app/components/adminSidebarItems";

import { useRouter } from "next/navigation";

import {
  FaBox,
  FaChair,
  FaEye,
  FaHeadphones,
  FaMoon,
  FaPlus,
  FaRupeeSign,
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import {
  MdInventory,
  MdWatch,
} from "react-icons/md";

export default function AdminDashboard() {

  const router = useRouter();

  const [theme, setTheme] = useState("dark");
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  async function fetchDashboardData() {

    try {

      // PRODUCTS
      const productsRes = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      );

      // USERS
      const usersRes = await axios.get(
        "http://127.0.0.1:8000/api/users/users/"
      );

      // ORDERS
      const ordersRes = await axios.get(
        "http://127.0.0.1:8000/api/orders/"
      );

      // SALES
      const salesRes = await axios.get(
        "http://127.0.0.1:8000/api/sales/"
      );

      // PRODUCTS COUNT
      const productsData = productsRes.data.results
        ? productsRes.data.results
        : productsRes.data;

      setProductsCount(productsData.length);
      setProducts(productsData);

      // USERS COUNT
      const usersData = usersRes.data.results
        ? usersRes.data.results
        : usersRes.data;

      setUsersCount(usersData.length);

      // ORDERS COUNT
      const ordersData = ordersRes.data.results
        ? ordersRes.data.results
        : ordersRes.data;

      setOrdersCount(ordersData.length);
      setOrders(ordersData);

      // SALES ARRAY
      const salesArray = salesRes.data.results
        ? salesRes.data.results
        : salesRes.data;

      setSalesData(salesArray);

      // TOTAL REVENUE
      const totalRevenue = salesArray.reduce(
        (total, sale) =>
          total + parseFloat(sale.total_price || 0),
        0
      );

      setRevenue(totalRevenue);

    } catch (error) {

      console.log(error);

    }
  }

useEffect(() => {

  const role = localStorage.getItem("role");

  if (!role) {
    router.push("/admin");
    return;
  }

  if (role !== "admin") {
    router.push("/admin");
    return;
  }

  const loadDashboard = setTimeout(fetchDashboardData, 0);
  return () => clearTimeout(loadDashboard);

}, [router]);

useEffect(() => {

  const loadTheme = setTimeout(() => {
    setTheme(localStorage.getItem("admin_theme") || "dark");
  }, 0);

  return () => clearTimeout(loadTheme);

}, []);

  const logout = () => {

  localStorage.clear();

  router.push("/admin");

};

  const toggleTheme = () => {

    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("admin_theme", nextTheme);

  };

  const isLightTheme = theme === "light";

  const handleDashboardSearch = (event) => {

    if (event.key !== "Enter") return;

    const query = dashboardSearch.trim();

    if (query) {
      router.push(`/products?q=${encodeURIComponent(query)}`);
    }

  };

  const statCards = [
    {
      label: "Total Products",
      value: productsCount,
      icon: FaBox,
      accent: "from-blue-500/35 to-cyan-400/10",
      iconBg: "from-blue-500 to-cyan-400",
      change: "12.5%",
    },
    {
      label: "Total Orders",
      value: ordersCount,
      icon: FaShoppingCart,
      accent: "from-violet-500/35 to-purple-400/10",
      iconBg: "from-violet-500 to-purple-400",
      change: "18.6%",
    },
    {
      label: "Total Revenue",
      value: Number(revenue).toLocaleString("en-IN"),
      prefix: "rupee",
      icon: FaRupeeSign,
      accent: "from-emerald-500/35 to-teal-400/10",
      iconBg: "from-emerald-500 to-teal-400",
      change: "22.4%",
    },
    {
      label: "Total Users",
      value: usersCount,
      icon: FaUsers,
      accent: "from-orange-500/35 to-amber-400/10",
      iconBg: "from-orange-500 to-amber-400",
      change: "8.2%",
    },
    {
      label: "Total Reviews",
      value: 128,
      icon: FaStar,
      accent: "from-pink-500/35 to-rose-400/10",
      iconBg: "from-pink-500 to-rose-400",
      change: "15.3%",
    },
  ];

  const recentOrders = useMemo(() => {
    return orders.slice(0, 8).flatMap((order) => {
      const items = order.items?.length ? order.items : [{ product_name: "Order items", quantity: "-", line_total: order.total_amount }];

      return items.map((item) => ({
        id: order.id,
        customer: order.username || `User ${order.user}`,
        product: item.product_name || `Product ${item.product}`,
        quantity: item.quantity,
        amount: Number(item.line_total || order.total_amount || 0),
        status: order.order_status,
        date: order.order_date,
      }));
    }).slice(0, 8);
  }, [orders]);

  const lowStockProducts = useMemo(
    () => products.filter((product) => Number(product.stock) < 10),
    [products]
  );

  const orderStatusStats = useMemo(() => {
    const total = orders.length || 1;
    const completed = orders.filter((order) => order.order_status === "completed").length;
    const pending = orders.filter((order) => order.order_status === "pending").length;
    const cancelled = orders.filter((order) => order.order_status === "cancelled").length;
    const processing = Math.max(orders.length - completed - pending - cancelled, 0);

    return [
      ["Delivered", `${completed} (${Math.round((completed / total) * 100)}%)`, "bg-emerald-400"],
      ["Processing", `${processing} (${Math.round((processing / total) * 100)}%)`, "bg-sky-400"],
      ["Pending", `${pending} (${Math.round((pending / total) * 100)}%)`, "bg-amber-400"],
      ["Cancelled", `${cancelled} (${Math.round((cancelled / total) * 100)}%)`, "bg-rose-400"],
    ];
  }, [orders]);

  const statusColors = {
    completed: "bg-emerald-500/20 text-emerald-300",
    processing: "bg-sky-500/20 text-sky-300",
    pending: "bg-amber-500/20 text-amber-300",
    cancelled: "bg-rose-500/20 text-rose-300",
  };

  return (

    <div className={`min-h-screen transition-colors ${isLightTheme ? "bg-slate-100 text-slate-950 [background-image:radial-gradient(circle_at_18%_10%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_84%_14%,rgba(99,102,241,0.12),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#e0f2fe_42%,#f1f5f9_100%)]" : "bg-[#050b20] text-white [background-image:radial-gradient(circle_at_18%_10%,rgba(0,132,255,0.22),transparent_32%),radial-gradient(circle_at_84%_14%,rgba(107,47,255,0.18),transparent_30%),linear-gradient(135deg,#061a3a_0%,#06102a_42%,#050817_100%)]"}`}>

      <aside className={`fixed left-0 top-0 z-20 hidden h-screen w-[258px] border-r shadow-2xl backdrop-blur-xl lg:flex lg:flex-col ${isLightTheme ? "border-slate-200 bg-white/95 shadow-slate-300/40" : "border-cyan-300/15 bg-[#061633]/95 shadow-cyan-950/40"}`}>
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 text-cyan-100 shadow-lg shadow-sky-500/30 ring-1 ring-cyan-200/30">
            <MdInventory size={25} />
          </div>
          <div>
            <p className="text-[22px] font-black leading-6 tracking-wide">IMS</p>
            <p className="text-sm font-semibold leading-4 text-cyan-100">Inventory System</p>
          </div>
        </div>

        <nav className="mt-2 flex flex-1 flex-col gap-2 px-4 text-[15px] font-bold">
          {[
            ...ADMIN_SIDEBAR_ITEMS,
          ].map(([item, Icon, path]) => (
            <button
              type="button"
              key={item}
              onClick={() => router.push(path)}
              className={`flex w-full items-center gap-4 rounded-lg px-4 py-[11px] text-left text-slate-200 transition hover:bg-cyan-500/15 ${item === "Dashboard" ? "bg-gradient-to-r from-cyan-500/35 to-blue-500/25 text-white ring-1 ring-cyan-400/70 shadow-lg shadow-cyan-600/15" : ""}`}
            >
              <Icon className="text-cyan-100" />
              {item}
            </button>
          ))}
        </nav>

        <div className={`m-4 rounded-xl border p-4 shadow-inner ${isLightTheme ? "border-slate-200 bg-slate-100 text-slate-900 shadow-slate-200" : "border-cyan-400/15 bg-[#071b40]/80 shadow-cyan-950/50"}`}>
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
        <header className={`sticky top-0 z-10 border-b px-5 py-4 shadow-lg backdrop-blur-xl xl:px-8 ${isLightTheme ? "border-slate-200 bg-white/88 shadow-slate-300/30" : "border-white/10 bg-[#050c25]/88 shadow-black/20"}`}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className={`text-[28px] font-black leading-8 tracking-wide ${isLightTheme ? "text-slate-950" : "text-white"}`}>Admin Dashboard</h1>
              <p className={`mt-1 text-sm font-medium ${isLightTheme ? "text-slate-600" : "text-slate-300"}`}>Welcome back, Admin! Here&apos;s what&apos;s happening with your inventory.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className={`flex h-11 min-w-72 items-center gap-3 rounded-lg border px-4 shadow-inner lg:min-w-[470px] ${isLightTheme ? "border-slate-200 bg-white/80 text-slate-500 shadow-slate-200" : "border-blue-200/15 bg-[#071634]/70 text-slate-400 shadow-black/20"}`}>
                <FaSearch />
                <input
                  type="text"
                  value={dashboardSearch}
                  onChange={(event) => setDashboardSearch(event.target.value)}
                  onKeyDown={handleDashboardSearch}
                  placeholder="Search anything..."
                  className={`w-full bg-transparent text-sm outline-none ${isLightTheme ? "text-slate-900 placeholder:text-slate-500" : "text-white placeholder:text-slate-400"}`}
                />
              </div>
              <button onClick={toggleTheme} className={`grid h-11 w-11 place-items-center rounded-lg border bg-transparent transition ${isLightTheme ? "border-slate-300 text-slate-700 hover:border-cyan-500 hover:text-cyan-700" : "border-white/10 text-slate-200 hover:border-cyan-400/70 hover:text-cyan-200"}`}>
                <FaMoon />
              </button>
              <div className={`flex items-center gap-3 border-l pl-4 ${isLightTheme ? "border-slate-300" : "border-white/10"}`}>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-orange-300 via-rose-400 to-blue-500 font-bold ring-2 ring-white/15">A</div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold">Admin</p>
                  <p className={`text-xs ${isLightTheme ? "text-slate-500" : "text-slate-300"}`}>Super Admin</p>
                </div>
              </div>
              <button
                onClick={logout}
                className={`grid h-11 w-11 place-items-center rounded-lg border transition hover:border-rose-400/70 hover:text-rose-300 ${isLightTheme ? "border-slate-300 bg-white/80 text-slate-700" : "border-white/15 bg-[#071634]/70 text-slate-200"}`}
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-4 px-5 py-5 xl:px-8">
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {statCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className={`relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${card.accent} p-5 shadow-xl shadow-black/20 before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_50%)]`}
                >
                  <button className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-white/12 text-cyan-100">
                    <FaPlus size={11} />
                  </button>
                  <div className="relative flex items-center gap-4">
                    <div className={`grid h-16 w-16 place-items-center rounded-xl bg-gradient-to-br ${card.iconBg} shadow-lg shadow-black/30`}>
                      <Icon size={25} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{card.label}</p>
                      <p className="mt-1 text-[26px] font-black leading-7">{card.prefix === "rupee" && <>&#8377;</>}{card.value}</p>
                      <p className="mt-1 text-xs text-slate-300">
                        <span className="font-bold text-emerald-300">&uarr; {card.change}</span> from last month
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_0.95fr_1.25fr]">
            <div className="rounded-xl border border-white/10 bg-[#0b1b43]/75 p-5 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-black">Revenue Overview</h2>
                <button className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-xs text-slate-200">This Year</button>
              </div>
              <SalesChart sales={salesData} />
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b1635]/82 p-5 shadow-xl shadow-black/20">
              <h2 className="mb-4 text-base font-black">Order Status</h2>
              <div className="flex flex-col items-center gap-5 md:flex-row xl:flex-col 2xl:flex-row">
                <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#38d981_0_45%,#2da8ff_45%_73%,#ffad32_73%_91%,#ff4168_91%_100%)] shadow-lg shadow-blue-950/40">
                  <div className="absolute inset-10 rounded-full bg-[#071834]" />
                </div>
                <div className="w-full space-y-4 text-sm">
                  {orderStatusStats.map(([label, value, color]) => (
                    <div key={label} className="flex items-center justify-between gap-5">
                      <span className="flex items-center gap-3 text-slate-200"><span className={`h-3 w-3 rounded-full ${color}`} />{label}</span>
                      <span className="font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111944]/82 p-5 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-black">Top Categories</h2>
                <button className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-xs text-slate-200">This Month</button>
              </div>
              <div className="flex flex-col items-center gap-5 md:flex-row">
                <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#695bff_0_45%,#36d6b0_45%_70%,#ffaa32_70%_85%,#ff5d5d_85%_95%,#8c5cff_95%_100%)]">
                  <div className="absolute inset-10 rounded-full bg-[#071834]" />
                </div>
                <div className="w-full space-y-4 text-sm">
                  {[
                    ["Electronics", "45%", "bg-indigo-400"],
                    ["Clothing", "25%", "bg-violet-400"],
                    ["Furniture", "15%", "bg-amber-400"],
                    ["Accessories", "10%", "bg-red-400"],
                    ["Others", "5%", "bg-purple-400"],
                  ].map(([label, value, color]) => (
                    <div key={label} className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${color}`} />{label}</span>
                      <span className="font-bold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.8fr_1.55fr]">
            <div className="rounded-xl border border-white/10 bg-[#0b1b43]/75 p-5 shadow-xl shadow-black/20">
              <h2 className="mb-4 text-base font-black">Recent Orders</h2>
              <div className="overflow-x-auto rounded-lg">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="bg-white/[0.07] text-slate-300">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Qty</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={`${order.id}-${index}`} className="border-t border-white/5 hover:bg-white/[0.03]">
                        <td className="px-4 py-3 text-slate-300">{index + 1}</td>
                        <td className="px-4 py-3 font-semibold">#ORD-{String(order.id).padStart(3, "0")}</td>
                        <td className="px-4 py-3">{order.customer}</td>
                        <td className="px-4 py-3">{order.product}</td>
                        <td className="px-4 py-3">{order.quantity}</td>
                        <td className="px-4 py-3">&#8377;{order.amount.toLocaleString("en-IN")}</td>
                        <td className="px-4 py-3"><span className={`rounded-md px-3 py-1 text-xs font-bold ${statusColors[order.status] || statusColors.pending}`}>{order.status}</span></td>
                        <td className="px-4 py-3">{order.date ? new Date(order.date).toLocaleDateString("en-IN") : "-"}</td>
                        <td className="px-4 py-3"><FaEye className="text-slate-300" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b1b43]/75 p-5 shadow-xl shadow-black/20">
              <h2 className="mb-4 text-base font-black">Low Stock Alert</h2>
              <div className="space-y-4 text-sm">
                {lowStockProducts.slice(0, 5).map((product) => {
                  const Icon = product.category_name === "Furniture" ? FaChair : product.product_name?.toLowerCase().includes("watch") ? MdWatch : FaHeadphones;

                  return (
                  <div key={product.id} className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <Icon className="text-slate-300" />
                      <div>
                        <p className="font-bold">{product.product_name}</p>
                        <p className="text-xs text-slate-300">Stock: <span className="text-rose-300">{product.stock}</span></p>
                      </div>
                    </div>
                    <span className="font-black text-rose-400">{product.stock}</span>
                  </div>
                  );
                })}
                {lowStockProducts.length === 0 ? (
                  <p className="text-slate-300">No low stock products.</p>
                ) : null}
              </div>
              <button className="mt-4 w-full rounded-lg border border-cyan-400/30 bg-cyan-500/10 py-2 text-sm font-bold text-violet-300 shadow-inner shadow-cyan-950/50">View All Products</button>
            </div>

          </section>
        </div>
      </main>

    </div>
  );
}
