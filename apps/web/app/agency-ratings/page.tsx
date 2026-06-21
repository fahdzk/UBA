import Link from "next/link";

const agencies = [
  { initials: "EV", bg: "bg-black", name: "Elevate Marketing", stars: 5, score: 92, scoreColor: "text-green-500", label: "Trusted Partner", reviews: 128 },
  { initials: "PR", bg: "bg-gray-800", name: "Premier Promotions", stars: 4, score: 68, scoreColor: "text-orange-400", label: "Monitor", reviews: 95 },
  { initials: "AC", bg: "bg-slate-700", name: "Activate Staffing", stars: 2, score: 35, scoreColor: "text-red-500", label: "High Risk", reviews: 67 },
  { initials: "ST", bg: "bg-zinc-800", name: "Street Team Pro", stars: 5, score: 88, scoreColor: "text-green-500", label: "Trusted Partner", reviews: 203 },
  { initials: "BR", bg: "bg-neutral-700", name: "Brand Force", stars: 3, score: 55, scoreColor: "text-yellow-500", label: "Average", reviews: 42 },
  { initials: "MX", bg: "bg-stone-700", name: "Max Impact Events", stars: 1, score: 22, scoreColor: "text-red-500", label: "High Risk", reviews: 18 },
];

export default function AgencyRatingsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 sm:py-16 max-w-4xl">
        <Link href="/" className="text-sm font-bold uppercase tracking-wide mb-6 sm:mb-8 inline-block" style={{ color: "#001f3f" }}>
          ← Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: "#001f3f" }}>
          Agency Ratings
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-12">
          Transparent ratings. Real reviews. Informed decisions.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search agency name..."
                className="w-full bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
              />
              <i className="fas fa-search absolute right-3 top-2.5 text-gray-400 text-sm"></i>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {agencies.map((agency) => (
              <div
                key={agency.name}
                className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${agency.bg} text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0`}
                  >
                    {agency.initials}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: "#001f3f" }}>
                      {agency.name}
                    </div>
                    <div className="flex text-xs text-yellow-400 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={i < agency.stars ? "fas fa-star" : "far fa-star text-gray-300"}
                        ></i>
                      ))}
                      <span className="text-gray-400 ml-2 text-[10px]">({agency.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-8 sm:pl-14">
                  <div className={`text-2xl sm:text-3xl font-extrabold ${agency.scoreColor}`}>
                    {agency.score}
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase text-right">
                    {agency.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/report"
            className="inline-block border-2 border-[#001f3f] text-[#001f3f] px-6 sm:px-8 py-3 sm:py-4 rounded font-bold text-sm sm:text-base uppercase hover:bg-[#001f3f] hover:text-white transition-colors"
          >
            Report an Agency
          </Link>
        </div>
      </div>
    </main>
  );
}
