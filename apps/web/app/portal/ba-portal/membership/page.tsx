
import { Crown, Check, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Browse jobs", "Apply to jobs", "File complaints", "Basic profile"],
    cta: "Current Plan",
    current: true,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    features: ["Everything in Free", "Priority job alerts", "Featured profile", "Direct messaging", "Advanced analytics", "Priority support"],
    cta: "Upgrade to Pro",
    current: false,
    popular: true,
  },
  {
    name: "Elite",
    price: "$49",
    period: "/month",
    features: ["Everything in Pro", "Exclusive job access", "Legal consultation", "Resume review", "1-on-1 coaching", "Verified badge"],
    cta: "Upgrade to Elite",
    current: false,
  },
];

export default function BAMembershipPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Membership</h1>
      <p className="text-gray-500 mt-1">Choose the plan that fits your career goals</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-white rounded-xl p-6 shadow-sm border relative ${plan.popular ? "border-[#032B66] ring-2 ring-[#032B66]/20" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#032B66] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={12} /> Most Popular
              </div>
            )}
            <div className="text-center mb-6">
              <Crown size={24} className={`mx-auto mb-2 ${plan.popular ? "text-[#032B66]" : "text-gray-400"}`} />
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
                plan.current
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : plan.popular
                  ? "bg-[#032B66] text-white hover:bg-[#032B66]/90"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
