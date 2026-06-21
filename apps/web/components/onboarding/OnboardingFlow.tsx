"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { StepUsername } from "./StepUsername";
import { StepRole } from "./StepRole";
import { StepPosition } from "./StepPosition";
import { StepComplete } from "./StepComplete";
import { cn } from "@/lib/utils";

const STEPS = ["Username", "Role", "Details", "Complete"];

export function OnboardingFlow() {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    username: "",
    role: "member" as string,
    positionType: "",
    city: "",
    state: "",
    yearsExperience: 0,
    bio: "",
  });

  const update = useCallback((partial: Record<string, unknown>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const next = useCallback(() => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    }
  }, [step]);

  const prev = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }, [step]);

  const finish = useCallback(async () => {
    try {
      const res = await fetch("/api/users/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await user?.reload();
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Onboarding failed:", err);
    }
  }, [data, router, user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  i <= step
                    ? "bg-navy-600 text-white"
                    : "bg-slate-200 text-slate-400"
                )}
              >
                {i + 1}
              </div>
              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  i <= step ? "text-navy-600" : "text-slate-400"
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-3 h-0.5 w-8",
                    i < step ? "bg-navy-600" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {step === 0 && <StepUsername data={data} update={update} onNext={next} />}
          {step === 1 && <StepRole data={data} update={update} onNext={next} onPrev={prev} />}
          {step === 2 && <StepPosition data={data} update={update} onNext={next} onPrev={prev} />}
          {step === 3 && <StepComplete data={data} onPrev={prev} onFinish={finish} />}
        </div>
      </div>
    </div>
  );
}
