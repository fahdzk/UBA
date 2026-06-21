"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Upload, Check } from "lucide-react";

const VIOLATION_TYPES = [
  { value: "wage_theft", label: "Wage Theft", description: "Unpaid or underpaid wages" },
  { value: "late_payment", label: "Late Payment", description: "Payment received after agreed date" },
  { value: "hna_violation", label: "HNA Violation", description: "Failure to notify or pay for work" },
  { value: "retaliation", label: "Retaliation", description: "Punishment for reporting issues" },
  { value: "rate_change", label: "Rate Change Without Notice", description: "Pay rate changed after work completed" },
  { value: "unpaid_training", label: "Unpaid Training", description: "Required training without compensation" },
  { value: "other", label: "Other", description: "Other workplace violation" },
];

export function ViolationForm() {
  const [step, setStep] = useState(1);
  const [agency, setAgency] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amountOwed, setAmountOwed] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/violations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agency, type, description, amountOwed: parseFloat(amountOwed) || undefined, eventDate }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error("Violation submission failed:", err);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <Check className="mx-auto h-12 w-12 text-emerald-500" />
        <h2 className="mt-4 font-heading text-xl font-bold text-emerald-700">Violation Filed</h2>
        <p className="mt-2 text-sm text-emerald-600">
          Your violation has been submitted for review. A UBA administrator will be assigned to your case.
        </p>
        <p className="mt-2 text-xs text-slate-500">Case reference: UBA-2026-{Math.floor(Math.random() * 99999).toString().padStart(5, "0")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${s <= step ? "bg-brand-red text-white" : "bg-slate-200 text-slate-400"}`}>
              {s}
            </div>
            {s < 4 && <div className={`h-0.5 w-6 ${s < step ? "bg-brand-red" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Select Agency</h2>
          <div>
            <Label>Agency Name</Label>
            <Input value={agency} onChange={(e) => setAgency(e.target.value)} placeholder="Search for the agency..." />
            <p className="mt-1 text-xs text-slate-400">Start typing to search agencies</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} disabled={!agency} className="bg-brand-red hover:bg-brand-red-hover">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Violation Type</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {VIOLATION_TYPES.map((vt) => (
              <button
                key={vt.value}
                onClick={() => setType(vt.value)}
                className={`rounded-lg border p-3 text-left transition-all ${
                  type === vt.value
                    ? "border-brand-red bg-red-50 ring-2 ring-brand-red/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <p className="text-sm font-medium text-slate-900">{vt.label}</p>
                <p className="text-xs text-slate-500">{vt.description}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)} disabled={!type} className="bg-brand-red hover:bg-brand-red-hover">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Describe What Happened</h2>
          <div>
            <Label>Description (minimum 100 characters)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the violation..."
              rows={5}
              minLength={100}
            />
            <p className="mt-1 text-xs text-slate-400">{description.length}/100 minimum</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Amount Owed (if applicable)</Label>
              <Input type="number" value={amountOwed} onChange={(e) => setAmountOwed(e.target.value)} placeholder="0.00" />
            </div>
            <div>
              <Label>Event Date</Label>
              <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Evidence (optional)</Label>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">Drag & drop files or click to upload</p>
                <p className="text-xs text-slate-400">Photos, screenshots, contracts (max 8MB)</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={() => setStep(4)} disabled={description.length < 100} className="bg-brand-red hover:bg-brand-red-hover">
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="font-heading text-lg font-semibold text-slate-900">Review & Submit</h2>
          <div className="rounded-lg bg-slate-50 p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Agency</span>
              <span className="font-medium text-slate-900">{agency}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Type</span>
              <span className="font-medium text-slate-900 capitalize">{type.replace("_", " ")}</span>
            </div>
            {amountOwed && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Amount Owed</span>
                <span className="font-medium text-brand-red">${amountOwed}</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-3">
              <p className="text-xs text-slate-500">Description</p>
              <p className="mt-1 text-sm text-slate-700">{description}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
            <p className="text-xs text-amber-700">
              Submitting a false violation may result in account suspension. All reports are reviewed by UBA staff.
            </p>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(3)}>Back</Button>
            <Button onClick={handleSubmit} className="bg-brand-red hover:bg-brand-red-hover">
              Submit Violation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
