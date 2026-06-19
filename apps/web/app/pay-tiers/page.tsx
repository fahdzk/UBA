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
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-sm font-bold uppercase tracking-wide mb-8 inline-block" style={{ color: "#001f3f" }}>
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold mb-2" style={{ color: "#001f3f" }}>
          Pay Tiers
        </h1>
        <p className="text-gray-600 text-lg mb-12">
          Clear. Fair. Progressive. 20% increases at every level.
        </p>

        <div className="space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.n}
              className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-6 shadow-sm"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-extrabold shrink-0"
                style={{ backgroundColor: "#001f3f" }}
              >
                {tier.n}
              </div>
              <div className="flex-grow">
                <h3 className="font-extrabold text-lg uppercase tracking-wide" style={{ color: "#001f3f" }}>
                  {tier.label}
                </h3>
                <p className="text-gray-500 text-sm">{tier.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-extrabold" style={{ color: "#d90429" }}>
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
            className="inline-block text-white px-8 py-4 rounded font-bold text-base uppercase hover:bg-red-700 transition-colors"
            style={{ backgroundColor: "#d90429" }}
          >
            Join UBA to Access These Rates
          </Link>
        </div>
      </div>
    </main>
  );
}
