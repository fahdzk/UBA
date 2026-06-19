import Link from "next/link";

export default function ReportPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Link href="/" className="text-sm font-bold uppercase tracking-wide mb-8 inline-block" style={{ color: "#001f3f" }}>
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold mb-4" style={{ color: "#001f3f" }}>
          Report an Agency
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Experienced wage theft, retaliation, or unfair treatment? We're here to help. File a report and our team will review your case.
        </p>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#001f3f" }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#001f3f" }}>
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#001f3f" }}>
                Agency Name
              </label>
              <input
                type="text"
                placeholder="Agency name"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#001f3f]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#001f3f" }}>
                What happened?
              </label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#001f3f]">
                <option value="">Select an issue</option>
                <option value="wage-theft">Wage Theft / Unpaid Work</option>
                <option value="delayed-payment">Delayed Payment</option>
                <option value="retaliation">Retaliation</option>
                <option value="contract-violation">Contract Violation</option>
                <option value="unsafe-conditions">Unsafe Working Conditions</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#001f3f" }}>
                Details
              </label>
              <textarea
                rows={5}
                placeholder="Describe what happened..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#001f3f] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg font-extrabold text-sm uppercase tracking-widest hover:bg-red-700 transition-colors"
              style={{ backgroundColor: "#d90429" }}
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
