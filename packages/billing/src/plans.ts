// @uba/billing — Stripe plan definitions
export const STRIPE_PRICES = {
  BA_MONTHLY: process.env.STRIPE_PRICE_BA_MONTHLY || "price_ba_monthly_10",
  BA_YEARLY: process.env.STRIPE_PRICE_BA_YEARLY || "price_ba_yearly_100",
  AGENCY_VERIFIED: process.env.STRIPE_PRICE_AGENCY_VERIFIED || "price_agency_99",
  BRAND_PARTNER: process.env.STRIPE_PRICE_BRAND_PARTNER || "price_brand_499",
} as const;

export type PlanId = keyof typeof STRIPE_PRICES;

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly?: number;
  stripePriceId: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const PLANS: Plan[] = [
  {
    id: "BA_MONTHLY",
    name: "BA Membership",
    description: "Essential protection and resources for brand ambassadors",
    priceMonthly: 10,
    stripePriceId: STRIPE_PRICES.BA_MONTHLY,
    features: [
      "Access to job board",
      "Complaint filing system",
      "Basic legal resources",
      "Community forum access",
      "Email support",
    ],
  },
  {
    id: "BA_YEARLY",
    name: "BA Membership (Annual)",
    description: "Save 17% with annual billing",
    priceMonthly: 100,
    priceYearly: 100,
    stripePriceId: STRIPE_PRICES.BA_YEARLY,
    highlighted: true,
    badge: "Best Value",
    features: [
      "Everything in Monthly",
      "Priority complaint handling",
      "Free legal consultation (1hr)",
      "Exclusive training webinars",
      "Priority job matching",
      "Annual membership kit",
    ],
  },
  {
    id: "AGENCY_VERIFIED",
    name: "Agency Verified",
    description: "Verified badge and premium staffing tools",
    priceMonthly: 99,
    stripePriceId: STRIPE_PRICES.AGENCY_VERIFIED,
    features: [
      "Verified agency badge",
      "Unlimited job postings",
      "Applicant management dashboard",
      "Agency profile & reviews",
      "Analytics & reporting",
      "Priority support",
    ],
  },
  {
    id: "BRAND_PARTNER",
    name: "Brand Partner",
    description: "Enterprise solution for major brands",
    priceMonthly: 499,
    stripePriceId: STRIPE_PRICES.BRAND_PARTNER,
    highlighted: true,
    badge: "Enterprise",
    features: [
      "Everything in Agency Verified",
      "Dedicated account manager",
      "Custom branding options",
      "API access",
      "Bulk hiring tools",
      "White-glove onboarding",
      "SLA guarantee",
      "Quarterly business reviews",
    ],
  },
];

export function getPlanById(id: PlanId): Plan | undefined {
  return PLANS.find(p => p.id === id);
}

export function getPlanByStripePriceId(priceId: string): Plan | undefined {
  return PLANS.find(p => p.stripePriceId === priceId);
}
