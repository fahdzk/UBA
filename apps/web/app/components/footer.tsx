// apps/web — Site footer (responsive)
import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#001f3f" }} className="text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://cdn.screenshottocode.com/cl_-oLgCQFkS7ZtvK5ItV.jpg"
                alt="UBA Logo"
                className="h-10"
              />
            </div>
            <p className="text-sm max-w-sm leading-relaxed" style={{ color: "#94a3b8" }}>
              The Union of Brand Ambassadors fights for the rights of promotional
              professionals across the nation. Legal protection, fair pay, and collective power.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest" style={{ color: "#64748b" }}>
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "#94a3b8" }}>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/agency-ratings" className="hover:text-white transition">Agency Ratings</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest" style={{ color: "#64748b" }}>
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "#94a3b8" }}>
              <li><Link href="/news" className="hover:text-white transition">News</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-xs uppercase tracking-widest" style={{ color: "#64748b" }}>
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "#94a3b8" }}>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p className="text-sm text-center sm:text-left" style={{ color: "#64748b" }}>
            &copy; {new Date().getFullYear()} UBA — Union of Brand Ambassadors. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#475569" }}>
            Protecting the People Who Build Brands&trade;
          </p>
        </div>
      </div>
    </footer>
  );
}
