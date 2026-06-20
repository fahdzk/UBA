// apps/web — Navigation header (matches reference exactly)
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/agency-ratings", label: "Agency Ratings" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="https://cdn.screenshottocode.com/cl_-oLgCQFkS7ZtvK5ItV.jpg"
            alt="UBA Logo"
            className="h-12"
          />
        </Link>

        {/* Nav */}
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

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
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
      </div>
    </header>
  );
}
