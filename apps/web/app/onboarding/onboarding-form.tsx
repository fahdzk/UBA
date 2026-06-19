"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@uba/ui/components/button";
import { Card, CardContent } from "@uba/ui/components/card";
import { Input } from "@uba/ui/components/input";
import { Label } from "@uba/ui/components/label";
import { Textarea } from "@uba/ui/components/textarea";
import { Select } from "@uba/ui/components/select";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

type Role = "brand_ambassador" | "agency" | "lawyer";

interface BasicInfo {
  firstName: string;
  lastName: string;
  phone: string;
}

interface BAFields {
  city: string;
  state: string;
  specialties: string;
  yearsExperience: string;
}

interface AgencyFields {
  companyName: string;
  website: string;
  description: string;
}

interface LawyerFields {
  barNumber: string;
  firmName: string;
  specialties: string;
  jurisdiction: string;
}

const STEPS = ["Basic Info", "Select Role", "Role Details"] as const;

export function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [role, setRole] = useState<Role | "">("");

  const [baFields, setBaFields] = useState<BAFields>({
    city: "",
    state: "",
    specialties: "",
    yearsExperience: "",
  });

  const [agencyFields, setAgencyFields] = useState<AgencyFields>({
    companyName: "",
    website: "",
    description: "",
  });

  const [lawyerFields, setLawyerFields] = useState<LawyerFields>({
    barNumber: "",
    firmName: "",
    specialties: "",
    jurisdiction: "",
  });

  const canProceed = (): boolean => {
    if (step === 0) {
      return basicInfo.firstName.trim() !== "" && basicInfo.lastName.trim() !== "";
    }
    if (step === 1) {
      return role !== "";
    }
    if (step === 2) {
      if (role === "brand_ambassador") {
        return baFields.city.trim() !== "" && baFields.state.trim() !== "";
      }
      if (role === "agency") {
        return agencyFields.companyName.trim() !== "";
      }
      if (role === "lawyer") {
        return lawyerFields.barNumber.trim() !== "" && lawyerFields.jurisdiction.trim() !== "";
      }
    }
    return false;
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const payload = {
        ...basicInfo,
        role,
        roleDetails:
          role === "brand_ambassador"
            ? baFields
            : role === "agency"
              ? agencyFields
              : lawyerFields,
      };

      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await res.json();
      router.push(data.redirectUrl || "/dashboard");
    } catch (err) {
      console.error("Onboarding error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  i <= step
                    ? "bg-[#032B66] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`hidden sm:inline text-sm font-medium ${
                  i <= step ? "text-[#032B66]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-8 ${i < step ? "bg-[#032B66]" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: Basic Info */}
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            <p className="text-sm text-gray-500">Let&apos;s start with your name and contact info.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={basicInfo.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBasicInfo({ ...basicInfo, firstName: e.target.value })
                  }
                  placeholder="Jane"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={basicInfo.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBasicInfo({ ...basicInfo, lastName: e.target.value })
                  }
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={basicInfo.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBasicInfo({ ...basicInfo, phone: e.target.value })
                }
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        )}

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Select Your Role</h2>
            <p className="text-sm text-gray-500">
              Choose the role that best describes you. This determines your portal experience.
            </p>
            <div className="grid gap-3">
              {[
                {
                  value: "brand_ambassador" as Role,
                  label: "Brand Ambassador",
                  desc: "File complaints, access jobs, and get legal support.",
                },
                {
                  value: "agency" as Role,
                  label: "Agency",
                  desc: "Post jobs, manage ambassadors, and build your reputation.",
                },
                {
                  value: "lawyer" as Role,
                  label: "Lawyer",
                  desc: "Provide legal representation and manage cases.",
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  className={`flex flex-col rounded-lg border-2 p-4 text-left transition-colors ${
                    role === opt.value
                      ? "border-[#032B66] bg-[#032B66]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-semibold text-gray-900">{opt.label}</span>
                  <span className="text-sm text-gray-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Role-Specific Fields */}
        {step === 2 && role === "brand_ambassador" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Brand Ambassador Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={baFields.city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBaFields({ ...baFields, city: e.target.value })
                  }
                  placeholder="Los Angeles"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={baFields.state}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBaFields({ ...baFields, state: e.target.value })
                  }
                  placeholder="CA"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="ba-specialties">Specialties</Label>
              <Input
                id="ba-specialties"
                value={baFields.specialties}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBaFields({ ...baFields, specialties: e.target.value })
                }
                placeholder="e.g. Beverage, Tech, Fashion"
              />
            </div>
            <div>
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Select
                value={baFields.yearsExperience}
                onValueChange={(val) =>
                  setBaFields({ ...baFields, yearsExperience: val })
                }
              >
                <option value="">Select&hellip;</option>
                <option value="0-1">0–1 years</option>
                <option value="2-3">2–3 years</option>
                <option value="4-5">4–5 years</option>
                <option value="6+">6+ years</option>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && role === "agency" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Agency Details</h2>
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={agencyFields.companyName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAgencyFields({ ...agencyFields, companyName: e.target.value })
                }
                placeholder="Acme Staffing Inc."
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={agencyFields.website}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAgencyFields({ ...agencyFields, website: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={agencyFields.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAgencyFields({ ...agencyFields, description: e.target.value })
                }
                placeholder="Tell us about your agency&hellip;"
                rows={4}
              />
            </div>
          </div>
        )}

        {step === 2 && role === "lawyer" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Lawyer Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="barNumber">Bar Number *</Label>
                <Input
                  id="barNumber"
                  value={lawyerFields.barNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLawyerFields({ ...lawyerFields, barNumber: e.target.value })
                  }
                  placeholder="123456"
                />
              </div>
              <div>
                <Label htmlFor="jurisdiction">Jurisdiction *</Label>
                <Input
                  id="jurisdiction"
                  value={lawyerFields.jurisdiction}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLawyerFields({ ...lawyerFields, jurisdiction: e.target.value })
                  }
                  placeholder="e.g. California"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="firmName">Firm Name</Label>
              <Input
                id="firmName"
                value={lawyerFields.firmName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLawyerFields({ ...lawyerFields, firmName: e.target.value })
                }
                placeholder="Smith & Associates"
              />
            </div>
            <div>
              <Label htmlFor="lawyer-specialties">Specialties</Label>
              <Input
                id="lawyer-specialties"
                value={lawyerFields.specialties}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLawyerFields({ ...lawyerFields, specialties: e.target.value })
                }
                placeholder="e.g. Employment Law, Labor Disputes"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#032B66] hover:bg-[#032B66]/90"
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="bg-[#032B66] hover:bg-[#032B66]/90"
            >
              {isSubmitting ? "Saving&hellip;" : "Complete Setup"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
