import Link from "next/link";

const tiers = [
  { n: 1, label: "Entry Level BA", price: "$25.00", desc: "Starting rate for new brand ambassadors with basic training completed." },
  { n: 2, label: "Certified BA", price: "$30.00", desc: "Completed UBA certification program and demonstrated field competence." },
  { n: 3, label: "Product Specialist", price: "$36.00", desc: "Advanced product knowledge and proven sales performance." },
  { n: 4, label: "Team Lead", price: "$43.20", desc: "Leadership role managing teams of ambassadors at events." },
  { n: 5, label: "Master BA", price: "$51.84", desc: "Top tier. Expert-level ambassador with years of proven results." },
];

export default function PayTiersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 sm:py-16 max-w-4xl">
        <Link href="/" className="text-sm font-bold uppercase tracking-wide mb-6 sm:mb-8 inline-block" style={{ color: "#001f3f" }}>
          ← Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: "#001f3f" }}>
          Pay Tiers
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-12">
          Clear. Fair. Progressive. 20% increases at every level.
        </p>

        <div className="space-y-3 sm:space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.n}
              className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 shadow-sm"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-extrabold shrink-0"
                style={{ backgroundColor: "#001f3f" }}
              >
                {tier.n}
              </div>
              <div className="flex-grow">
                <h3 className="font-extrabold text-base sm:text-lg uppercase tracking-wide" style={{ color: "#001f3f" }}>
                  {tier.label}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">{tier.desc}</p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#d90429" }}>
                  {tier.price}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">/ HOUR</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/sign-up"
            className="inline-block text-white px-6 sm:px-8 py-3 sm:py-4 rounded font-bold text-sm sm:text-base uppercase hover:bg-red-700 transition-colors"
            style={{ backgroundColor: "#d90429" }}
          >
            Join UBA to Access These Rates
          </Link>
        </div>
      </div>
    </main>
  );
}
