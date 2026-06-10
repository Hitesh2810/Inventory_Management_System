"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/user/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  // read role synchronously on client to ensure navbar hidden for admin users
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    setAuthenticated(role === "user");
    setUsername(storedUsername || "User");
  }, []);

  if (
    role === "admin" ||
    // hide public navbar on user-contact page when user is signed in (we render UserNavbar there)
    (role === "user" && pathname === "/contact") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/user") ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    setAuthenticated(false);
    setOpen(false);
    router.push("/login");
  };

  const navLinks = authenticated
    ? [...publicLinks, { label: "Dashboard", href: "/user/dashboard" }]
    : publicLinks;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/75 backdrop-blur-2xl shadow-[0_24px_120px_rgba(6,182,212,0.08)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text">
            Inventory Management System
          </Link>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-cyan-500/20 text-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.22)]"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {authenticated ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-inner shadow-cyan-500/10">
                <FaUserCircle className="text-cyan-300" />
                <span>{username}</span>
              </div>
              <button onClick={handleLogout} className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110">
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-white/10 bg-[#050816]/95 px-4 py-4 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-cyan-500/15 text-cyan-200"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {authenticated ? (
              <>
                <button onClick={handleLogout} className="rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                  Logout
                </button>
                <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <FaUserCircle className="text-cyan-300" />
                  <span>{username}</span>
                </div>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                Login
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
