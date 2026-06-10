"use client";

import { usePathname } from "next/navigation";
import UserNavbar from "./components/UserNavbar";

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const hasNavbar = pathname !== "/user";

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {hasNavbar && <UserNavbar />}
      <main className={`flex-1 p-6 lg:p-10 ${hasNavbar ? "pt-[110px]" : "pt-0"}`}>{children}</main>
    </div>
  );
}
