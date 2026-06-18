// apps/web — News listing page
import Link from "next/link";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Calendar, ArrowRight } from "lucide-react";

const newsArticles = [
  {
    slug: "uba-welcomes-5000-new-members-2026",
    title: "UBA Welcomes 5,000 New Members in Q1 2026",
    excerpt:
      "The Union of Brand Ambassadors continues its rapid growth trajectory, onboarding over 5,000 new members in the first quarter alone. This milestone reflects increasing demand for ambassador protections nationwide.",
    date: "June 15, 2026",
    category: "Membership",
  },
  {
    slug: "new-partnership-with-major-retail-brands",
    title: "New Partnership Brings Major Retail Brands into UBA Network",
    excerpt:
      "Three national retail chains have signed agreements to work exclusively with UBA-verified agencies, ensuring fair treatment and proper compensation for all brand ambassadors.",
    date: "June 10, 2026",
    category: "Partnerships",
  },
  {
    slug: "legal-victory-wage-theft-protection",
    title: "Legal Victory: UBA Secures $2M Settlement in Wage Theft Case",
    excerpt:
      "After a year-long legal battle, UBA's legal team has secured a landmark settlement on behalf of 147 brand ambassadors who were systematically underpaid by a staffing agency.",
    date: "June 5, 2026",
    category: "Legal",
  },
  {
    slug: "ambassador-safety-training-program-launched",
    title: "UBA Launches Nationwide Ambassador Safety Training Program",
    excerpt:
      "Our new comprehensive safety training program covers workplace rights, de-escalation techniques, and emergency protocols. The program will be available in all 50 states by year end.",
    date: "May 28, 2026",
    category: "Programs",
  },
  {
    slug: "annual-conference-2026-save-the-date",
    title: "Save the Date: UBA Annual Ambassador Conference 2026",
    excerpt:
      "Mark your calendars for September 12-14, 2026. Our annual conference returns to Washington DC with keynote speakers, workshops, and networking opportunities for all members.",
    date: "May 20, 2026",
    category: "Events",
  },
  {
    slug: "transparency-report-q1-2026-published",
    title: "Q1 2026 Transparency Report: 340 Complaints Resolved",
    excerpt:
      "UBA's latest transparency report shows a 94% resolution rate for member complaints, with an average resolution time of just 12 business days. Full report details inside.",
    date: "May 15, 2026",
    category: "Reports",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#032B66] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Latest News</h1>
          <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
            Stay updated with the latest from UBA — member stories, legal victories,
            program announcements, and industry insights.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Cover Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-[#032B66] to-[#032B66]/70 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                      <span className="text-white text-xl font-bold">U</span>
                    </div>
                    <span className="text-blue-200 text-xs font-medium uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4" />
                    <time>{article.date}</time>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#032B66] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <Link
                    href={`/news/${article.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#F21B23] hover:text-[#F21B23]/80 transition-colors"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#032B66]">Stay Informed</h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Subscribe to our newsletter and never miss an important update from UBA.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#032B66] focus:outline-none focus:ring-2 focus:ring-[#032B66]/20"
            />
            <button
              type="button"
              className="w-full sm:w-auto rounded-lg bg-[#F21B23] px-6 py-3 font-semibold text-white hover:bg-[#F21B23]/90 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
