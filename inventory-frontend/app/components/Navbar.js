"use client";

import { FaUserCircle } from "react-icons/fa";
import { logout } from "@/app/utils/auth";

export default function Navbar() {
  return (
    <div className="ml-64 bg-white shadow-md h-16 flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold text-gray-700">
        Inventory Management System
      </h1>
      
      <button
  onClick={logout}
  className="bg-red-500 text-white px-4 py-2 rounded-xl"
>
  Logout
</button>

      <div className="flex items-center gap-3">
        <FaUserCircle size={30} className="text-cyan-500" />
        <span className="font-semibold">Admin</span>
      </div>
    </div>

    
  );
}