// apps/web — Pricing page
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "@uba/ui/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@uba/ui/components/card";
import { Badge } from "@uba/ui/components/badge";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "BA Monthly",
    price: "$10",
    period: "/month",
    desc: "Essential protection for brand ambassadors",
    features: ["Access to job board", "Complaint filing system", "Basic legal resources", "Community forum", "Email support"],
    badge: null,
  },
  {
    name: "BA Annual",
    price: "$100",
    period: "/year",
    desc: "Save 17% with annual billing",
    features: ["Everything in Monthly", "Priority complaint handling", "Free legal consultation (1hr)", "Exclusive training webinars", "Priority job matching", "Annual membership kit"],
    badge: "Best Value",
  },
  {
    name: "Agency Verified",
    price: "$99",
    period: "/month",
    desc: "Verified badge and premium staffing tools",
    features: ["Verified agency badge", "Unlimited job postings", "Applicant management", "Agency profile & reviews", "Analytics & reporting", "Priority support"],
    badge: null,
  },
  {
    name: "Brand Partner",
    price: "$499",
    period: "/month",
    desc: "Enterprise solution for major brands",
    features: ["Everything in Agency Verified", "Dedicated account manager", "Custom branding options", "API access", "Bulk hiring tools", "White-glove onboarding", "SLA guarantee"],
    badge: "Enterprise",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#032B66]">Pricing</h1>
          <p className="mt-4 text-lg text-gray-600">Choose the plan that fits your needs</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.badge === "Best Value" ? "border-[#032B66] shadow-lg scale-105" : ""}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant={plan.badge === "Enterprise" ? "destructive" : "default"}>{plan.badge}</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-black text-[#032B66]">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full" variant={plan.badge === "Best Value" ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
