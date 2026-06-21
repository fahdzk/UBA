"use client";

import { ViolationForm } from "@/components/violations/ViolationForm";

export default function NewViolationPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">File a Violation</h1>
      <p className="text-sm text-slate-500">
        Report a violation by an agency. All reports are confidential and reviewed by UBA staff.
      </p>
      <ViolationForm />
    </div>
  );
}
