// apps/web — Single News Article page
import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";

interface NewsArticleProps {
  params: Promise<{ slug: string }>;
}

const articleData: Record<string, {
  title: string;
  author: string;
  date: string;
  category: string;
  content: string[];
}> = {
  "uba-welcomes-5000-new-members-2026": {
    title: "UBA Welcomes 5,000 New Members in Q1 2026",
    author: "Amara Thompson",
    date: "June 15, 2026",
    category: "Membership",
    content: [
      "The Union of Brand Ambassadors (UBA) is proud to announce that we have onboarded over 5,000 new members during the first quarter of 2026, marking one of the largest growth periods in the organization's history.",
      "This milestone reflects the increasing demand for protections and support among brand ambassadors across the country. From retail floors to promotional events, ambassadors have been seeking a collective voice — and UBA is answering that call.",
      "\"We're seeing unprecedented interest from ambassadors who want to be part of something bigger,\" said Marcus Chen, Executive Director of UBA. \"They know that together, we have the power to demand fair treatment, safe working conditions, and proper compensation.\"",
      "The new members span 48 states, with particularly strong growth in California, Texas, and Florida. Each new member gains access to UBA's full suite of benefits, including legal support, complaint filing, job board access, and community forums.",
      "UBA's Member Services team has been working tirelessly to ensure every new member receives a personalized onboarding experience. \"We assign each new member a dedicated support contact during their first 90 days,\" explained Sarah Williams, Director of Member Services. \"This helps them understand their rights and how to make the most of their membership.\"",
      "Looking ahead, UBA plans to expand its regional chapters to better serve the growing membership base. New chapters are planned for Phoenix, Atlanta, and Chicago, with local leadership teams already being assembled.",
      "For those interested in joining UBA, membership applications are open year-round. Visit our membership page to learn more about the benefits of being part of the Union of Brand Ambassadors.",
    ],
  },
  "new-partnership-with-major-retail-brands": {
    title: "New Partnership Brings Major Retail Brands into UBA Network",
    author: "Elena Rodriguez",
    date: "June 10, 2026",
    category: "Partnerships",
    content: [
      "Three major retail brands have officially partnered with the Union of Brand Ambassadors, agreeing to work exclusively with UBA-verified staffing agencies for their brand ambassador programs.",
      "This landmark agreement ensures that thousands of brand ambassadors working for these national retailers will be protected by UBA's standards for fair wages, safe working conditions, and transparent communication.",
      "\"These partnerships represent a fundamental shift in how the industry operates,\" said Elena Rodriguez, Director of Agency Relations. \"When brands commit to working only with verified agencies, it creates a ripple effect that raises standards across the entire sector.\"",
      "Under the terms of the agreements, staffing agencies must maintain UBA verification status, which includes regular audits, compliance with fair wage standards, and participation in UBA's complaint resolution process.",
      "The partnership also gives UBA members priority access to positions with these brands, creating new opportunities for steady, well-compensated work.",
      "Industry analysts predict that these agreements will encourage other major brands to follow suit, potentially transforming the brand ambassador landscape nationwide.",
    ],
  },
  "legal-victory-wage-theft-protection": {
    title: "Legal Victory: UBA Secures $2M Settlement in Wage Theft Case",
    author: "David Okonkwo",
    date: "June 5, 2026",
    category: "Legal",
    content: [
      "After a year-long legal battle, the Union of Brand Ambassadors has secured a landmark $2 million settlement on behalf of 147 brand ambassadors who were systematically underpaid by a national staffing agency.",
      "The case, which was first filed in May 2025, alleged that the agency routinely shaved hours from timesheets, failed to pay overtime, and in some cases, withheld final paychecks entirely.",
      "\"This settlement sends a clear message: wage theft will not be tolerated,\" said David Okonkwo, Director of Legal Affairs. \"Every ambassador deserves to be paid fairly and fully for their work. When agencies violate that trust, UBA will fight to make it right.\"",
      "The affected ambassadors, who worked promotional events across 12 states, will receive an average of approximately $13,600 each in back pay and damages.",
      "The staffing agency has also agreed to implement new payroll monitoring systems and submit to quarterly audits for the next three years as part of the settlement.",
      "UBA encourages any ambassador who suspects wage theft to contact the legal team immediately. \"The sooner we know about it, the sooner we can help,\" added Okonkwo.",
    ],
  },
  "ambassador-safety-training-program-launched": {
    title: "UBA Launches Nationwide Ambassador Safety Training Program",
    author: "James Nakamura",
    date: "May 28, 2026",
    category: "Programs",
    content: [
      "UBA has officially launched its comprehensive Ambassador Safety Training Program, designed to equip all members with the knowledge and skills they need to stay safe and assert their rights in the workplace.",
      "The program covers a wide range of topics including workplace rights and protections, de-escalation techniques, emergency protocols, recognizing unsafe conditions, and legal recourse options.",
      "\"Safety is non-negotiable,\" said James Nakamura, Director of Operations. \"Whether you're working a product launch or a large-scale event, you have the right to feel safe. This program gives ambassadors the tools to protect themselves and each other.\"",
      "The training is available both online and through in-person workshops hosted by UBA regional chapters. All current members can access the program at no additional cost.",
      "The curriculum was developed in collaboration with workplace safety experts, employment attorneys, and experienced brand ambassadors who shared real-world scenarios and best practices.",
      "UBA plans to make the program available in all 50 states by the end of 2026, with Spanish-language versions launching in July.",
    ],
  },
  "annual-conference-2026-save-the-date": {
    title: "Save the Date: UBA Annual Ambassador Conference 2026",
    author: "Amara Thompson",
    date: "May 20, 2026",
    category: "Events",
    content: [
      "The Union of Brand Ambassadors is excited to announce that the Annual Ambassador Conference 2026 will take place September 12-14 at the Washington Convention Center in Washington, DC.",
      "This year's conference theme — \"Stronger Together: Building the Future of Brand Ambassadors\" — reflects UBA's commitment to unity, growth, and collective action.",
      "The three-day event will feature keynote speakers from labor rights organizations, interactive workshops on career development, panel discussions with agency leaders, and extensive networking opportunities.",
      "\"Last year's conference sold out in weeks, and this year we're going bigger,\" said Amara Thompson, Director of Communications. \"We're expecting over 2,000 attendees and an agenda packed with actionable insights.\"",
      "Early bird registration will open on July 1, 2026. UBA members receive a discounted rate, and first-time attendees can apply for travel scholarships through the conference website.",
      "Exhibitor and sponsor opportunities are also available. Organizations interested in participating should contact UBA's partnerships team.",
    ],
  },
  "transparency-report-q1-2026-published": {
    title: "Q1 2026 Transparency Report: 340 Complaints Resolved",
    author: "David Okonkwo",
    date: "May 15, 2026",
    category: "Reports",
    content: [
      "UBA has published its Q1 2026 Transparency Report, revealing that 340 member complaints were resolved during the first three months of the year with a 94% resolution rate.",
      "The average resolution time was just 12 business days — a significant improvement from 15 days in the previous quarter. UBA's legal team attributes this improvement to new case management systems and increased staffing.",
      "Transparency is one of our core values,\" said David Okonkwo, Director of Legal Affairs. \"Our members deserve to know that when they file a complaint, it's being taken seriously and resolved efficiently.\"",
      "The report also highlights key trends: payment disputes remained the most common complaint category (42%), followed by scheduling issues (28%) and workplace safety concerns (18%).",
      "UBA's complaint system allows members to file, track, and receive updates on their cases in real time through the member dashboard. Each case is assigned a dedicated coordinator who ensures consistent communication.",
      "The full report, including detailed statistics and anonymized case studies, is available for download on UBA's transparency page.",
    ],
  },
};

// Default article for unknown slugs
const defaultArticle = {
  title: "Article Not Found",
  author: "UBA Team",
  date: "2026",
  category: "News",
  content: [
    "The article you're looking for could not be found. It may have been moved or removed. Please check our news listing for the latest articles from UBA.",
  ],
};

export default async function NewsArticlePage({ params }: NewsArticleProps) {
  const { slug } = await params;
  const article = articleData[slug] || defaultArticle;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#032B66] py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white uppercase tracking-wider mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-blue-200">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-sm">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time className="text-sm">{article.date}</time>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Cover Image Placeholder */}
          <div className="relative h-64 sm:h-80 rounded-xl bg-gradient-to-br from-[#032B66] to-[#032B66]/70 flex items-center justify-center mb-10">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-3">
                <span className="text-white text-2xl font-bold">U</span>
              </div>
              <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                {article.category}
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Share this article</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#032B66] hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#032B66] hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Back to News */}
          <div className="mt-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-lg bg-[#032B66] px-6 py-3 font-semibold text-white hover:bg-[#032B66]/90 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to All News
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
