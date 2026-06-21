"use client";

import { LegalIntakeForm } from "@/components/legal/LegalIntakeForm";

export default function LegalIntakePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Legal Case Intake</h1>
      <p className="text-sm text-slate-500">
        Submit your case for legal review. We&apos;ll match you with a qualified attorney.
      </p>
      <LegalIntakeForm />
    </div>
  );
}
