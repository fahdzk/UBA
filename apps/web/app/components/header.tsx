// apps/web — Navigation header with mobile menu
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useState } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/agency-ratings", label: "Agency Ratings" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="https://cdn.screenshottocode.com/cl_-oLgCQFkS7ZtvK5ItV.jpg"
            alt="UBA Logo"
            className="h-10 sm:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-extrabold text-[11px] uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:opacity-80 transition-colors"
              style={{
                color: pathname === link.href ? "#d90429" : "#001f3f",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons — desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <span
                className="border-2 border-[#001f3f] text-[#001f3f] px-6 py-2 rounded font-bold text-sm uppercase hover:bg-[#001f3f] hover:text-white transition-colors cursor-pointer"
              >
                Login
              </span>
            </SignInButton>
            <Link
              href="/sign-up"
              className="text-white px-6 py-2 rounded font-bold text-sm uppercase hover:bg-red-700 transition-colors"
              style={{ backgroundColor: "#d90429" }}
            >
              Join UBA
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="font-extrabold text-[11px] uppercase tracking-wider hover:opacity-80"
              style={{ color: "#001f3f" }}
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md border border-gray-200"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-[#001f3f] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#001f3f] my-1 transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#001f3f] transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-4 pb-4 pt-2 border-t border-gray-100 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 px-2 text-sm font-extrabold uppercase tracking-wider border-b border-gray-50 last:border-0"
              style={{
                color: pathname === link.href ? "#d90429" : "#001f3f",
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile auth buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <SignedOut>
              <SignInButton mode="modal">
                <span
                  onClick={() => setMobileOpen(false)}
                  className="text-center border-2 border-[#001f3f] text-[#001f3f] px-6 py-3 rounded font-bold text-sm uppercase hover:bg-[#001f3f] hover:text-white transition-colors cursor-pointer"
                >
                  Login
                </span>
              </SignInButton>
              <Link
                href="/sign-up"
                onClick={() => setMobileOpen(false)}
                className="text-center text-white px-6 py-3 rounded font-bold text-sm uppercase hover:bg-red-700 transition-colors"
                style={{ backgroundColor: "#d90429" }}
              >
                Join UBA
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="text-center font-extrabold text-sm uppercase tracking-wider py-3 px-2"
                style={{ color: "#001f3f" }}
              >
                Dashboard
              </Link>
              <div className="flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </nav>
      </div>
    </header>
  );
}
