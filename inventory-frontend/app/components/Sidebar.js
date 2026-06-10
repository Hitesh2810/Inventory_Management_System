
"use client";

import Link from "next/link";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";

export default function Sidebar() {

  return (

    <div className="fixed top-0 left-0 h-screen w-64 bg-[#081028] text-white shadow-2xl">

      {/* LOGO */}
      <div className="p-8 text-4xl font-bold text-cyan-400">
        Inventory Admin
      </div>

      {/* MENU */}
      <div className="mt-10 flex flex-col gap-3">

        {ADMIN_SIDEBAR_ITEMS.map(([item, Icon, path]) => (
          <Link
            key={item}
            href={path}
            className="flex items-center gap-4 px-8 py-4 hover:bg-cyan-600 transition"
          >
            <Icon />
            {item}
          </Link>
        ))}

      </div>

    </div>
  );
}

