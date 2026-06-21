import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Users, Star, Scale, ArrowRight, Check } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-600">
              <span className="font-heading text-sm font-bold text-white">UBA</span>
            </div>
            <span className="font-heading text-lg font-bold text-slate-900">Union of Brand Ambassadors</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-slate-600 hover:text-slate-900">Features</Link>
            <Link href="#agencies" className="text-sm text-slate-600 hover:text-slate-900">For Agencies</Link>
            <Link href="#legal" className="text-sm text-slate-600 hover:text-slate-900">Legal Support</Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-brand-red hover:bg-brand-red-hover">Join UBA</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex min-h-[90vh] items-center justify-center pt-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-1.5">
            <Shield className="h-4 w-4 text-navy-600" />
            <span className="text-xs font-semibold text-navy-600">Protecting 50,000+ Brand Ambassadors</span>
          </div>
          <h1 className="font-heading text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
            The Union That <span className="text-brand-red">Fights</span> For You
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            UBA is the first organization built to protect brand ambassadors from wage theft, 
            unfair treatment, and agency abuse. Join thousands of workers standing together.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button size="lg" className="bg-brand-red hover:bg-brand-red-hover px-8">
                Join Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="px-8">Learn More</Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500">
            <div className="text-center">
              <p className="font-heading text-2xl font-bold text-slate-900">50K+</p>
              <p>Members</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center">
              <p className="font-heading text-2xl font-bold text-slate-900">2,400+</p>
              <p>Agencies Rated</p>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-center">
              <p className="font-heading text-2xl font-bold text-slate-900">$2.1M</p>
              <p>Recovered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900">Everything You Need</h2>
            <p className="mt-3 text-lg text-slate-600">Built by ambassadors, for ambassadors.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Star, title: "Agency Ratings", desc: "Transparent scoring system. Know which agencies pay fairly before you work." },
              { icon: Shield, title: "Violation Reporting", desc: "File violations directly through UBA. We investigate and take action." },
              { icon: Scale, title: "Legal Support", desc: "Get matched with qualified employment attorneys. UBA covers legal fees." },
              { icon: Users, title: "Community", desc: "Connect with fellow ambassadors. Share experiences and opportunities." },
              { icon: Check, title: "HNA Compliance", desc: "Agencies must notify you of decisions. We enforce the HNA standards." },
              { icon: ArrowRight, title: "Job Board", desc: "Find verified jobs from rated agencies. Know your worth before applying." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-900">Ready to Be Protected?</h2>
          <p className="mt-3 text-lg text-slate-600">
            Join UBA today. It&apos;s free to become a member. Agencies pay to post jobs and access our talent pool.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="mt-8 bg-brand-red hover:bg-brand-red-hover px-8">
              Join UBA Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-navy-600">
                <span className="font-heading text-xs font-bold text-white">UBA</span>
              </div>
              <span className="text-sm text-slate-500">© 2026 Union of Brand Ambassadors</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-900">Terms</Link>
              <Link href="/contact" className="hover:text-slate-900">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
