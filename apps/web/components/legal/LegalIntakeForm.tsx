"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Scale, Upload, Check } from "lucide-react";

const CASE_TYPES = [
  { value: "wage_theft", label: "Wage Theft", description: "Unpaid or underpaid wages" },
  { value: "misclassification", label: "Misclassification", description: "Incorrectly classified as independent contractor" },
  { value: "retaliation", label: "Retaliation", description: "Punishment for reporting violations" },
  { value: "contract_dispute", label: "Contract Dispute", description: "Breach of contract terms" },
  { value: "hna", label: "HNA Violation", description: "Failed to notify or pay for work" },
];

export function LegalIntakeForm() {
  const [step, setStep] = useState(1);
  const [caseType, setCaseType] = useState("");
  const [summary, setSummary] = useState("");
  const [amountClaimed, setAmountClaimed] = useState("");
  const [state, setState] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/legal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseType, summary, amountClaimed: parseFloat(amountClaimed) || undefined, state }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error("Legal intake failed:", err);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <Check className="mx-auto h-12 w-12 text-emerald-500" />
        <h2 className="mt-4 font-heading text-xl font-bold text-emerald-700">Case Submitted</h2>
        <p className="mt-2 text-sm text-emerald-600">
          Your legal case has been submitted. A UBA legal coordinator will review and match you with an attorney.
        </p>
        <p className="mt-2 text-xs text-slate-500">You&apos;ll be notified within 48 hours.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${s <= step ? "bg-navy-600 text-white" : "bg-slate-200 text-slate-400"}`}>
              {s}
            </div>
            {s < 3 && <div className={`h-0.5 w-6 ${s < step ? "bg-navy-600" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Case Type</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {CASE_TYPES.map((ct) => (
              <button
                key={ct.value}
                onClick={() => setCaseType(ct.value)}
                className={`rounded-lg border p-3 text-left transition-all ${
                  caseType === ct.value
                    ? "border-navy-600 bg-navy-50 ring-2 ring-navy-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <p className="text-sm font-medium text-slate-900">{ct.label}</p>
                <p className="text-xs text-slate-500">{ct.description}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!caseType} className="bg-brand-red hover:bg-brand-red-hover">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Case Details</h2>
          <div>
            <Label>Summary</Label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe your case in detail..."
              rows={5}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Amount Claimed (optional)</Label>
              <Input type="number" value={amountClaimed} onChange={(e) => setAmountClaimed(e.target.value)} placeholder="0.00" />
            </div>
            <div>
              <Label>State (jurisdiction)</Label>
              <Input value={state} onChange={(e) => setState(e.target.value.toUpperCase())} placeholder="CA" maxLength={2} />
            </div>
          </div>
          <div>
            <Label>Supporting Documents (optional)</Label>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">Upload contracts, evidence, correspondence</p>
                <p className="text-xs text-slate-400">PDF, JPG, PNG. Max 32MB.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)} disabled={!summary || !state} className="bg-brand-red hover:bg-brand-red-hover">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Review & Submit</h2>
          <div className="rounded-lg bg-slate-50 p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Case Type</span>
              <span className="font-medium text-slate-900 capitalize">{caseType.replace("_", " ")}</span>
            </div>
            {amountClaimed && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Amount Claimed</span>
                <span className="font-medium text-slate-900">${amountClaimed}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">State</span>
              <span className="font-medium text-slate-900">{state}</span>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <p className="text-xs text-slate-500">Summary</p>
              <p className="mt-1 text-sm text-slate-700">{summary}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={handleSubmit} className="bg-brand-red hover:bg-brand-red-hover">
              Submit Case
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
