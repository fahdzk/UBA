// apps/web — Landing page (matches reference HTML exactly)
import Link from "next/link";

/* ── Inline styles for custom shapes that Tailwind can't do ── */
const styles = {
  heroSwoosh1: {
    position: "absolute" as const,
    top: "-10%",
    right: "-10%",
    width: "70%",
    height: "120%",
    background: "#001f3f",
    clipPath: "ellipse(80% 100% at 90% 50%)",
    zIndex: 1,
  },
  heroSwooshRed: {
    position: "absolute" as const,
    top: "-10%",
    right: 0,
    width: "75%",
    height: "120%",
    background: "#d90429",
    clipPath: "ellipse(80% 100% at 90% 50%)",
    zIndex: 0,
  },
  cardShadow: {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  },
};

export default function Home() {
  return (
    <>

      <main>
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative bg-white overflow-hidden">
          <div className="container mx-auto px-4 py-16 lg:py-24 flex flex-col lg:flex-row items-center relative z-10">
            {/* LEFT */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6" style={{ color: "#001f3f" }}>
                STOP WORKING <br />
                FOR LESS THAN <br />
                <span style={{ color: "#d90429" }} className="uppercase">
                  YOU&apos;RE WORTH.
                </span>
              </h1>
              <p className="text-gray-600 text-lg mb-10 max-w-lg leading-relaxed">
                The Union of Brand Ambassadors (UBA) protects you from lowball
                offers, wage theft, retaliation, and exploitation. We fight for
                fair pay, dignity, and respect.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/sign-up"
                  className="text-white px-8 py-4 rounded font-bold text-base uppercase flex items-center gap-2 hover:bg-red-700 transition-colors"
                  style={{ backgroundColor: "#d90429" }}
                >
                  Join UBA Today <i className="fas fa-arrow-right"></i>
                </Link>
                <Link
                  href="/report"
                  className="border-2 px-8 py-4 rounded font-bold text-base uppercase flex items-center gap-2 hover:text-white transition-colors"
                  style={{ borderColor: "#001f3f", color: "#001f3f" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#001f3f";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#001f3f";
                  }}
                >
                  Report an Agency <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-semibold">
                <i className="fas fa-check-circle" style={{ color: "#001f3f" }}></i>
                <span>$10/month. Full protection. Full support.</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:w-1/2 relative h-[500px] lg:h-[700px] w-full">
              {/* Background swoosh shapes */}
              <div className="absolute inset-0 z-0">
                <div style={styles.heroSwooshRed}></div>
                <div style={styles.heroSwoosh1}></div>
              </div>

              {/* Hero image */}
              <div className="absolute inset-0 z-10 flex justify-end items-end">
                <img
                  src="https://cdn.screenshottocode.com/SiWojH-tjUXJLCPMm83Th.png"
                  alt="Brand Ambassador"
                  className="h-full w-full object-cover object-center scale-110"
                />
              </div>

              {/* Stats Card */}
              <div
                className="absolute top-20 right-4 lg:right-10 bg-white p-6 rounded-xl w-72 border border-gray-100 z-20"
                style={styles.cardShadow}
              >
                <div className="space-y-6">
                  {/* Stat 1 */}
                  <div className="flex items-start gap-4">
                    <div className="text-xl pt-1" style={{ color: "#001f3f" }}>
                      <i className="fas fa-users"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold" style={{ color: "#001f3f" }}>500,000+</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-tighter leading-tight">
                        Brand Ambassadors <br /> in America
                      </div>
                    </div>
                  </div>
                  {/* Stat 2 */}
                  <div className="flex items-start gap-4">
                    <div className="text-xl pt-1" style={{ color: "#001f3f" }}>
                      <i className="far fa-clock"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold" style={{ color: "#d90429" }}>70%</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-tighter leading-tight">
                        Experience Delayed <br /> Payments
                      </div>
                    </div>
                  </div>
                  {/* Stat 3 */}
                  <div className="flex items-start gap-4">
                    <div className="text-xl pt-1" style={{ color: "#001f3f" }}>
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold" style={{ color: "#d90429" }}>45%</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-tighter leading-tight">
                        Have Experienced <br /> Wage Theft
                      </div>
                    </div>
                  </div>
                  {/* Stat 4 */}
                  <div className="flex items-start gap-4">
                    <div className="text-xl pt-1" style={{ color: "#001f3f" }}>
                      <i className="far fa-calendar-alt"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold" style={{ color: "#001f3f" }}>14 DAYS</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-tighter leading-tight">
                        Maximum Payment <br /> Deadline We Enforce
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ VALUE PROPOSITIONS ═══════════════ */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div
                className="bg-white p-8 rounded-2xl border border-gray-100 flex gap-6 items-start"
                style={styles.cardShadow}
              >
                <div
                  className="text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#001f3f" }}
                >
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div>
                  <h3
                    className="font-extrabold text-lg uppercase mb-2 tracking-wide"
                    style={{ color: "#001f3f" }}
                  >
                    Legal Protection
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Access to vetted employment lawyers and legal defense when
                    you need it most.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="bg-white p-8 rounded-2xl border border-gray-100 flex gap-6 items-start"
                style={styles.cardShadow}
              >
                <div
                  className="text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#001f3f" }}
                >
                  <i className="fas fa-hand-holding-usd"></i>
                </div>
                <div>
                  <h3
                    className="font-extrabold text-lg uppercase mb-2 tracking-wide"
                    style={{ color: "#001f3f" }}
                  >
                    Fair Pay Standards
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Industry-leading pay tiers starting at $25/hour with 20%
                    increases as you advance.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div
                className="bg-white p-8 rounded-2xl border border-gray-100 flex gap-6 items-start"
                style={styles.cardShadow}
              >
                <div
                  className="text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#001f3f" }}
                >
                  <i className="fas fa-users"></i>
                </div>
                <div>
                  <h3
                    className="font-extrabold text-lg uppercase mb-2 tracking-wide"
                    style={{ color: "#001f3f" }}
                  >
                    Collective Power
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    United voice. Stronger together. We hold agencies and brands
                    accountable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ MAIN INFO GRID ═══════════════ */}
        <section className="py-12 pb-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* ── CARD 1: PAY TIERS ── */}
              <div
                className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
                style={styles.cardShadow}
              >
                <div className="p-8 pb-4 flex justify-between items-start">
                  <div>
                    <h3
                      className="font-extrabold text-lg uppercase mb-1 tracking-wide"
                      style={{ color: "#001f3f" }}
                    >
                      Pay Tiers
                    </h3>
                    <p className="text-gray-500 text-xs font-semibold">
                      Clear. Fair. Progressive. 20% increases at every level.
                    </p>
                  </div>
                  <Link
                    href="/pay-tiers"
                    className="text-[10px] font-extrabold uppercase hover:underline"
                    style={{ color: "#d90429" }}
                  >
                    View All Tiers
                  </Link>
                </div>

                <div className="p-8 pt-4 flex-grow">
                  <div className="flex justify-between items-end gap-0.5 mb-8">
                    {[
                      { n: 1, img: "b9DSAgNapt7wI-971J_-g", label: "Entry Level BA", price: "$25.00" },
                      { n: 2, img: "r11oBD-ePtmRCxG1MZPT-", label: "Certified BA", price: "$30.00" },
                      { n: 3, img: "ZvIeUJ1IeftQiuniuXXdP", label: "Product Specialist", price: "$36.00" },
                      { n: 4, img: "R9i0NjXmg0yoDSTpaNnb1", label: "Team Lead", price: "$43.20" },
                      { n: 5, img: "Q57pc8893zdX87Tmbkhp1", label: "Master BA", price: "$51.84" },
                    ].map((tier) => (
                      <div key={tier.n} className="text-center flex-1">
                        <div className="text-[10px] font-extrabold text-gray-400 uppercase mb-1">
                          Tier
                        </div>
                        <div
                          className="text-2xl font-extrabold mb-4"
                          style={{ color: "#001f3f" }}
                        >
                          {tier.n}
                        </div>
                        <img
                          src={`https://cdn.screenshottocode.com/${tier.img}.png`}
                          alt={`Tier ${tier.n}`}
                          className="mx-auto h-7 mb-4"
                        />
                        <div className="text-[8px] font-bold text-gray-700 uppercase mb-4 leading-tight h-6">
                          {tier.label}
                        </div>
                        <div
                          className="text-lg font-extrabold leading-none"
                          style={{ color: "#001f3f" }}
                        >
                          {tier.price}
                        </div>
                        <div className="text-[7px] font-bold text-gray-400 uppercase">
                          / HOUR
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="relative pt-6">
                    <div className="h-0.5 bg-gray-100 w-full flex justify-between relative">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full -mt-[2px] z-10"
                          style={{ backgroundColor: "#d90429" }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1 px-1">
                      {[1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className="text-[8px] font-bold"
                          style={{ color: "#d90429" }}
                        >
                          +20%
                        </span>
                      ))}
                    </div>
                    <div
                      className="absolute top-[25px] left-0 right-0 h-0.5"
                      style={{ backgroundColor: "#d90429" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* ── CARD 2: AGENCY RATINGS ── */}
              <div
                className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
                style={styles.cardShadow}
              >
                <div className="p-8 pb-4 flex justify-between items-start">
                  <div>
                    <h3
                      className="font-extrabold text-lg uppercase mb-1 tracking-wide"
                      style={{ color: "#001f3f" }}
                    >
                      Agency Ratings
                    </h3>
                    <p className="text-gray-500 text-xs font-semibold">
                      Transparent ratings. Real reviews. Informed decisions.
                    </p>
                  </div>
                  <Link
                    href="/agency-ratings"
                    className="text-[10px] font-extrabold uppercase hover:underline"
                    style={{ color: "#d90429" }}
                  >
                    View All Agencies
                  </Link>
                </div>

                <div className="p-8 pt-4 space-y-4 flex-grow">
                  {/* Search */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Search agency name..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 text-xs focus:outline-none focus:ring-1"
                      style={{ "--tw-ring-color": "#001f3f" } as React.CSSProperties}
                    />
                    <i className="fas fa-search absolute right-3 top-2.5 text-gray-400 text-xs"></i>
                  </div>

                  {/* Agencies */}
                  <div className="space-y-4">
                    {[
                      {
                        initials: "EV",
                        bg: "bg-black",
                        name: "Elevate Marketing",
                        stars: 5,
                        score: 92,
                        scoreColor: "text-green-500",
                        label: "Trusted Partner",
                      },
                      {
                        initials: "PR",
                        bg: "bg-gray-800",
                        name: "Premier Promotions",
                        stars: 4,
                        score: 68,
                        scoreColor: "text-orange-400",
                        label: "Monitor",
                      },
                      {
                        initials: "AC",
                        bg: "bg-slate-700",
                        name: "Activate Staffing",
                        stars: 2,
                        score: 35,
                        scoreColor: "text-red-500",
                        label: "High Risk",
                      },
                    ].map((agency) => (
                      <div
                        key={agency.name}
                        className="flex items-center justify-between border-b border-gray-50 pb-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 ${agency.bg} text-white rounded-full flex items-center justify-center font-bold text-xs`}
                          >
                            {agency.initials}
                          </div>
                          <div>
                            <div
                              className="text-xs font-bold"
                              style={{ color: "#001f3f" }}
                            >
                              {agency.name}
                            </div>
                            <div className="flex text-[8px] text-yellow-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <i
                                  key={i}
                                  className={
                                    i < agency.stars
                                      ? "fas fa-star"
                                      : "far fa-star text-gray-300"
                                  }
                                ></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div
                            className={`text-2xl font-extrabold ${agency.scoreColor}`}
                          >
                            {agency.score}
                          </div>
                          <div className="text-[8px] font-bold text-gray-400 uppercase w-20">
                            {agency.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-gray-50 text-center">
                  <Link
                    href="/agency-ratings"
                    className="text-[10px] font-extrabold uppercase flex items-center justify-center gap-2 hover:underline"
                    style={{ color: "#d90429" }}
                  >
                    See how we rate agencies <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              {/* ── CARD 3: MEMBERSHIP ── */}
              <div
                className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
                style={styles.cardShadow}
              >
                <div className="p-8 pb-4">
                  <h3
                    className="font-extrabold text-lg uppercase mb-1 tracking-wide"
                    style={{ color: "#001f3f" }}
                  >
                    Membership
                  </h3>
                  <p className="text-gray-500 text-xs font-semibold">
                    Full protection. Full support. One low price.
                  </p>
                </div>

                <div className="p-8 pt-4 flex-grow flex flex-col">
                  <div className="flex items-start gap-4 mb-8">
                    <div
                      className="text-5xl font-extrabold leading-none"
                      style={{ color: "#d90429" }}
                    >
                      $10
                    </div>
                    <div className="pt-1">
                      <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-tighter">
                        / Month
                      </div>
                      <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-tighter">
                        Cancel Anytime
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6">
                    <ul className="space-y-3 flex-1">
                      {[
                        "Legal consultation & defense",
                        "Contract review",
                        "Dispute resolution",
                        "Agency ratings & alerts",
                        "Certification & career growth",
                        "Community & resources",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-[10px] font-extrabold text-gray-700 uppercase tracking-tight"
                        >
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "#001f3f" }}
                          ></i>{" "}
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="lg:w-40 shrink-0">
                      <img
                        src="https://cdn.screenshottocode.com/L4w8_bGROtFcqWO85T2Yl.png"
                        alt="UBA Member Card"
                        className="w-full drop-shadow-xl"
                        style={{ transform: "rotate(-2deg)" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <Link
                    href="/sign-up"
                    className="w-full text-white py-3 rounded-lg font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
                    style={{ backgroundColor: "#d90429" }}
                  >
                    Join UBA Now <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
