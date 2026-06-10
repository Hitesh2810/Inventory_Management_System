
"use client";

import Link from "next/link";

import {
  FaHome,
  FaBox,
  FaTruck,
  FaShoppingCart,
  FaChartBar,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa";

export default function Sidebar() {

  return (

    <div className="fixed top-0 left-0 h-screen w-64 bg-[#081028] text-white shadow-2xl">

      {/* LOGO */}
      <div className="p-8 text-4xl font-bold text-cyan-400">
        Inventory Admin
      </div>

      {/* MENU */}
      <div className="mt-10 flex flex-col gap-3">

        <Link
          href="/admin/dashboard"
          className="flex items-center gap-4 px-8 py-4 hover:bg-cyan-600 transition"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          href="/products"
          className="flex items-center gap-4 px-8 py-4 hover:bg-cyan-600 transition"
        >
          <FaBox />
          Products
        </Link>

        <Link
          href="/suppliers"
          className="flex items-center gap-4 px-8 py-4 hover:bg-cyan-600 transition"
        >
          <FaTruck />
          Suppliers
        </Link>

        <Link
          href="/orders"
          className="flex items-center gap-4 px-8 py-4 hover:bg-cyan-600 transition"
        >
          <FaShoppingCart />
          Orders
        </Link>

        <Link
          href="/sales"
          className="flex items-center gap-4 px-8 py-4 hover:bg-cyan-600 transition"
        >
          <FaChartBar />
          Sales
        </Link>

        <Link
          href="/reports"
          className="flex items-center gap-4 px-8 py-4 hover:bg-cyan-600 transition"
        >
          <FaFileAlt />
          Reports
        </Link>

        <Link
          href="/users"
          className="flex items-center gap-4 px-8 py-4 hover:bg-cyan-600 transition"
        >
          <FaUsers />
          Users
        </Link>

      </div>

    </div>
  );
}

