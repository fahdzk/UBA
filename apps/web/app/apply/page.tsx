"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// ── Types ──
interface GigEntry {
  eventName: string;
  agencyName: string;
  clientBrand: string;
  location: string;
  dateWorked: string;
  role: string;
  ratePaid: string;
  description: string;
}

interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  dateOfBirth: string;
  gender: string;
  genderCustom: string;
  applicationType: string;
  // Step 2
  heightFeet: string;
  heightInches: string;
  weight: string;
  shirtSize: string;
  pantSize: string;
  shoeSize: string;
  ethnicity: string;
  languages: string[];
  visibleTattoos: boolean;
  visiblePiercings: boolean;
  smoker: boolean;
  // Step 3
  howHeard: string;
  yearsExperience: string;
  eventTypes: string[];
  experienceDescription: string;
  agenciesWorked: string[];
  // Step 4
  travelWillingness: string;
  validDriversLicense: boolean;
  ownVehicle: boolean;
  passportAvailable: boolean;
  canLift50lbs: boolean;
  weekendAvailability: boolean;
  overnightTravelOk: boolean;
  lastMinuteOk: boolean;
  tsaPreCheck: boolean;
  securityClearance: boolean;
  availableDays: string[];
  availableTimeWindows: string[];
  // Step 5
  headshotUrl: string;
  fullBodyUrl: string;
  resumeUrl: string;
  introVideoUrl: string;
  // Step 6
  certifyAccuracy: boolean;
  consentDataStorage: boolean;
  understandFalseInfo: boolean;
  consentPhotoUse: boolean;
}

const INITIAL_DATA: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  city: "", state: "", country: "US", zipCode: "",
  dateOfBirth: "", gender: "", genderCustom: "", applicationType: "",
  heightFeet: "", heightInches: "", weight: "",
  shirtSize: "", pantSize: "", shoeSize: "",
  ethnicity: "", languages: [],
  visibleTattoos: false, visiblePiercings: false, smoker: false,
  howHeard: "", yearsExperience: "", eventTypes: [],
  experienceDescription: "", agenciesWorked: [],
  travelWillingness: "",
  validDriversLicense: false, ownVehicle: false, passportAvailable: false,
  canLift50lbs: false, weekendAvailability: false, overnightTravelOk: false,
  lastMinuteOk: false, tsaPreCheck: false, securityClearance: false,
  availableDays: [], availableTimeWindows: [],
  headshotUrl: "", fullBodyUrl: "", resumeUrl: "", introVideoUrl: "",
  certifyAccuracy: false, consentDataStorage: false,
  understandFalseInfo: false, consentPhotoUse: false,
};

const STEPS = [
  { id: 1, label: "Personal Info", short: "Personal" },
  { id: 2, label: "Physical Details", short: "Physical" },
  { id: 3, label: "Experience", short: "Experience" },
  { id: 4, label: "Availability", short: "Availability" },
  { id: 5, label: "Media Uploads", short: "Media" },
  { id: 6, label: "Review & Submit", short: "Review" },
];

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Prefer not to say", "Custom"];
const APPLICATION_TYPES = ["BRAND_AMBASSADOR", "PRODUCT_SPECIALIST"];
const HOW_HEARD_OPTIONS = ["Instagram", "TikTok", "Facebook", "Google Search", "Friend Referral", "Agency Referral", "Existing Ambassador", "Event Recruiter", "Other"];
const EXPERIENCE_LEVELS = ["None", "Less than 1 year", "1–2 years", "3–5 years", "5+ years", "10+ years"];
const EVENT_TYPES = ["Auto Shows", "Sports Activations", "Trade Shows", "Sampling Activations", "Product Demos", "Hospitality", "Luxury Events", "Promo Modeling", "Street Teams", "Convention Staffing", "Festival Staffing", "Corporate Events", "Other"];
const AGENCY_PRESETS = ["H2 Events", "Mosaic", "GPJ", "Team Enterprise", "Impact XM", "GMR Marketing", "Freeman", "Momentum", "Elevate", "MarketSource", "Other"];
const TRAVEL_OPTIONS = ["LOCAL_ONLY", "STATEWIDE", "NATIONWIDE", "INTERNATIONAL"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_WINDOWS = ["Morning", "Afternoon", "Evening", "Overnight"];
const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const PANT_SIZES = ["28", "30", "32", "34", "36", "38", "40", "42", "44", "46"];
const SHOE_SIZES = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13", "14"];
const COMMON_LANGUAGES = ["English", "Spanish", "Arabic", "Hindi", "Urdu", "French", "Mandarin", "Portuguese", "Japanese", "Korean", "Tagalog", "Vietnamese"];

export default function ApplyPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [gigs, setGigs] = useState<GigEntry[]>([
    { eventName: "", agencyName: "", clientBrand: "", location: "", dateWorked: "", role: "", ratePaid: "", description: "" },
    { eventName: "", agencyName: "", clientBrand: "", location: "", dateWorked: "", role: "", ratePaid: "", description: "" },
    { eventName: "", agencyName: "", clientBrand: "", location: "", dateWorked: "", role: "", ratePaid: "", description: "" },
  ]);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customLanguage, setCustomLanguage] = useState("");
  const [customAgency, setCustomAgency] = useState("");
  const autosaveRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pre-fill from Clerk user
  useEffect(() => {
    if (isLoaded && user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        phone: user.primaryPhoneNumber?.phoneNumber || "",
      }));
    }
  }, [isLoaded, user]);

  // Autosave
  const autosave = useCallback(async () => {
    if (!applicationId) return;
    setSaving(true);
    try {
      await fetch(`/api/ambassador-applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (e) {
      console.error("Autosave failed:", e);
    } finally {
      setSaving(false);
    }
  }, [applicationId, formData]);

  useEffect(() => {
    if (autosaveRef.current) clearTimeout(autosaveRef.current);
    autosaveRef.current = setTimeout(autosave, 30000);
    return () => { if (autosaveRef.current) clearTimeout(autosaveRef.current); };
  }, [formData, autosave]);

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const updateGig = (index: number, field: string, value: string) => {
    setGigs((prev) => prev.map((g, i) => i === index ? { ...g, [field]: value } : g));
  };

  const toggleArrayItem = (field: "languages" | "eventTypes" | "agenciesWorked" | "availableDays" | "availableTimeWindows", item: string) => {
    setFormData((prev) => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item] };
    });
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!formData.firstName.trim()) errs.firstName = "First name is required";
      if (!formData.lastName.trim()) errs.lastName = "Last name is required";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Valid email is required";
      if (!formData.phone.trim()) errs.phone = "Phone is required";
      if (!formData.city.trim()) errs.city = "City is required";
      if (!formData.state.trim()) errs.state = "State is required";
      if (!formData.dateOfBirth) errs.dateOfBirth = "Date of birth is required";
      if (!formData.gender) errs.gender = "Gender is required";
      if (!formData.applicationType) errs.applicationType = "Please select applying as";
      // Age check (>= 18)
      if (formData.dateOfBirth) {
        const age = Math.floor((Date.now() - new Date(formData.dateOfBirth).getTime()) / 31557600000);
        if (age < 18) errs.dateOfBirth = "Must be at least 18 years old";
      }
    }
    if (step === 2) {
      if (!formData.heightFeet) errs.heightFeet = "Height is required";
      if (!formData.weight.trim()) errs.weight = "Weight is required";
      if (!formData.shirtSize) errs.shirtSize = "Shirt size is required";
      if (!formData.pantSize) errs.pantSize = "Pant size is required";
      if (!formData.shoeSize) errs.shoeSize = "Shoe size is required";
    }
    if (step === 3) {
      if (!formData.howHeard) errs.howHeard = "Required";
      if (!formData.yearsExperience) errs.yearsExperience = "Required";
      if (!formData.experienceDescription.trim()) errs.experienceDescription = "Required";
      const emptyGigs = gigs.filter((g) => !g.eventName.trim() || !g.location.trim());
      if (emptyGigs.length > 0) errs.gigs = "All 3 gigs require at least event name and location";
    }
    if (step === 4) {
      if (!formData.travelWillingness) errs.travelWillingness = "Required";
    }
    if (step === 5) {
      if (!formData.headshotUrl) errs.headshotUrl = "Headshot is required";
      if (!formData.fullBodyUrl) errs.fullBodyUrl = "Full body shot is required";
    }
    if (step === 6) {
      if (!formData.certifyAccuracy) errs.certifyAccuracy = "Required";
      if (!formData.consentDataStorage) errs.consentDataStorage = "Required";
      if (!formData.understandFalseInfo) errs.understandFalseInfo = "Required";
      if (!formData.consentPhotoUse) errs.consentPhotoUse = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = async () => {
    if (!validateStep(currentStep)) return;
    // Save progress before moving
    await saveProgress();
    setCurrentStep((s) => Math.min(s + 1, 6));
  };

  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const saveProgress = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/ambassador-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: applicationId, ...formData }),
      });
      const data = await res.json();
      if (data.id && !applicationId) setApplicationId(data.id);
      // Save gigs
      if (data.id || applicationId) {
        await fetch(`/api/ambassador-applications/${data.id || applicationId}/gigs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gigs }),
        });
      }
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) return;
    if (!applicationId) {
      await saveProgress();
    }
    setLoading(true);
    try {
      const appId = applicationId;
      // Save final gigs
      await fetch(`/api/ambassador-applications/${appId}/gigs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gigs }),
      });
      // Submit
      const res = await fetch(`/api/ambassador-applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", ...formData }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Submission failed");
        return;
      }
      setSubmitted(true);
    } catch (e) {
      console.error("Submit error:", e);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Application Submitted</h1>
          <p className="text-slate-300 leading-relaxed">
            Your UBA application has been successfully submitted. Our casting team will review your profile. If opportunities match your experience, availability, and skillset, a recruiter may contact you for future gigs.
          </p>
          <p className="text-slate-400 text-sm">Thank you for applying to United Brand Ambassadors.</p>
          <button onClick={() => router.push("/")} className="inline-flex items-center justify-center rounded-lg bg-navy-600 px-6 py-3 text-sm font-medium text-white hover:bg-navy-500 transition-colors">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-sm";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";
  const errorClass = "text-red-400 text-xs mt-1";
  const selectClass = "w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-sm";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600">
              <span className="text-xs font-bold text-white">UBA</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm">Brand Ambassador Application</h1>
              <p className="text-slate-400 text-xs">Step {currentStep} of 6</p>
            </div>
          </div>
          {saving && <span className="text-xs text-slate-400">Saving...</span>}
          {!saving && applicationId && <span className="text-xs text-green-400">✓ Saved</span>}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-1 sm:gap-2 mb-8">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => { if (step.id < currentStep) setCurrentStep(step.id); }}
              className={`flex-1 relative group`}
            >
              <div className={`h-2 rounded-full transition-colors ${step.id <= currentStep ? "bg-blue-500" : "bg-slate-700"}`} />
              <span className="hidden sm:block text-xs mt-1.5 text-center text-slate-400 group-hover:text-slate-200">
                {step.short}
              </span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">

          {/* ── STEP 1: Personal Information ── */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Personal Information</h2>
                <p className="text-slate-400 text-sm mt-1">Tell us about yourself</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input className={inputClass} value={formData.firstName} onChange={(e) => updateField("firstName", e.target.value)} placeholder="John" />
                  {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input className={inputClass} value={formData.lastName} onChange={(e) => updateField("lastName", e.target.value)} placeholder="Doe" />
                  {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input className={inputClass} type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="john@example.com" />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone *</label>
                  <input className={inputClass} type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+1 (555) 123-4567" />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className={labelClass}>City *</label>
                  <input className={inputClass} value={formData.city} onChange={(e) => updateField("city", e.target.value)} placeholder="Los Angeles" />
                  {errors.city && <p className={errorClass}>{errors.city}</p>}
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <input className={inputClass} value={formData.state} onChange={(e) => updateField("state", e.target.value)} placeholder="CA" />
                  {errors.state && <p className={errorClass}>{errors.state}</p>}
                </div>
                <div>
                  <label className={labelClass}>Country *</label>
                  <input className={inputClass} value={formData.country} onChange={(e) => updateField("country", e.target.value)} placeholder="US" />
                </div>
                <div>
                  <label className={labelClass}>ZIP Code</label>
                  <input className={inputClass} value={formData.zipCode} onChange={(e) => updateField("zipCode", e.target.value)} placeholder="90001" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Date of Birth *</label>
                  <input className={inputClass} type="date" value={formData.dateOfBirth} onChange={(e) => updateField("dateOfBirth", e.target.value)} />
                  {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label className={labelClass}>Gender *</label>
                  <select className={selectClass} value={formData.gender} onChange={(e) => updateField("gender", e.target.value)}>
                    <option value="">Select...</option>
                    {GENDER_OPTIONS.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.gender && <p className={errorClass}>{errors.gender}</p>}
                  {formData.gender === "Custom" && (
                    <input className={`${inputClass} mt-2`} value={formData.genderCustom} onChange={(e) => updateField("genderCustom", e.target.value)} placeholder="Specify..." />
                  )}
                </div>
                <div>
                  <label className={labelClass}>Applying As *</label>
                  <div className="flex gap-3 mt-2">
                    {APPLICATION_TYPES.map((t) => (
                      <button key={t} type="button" onClick={() => updateField("applicationType", t)}
                        className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${formData.applicationType === t ? "border-blue-500 bg-blue-500/20 text-blue-300" : "border-slate-600 text-slate-400 hover:border-slate-500"}`}>
                        {t === "BRAND_AMBASSADOR" ? "Brand Ambassador" : "Product Specialist"}
                      </button>
                    ))}
                  </div>
                  {errors.applicationType && <p className={errorClass}>{errors.applicationType}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Physical Details ── */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Physical Details</h2>
                <p className="text-slate-400 text-sm mt-1">Help clients match you to the right events</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Height *</label>
                  <div className="flex gap-2">
                    <select className={selectClass} value={formData.heightFeet} onChange={(e) => updateField("heightFeet", e.target.value)}>
                      <option value="">Ft</option>
                      {[4,5,6,7].map((f) => <option key={f} value={String(f)}>{f}&apos;{" "}</option>)}
                    </select>
                    <select className={selectClass} value={formData.heightInches} onChange={(e) => updateField("heightInches", e.target.value)}>
                      <option value="">In</option>
                      {Array.from({ length: 12 }, (_, i) => <option key={i} value={String(i)}>{i}&quot;</option>)}
                    </select>
                  </div>
                  {errors.heightFeet && <p className={errorClass}>{errors.heightFeet}</p>}
                </div>
                <div>
                  <label className={labelClass}>Weight (lbs) *</label>
                  <input className={inputClass} type="number" value={formData.weight} onChange={(e) => updateField("weight", e.target.value)} placeholder="160" />
                  {errors.weight && <p className={errorClass}>{errors.weight}</p>}
                </div>
                <div>
                  <label className={labelClass}>Shirt Size *</label>
                  <select className={selectClass} value={formData.shirtSize} onChange={(e) => updateField("shirtSize", e.target.value)}>
                    <option value="">Select...</option>
                    {SHIRT_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.shirtSize && <p className={errorClass}>{errors.shirtSize}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Pant Size *</label>
                  <select className={selectClass} value={formData.pantSize} onChange={(e) => updateField("pantSize", e.target.value)}>
                    <option value="">Select...</option>
                    {PANT_SIZES.map((s) => <option key={s} value={s}>Waist {s}</option>)}
                  </select>
                  {errors.pantSize && <p className={errorClass}>{errors.pantSize}</p>}
                </div>
                <div>
                  <label className={labelClass}>Shoe Size *</label>
                  <select className={selectClass} value={formData.shoeSize} onChange={(e) => updateField("shoeSize", e.target.value)}>
                    <option value="">Select...</option>
                    {SHOE_SIZES.map((s) => <option key={s} value={s}>US {s}</option>)}
                  </select>
                  {errors.shoeSize && <p className={errorClass}>{errors.shoeSize}</p>}
                </div>
                <div>
                  <label className={labelClass}>Ethnicity (optional)</label>
                  <input className={inputClass} value={formData.ethnicity} onChange={(e) => updateField("ethnicity", e.target.value)} placeholder="Optional" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Languages Spoken</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {COMMON_LANGUAGES.map((lang) => (
                    <button key={lang} type="button" onClick={() => toggleArrayItem("languages", lang)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${formData.languages.includes(lang) ? "bg-blue-500/20 text-blue-300 border border-blue-500/50" : "bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500"}`}>
                      {lang}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input className={`${inputClass} flex-1`} value={customLanguage} onChange={(e) => setCustomLanguage(e.target.value)} placeholder="Add other language..." onKeyDown={(e) => { if (e.key === "Enter" && customLanguage.trim()) { toggleArrayItem("languages", customLanguage.trim()); setCustomLanguage(""); } }} />
                  <button type="button" onClick={() => { if (customLanguage.trim()) { toggleArrayItem("languages", customLanguage.trim()); setCustomLanguage(""); } }} className="px-3 py-2 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600">Add</button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[{ key: "visibleTattoos", label: "Visible Tattoos?" }, { key: "visiblePiercings", label: "Visible Piercings?" }, { key: "smoker", label: "Smoker?" }].map(({ key, label }) => (
                  <div key={key}>
                    <label className={labelClass}>{label}</label>
                    <div className="flex gap-2 mt-2">
                      <button type="button" onClick={() => updateField(key, true)}
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${formData[key as keyof FormData] === true ? "border-blue-500 bg-blue-500/20 text-blue-300" : "border-slate-600 text-slate-400"}`}>Yes</button>
                      <button type="button" onClick={() => updateField(key, false)}
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${formData[key as keyof FormData] === false ? "border-blue-500 bg-blue-500/20 text-blue-300" : "border-slate-600 text-slate-400"}`}>No</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 3: Experience ── */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Experience</h2>
                <p className="text-slate-400 text-sm mt-1">Tell us about your background</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>How did you hear about UBA? *</label>
                  <select className={selectClass} value={formData.howHeard} onChange={(e) => updateField("howHeard", e.target.value)}>
                    <option value="">Select...</option>
                    {HOW_HEARD_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.howHeard && <p className={errorClass}>{errors.howHeard}</p>}
                </div>
                <div>
                  <label className={labelClass}>Years of Experience *</label>
                  <select className={selectClass} value={formData.yearsExperience} onChange={(e) => updateField("yearsExperience", e.target.value)}>
                    <option value="">Select...</option>
                    {EXPERIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.yearsExperience && <p className={errorClass}>{errors.yearsExperience}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Event Types Worked</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {EVENT_TYPES.map((et) => (
                    <button key={et} type="button" onClick={() => toggleArrayItem("eventTypes", et)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${formData.eventTypes.includes(et) ? "bg-blue-500/20 text-blue-300 border border-blue-500/50" : "bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500"}`}>
                      {et}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Experience Description *</label>
                <textarea className={`${inputClass} min-h-[120px] resize-y`} value={formData.experienceDescription} onChange={(e) => updateField("experienceDescription", e.target.value)} placeholder="Describe your previous brand ambassador, event staffing, or promotional experience..." />
                {errors.experienceDescription && <p className={errorClass}>{errors.experienceDescription}</p>}
              </div>

              <div>
                <label className={labelClass}>Agencies Worked With</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {AGENCY_PRESETS.map((a) => (
                    <button key={a} type="button" onClick={() => toggleArrayItem("agenciesWorked", a)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${formData.agenciesWorked.includes(a) ? "bg-blue-500/20 text-blue-300 border border-blue-500/50" : "bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500"}`}>
                      {a}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input className={`${inputClass} flex-1`} value={customAgency} onChange={(e) => setCustomAgency(e.target.value)} placeholder="Add other agency..." onKeyDown={(e) => { if (e.key === "Enter" && customAgency.trim()) { toggleArrayItem("agenciesWorked", customAgency.trim()); setCustomAgency(""); } }} />
                  <button type="button" onClick={() => { if (customAgency.trim()) { toggleArrayItem("agenciesWorked", customAgency.trim()); setCustomAgency(""); } }} className="px-3 py-2 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600">Add</button>
                </div>
              </div>

              {/* Last 3 Gigs */}
              <div>
                <label className={labelClass}>Last 3 Gigs *</label>
                {errors.gigs && <p className={errorClass}>{errors.gigs}</p>}
                <div className="space-y-4 mt-3">
                  {gigs.map((gig, i) => (
                    <div key={i} className="rounded-xl border border-slate-600 bg-slate-900/50 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">{i + 1}</span>
                        <span className="text-sm font-medium text-white">Gig #{i + 1}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input className={inputClass} value={gig.eventName} onChange={(e) => updateGig(i, "eventName", e.target.value)} placeholder="Event Name *" />
                        <input className={inputClass} value={gig.agencyName} onChange={(e) => updateGig(i, "agencyName", e.target.value)} placeholder="Agency Name" />
                        <input className={inputClass} value={gig.clientBrand} onChange={(e) => updateGig(i, "clientBrand", e.target.value)} placeholder="Client / Brand" />
                        <input className={inputClass} value={gig.location} onChange={(e) => updateGig(i, "location", e.target.value)} placeholder="Location *" />
                        <input className={inputClass} value={gig.dateWorked} onChange={(e) => updateGig(i, "dateWorked", e.target.value)} placeholder="Date Worked (e.g. January 2026)" />
                        <input className={inputClass} value={gig.role} onChange={(e) => updateGig(i, "role", e.target.value)} placeholder="Role" />
                        <input className={inputClass} value={gig.ratePaid} onChange={(e) => updateGig(i, "ratePaid", e.target.value)} placeholder="Rate Paid (optional)" />
                      </div>
                      <textarea className={`${inputClass} min-h-[60px] resize-y`} value={gig.description} onChange={(e) => updateGig(i, "description", e.target.value)} placeholder="Brief description..." />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Availability & Travel ── */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Availability & Travel</h2>
                <p className="text-slate-400 text-sm mt-1">Help us match you to the right gigs</p>
              </div>

              <div>
                <label className={labelClass}>Travel Willingness *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  {TRAVEL_OPTIONS.map((t) => (
                    <button key={t} type="button" onClick={() => updateField("travelWillingness", t)}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${formData.travelWillingness === t ? "border-blue-500 bg-blue-500/20 text-blue-300" : "border-slate-600 text-slate-400 hover:border-slate-500"}`}>
                      {t === "LOCAL_ONLY" ? "Local Only" : t === "STATEWIDE" ? "Statewide" : t === "NATIONWIDE" ? "Nationwide" : "International"}
                    </button>
                  ))}
                </div>
                {errors.travelWillingness && <p className={errorClass}>{errors.travelWillingness}</p>}
              </div>

              <div>
                <label className={labelClass}>Qualifications</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                  {[
                    { key: "validDriversLicense", label: "Valid Driver License" },
                    { key: "ownVehicle", label: "Own Vehicle" },
                    { key: "passportAvailable", label: "Passport Available" },
                    { key: "canLift50lbs", label: "Can Lift 50 lbs" },
                    { key: "weekendAvailability", label: "Weekend Availability" },
                    { key: "overnightTravelOk", label: "Overnight Travel OK" },
                    { key: "lastMinuteOk", label: "Last-Minute Booking OK" },
                    { key: "tsaPreCheck", label: "TSA PreCheck" },
                    { key: "securityClearance", label: "Security Clearance" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={formData[key as keyof FormData] as boolean} onChange={(e) => updateField(key, e.target.checked)}
                        className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" />
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Available Days</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {DAYS.map((day) => (
                    <button key={day} type="button" onClick={() => toggleArrayItem("availableDays", day)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${formData.availableDays.includes(day) ? "bg-blue-500/20 text-blue-300 border border-blue-500/50" : "bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500"}`}>
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Available Time Windows</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {TIME_WINDOWS.map((tw) => (
                    <button key={tw} type="button" onClick={() => toggleArrayItem("availableTimeWindows", tw)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${formData.availableTimeWindows.includes(tw) ? "bg-blue-500/20 text-blue-300 border border-blue-500/50" : "bg-slate-700 text-slate-400 border border-slate-600 hover:border-slate-500"}`}>
                      {tw}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5: Media Uploads ── */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Media Uploads</h2>
                <p className="text-slate-400 text-sm mt-1">Upload your professional photos and documents</p>
              </div>

              {/* Headshot */}
              <div>
                <label className={labelClass}>Headshot * <span className="text-slate-500 font-normal">(JPG/PNG, max 10MB)</span></label>
                {formData.headshotUrl ? (
                  <div className="mt-2 flex items-center gap-4">
                    <img src={formData.headshotUrl} alt="Headshot" className="h-20 w-20 rounded-lg object-cover border border-slate-600" />
                    <div className="flex-1">
                      <p className="text-sm text-green-400">✓ Uploaded</p>
                      <button type="button" onClick={() => updateField("headshotUrl", "")} className="text-xs text-red-400 hover:text-red-300 mt-1">Remove & re-upload</button>
                    </div>
                  </div>
                ) : (
                  <UploadZone endpoint="headshotUploader" onUploadComplete={(url) => updateField("headshotUrl", url)} accept="image/jpeg,image/png" />
                )}
                {errors.headshotUrl && <p className={errorClass}>{errors.headshotUrl}</p>}
              </div>

              {/* Full Body */}
              <div>
                <label className={labelClass}>Full Body Shot * <span className="text-slate-500 font-normal">(JPG/PNG, max 10MB)</span></label>
                {formData.fullBodyUrl ? (
                  <div className="mt-2 flex items-center gap-4">
                    <img src={formData.fullBodyUrl} alt="Full body" className="h-20 w-20 rounded-lg object-cover border border-slate-600" />
                    <div className="flex-1">
                      <p className="text-sm text-green-400">✓ Uploaded</p>
                      <button type="button" onClick={() => updateField("fullBodyUrl", "")} className="text-xs text-red-400 hover:text-red-300 mt-1">Remove & re-upload</button>
                    </div>
                  </div>
                ) : (
                  <UploadZone endpoint="fullBodyUploader" onUploadComplete={(url) => updateField("fullBodyUrl", url)} accept="image/jpeg,image/png" />
                )}
                {errors.fullBodyUrl && <p className={errorClass}>{errors.fullBodyUrl}</p>}
              </div>

              {/* Resume */}
              <div>
                <label className={labelClass}>Resume <span className="text-slate-500 font-normal">(optional, PDF/DOC/DOCX)</span></label>
                {formData.resumeUrl ? (
                  <div className="mt-2 flex items-center gap-4 rounded-lg border border-slate-600 bg-slate-900/50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-red-500/20">
                      <span className="text-xs font-bold text-red-400">PDF</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green-400">✓ Resume uploaded</p>
                      <button type="button" onClick={() => updateField("resumeUrl", "")} className="text-xs text-red-400 hover:text-red-300 mt-1">Remove</button>
                    </div>
                  </div>
                ) : (
                  <UploadZone endpoint="resumeUploader" onUploadComplete={(url) => updateField("resumeUrl", url)} accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                )}
              </div>

              {/* Intro Video */}
              <div>
                <label className={labelClass}>Intro Video <span className="text-slate-500 font-normal">(optional, MP4/MOV, max 60s)</span></label>
                {formData.introVideoUrl ? (
                  <div className="mt-2 flex items-center gap-4 rounded-lg border border-slate-600 bg-slate-900/50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-500/20">
                      <span className="text-xs font-bold text-purple-400">VID</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green-400">✓ Video uploaded</p>
                      <button type="button" onClick={() => updateField("introVideoUrl", "")} className="text-xs text-red-400 hover:text-red-300 mt-1">Remove</button>
                    </div>
                  </div>
                ) : (
                  <UploadZone endpoint="introVideoUploader" onUploadComplete={(url) => updateField("introVideoUrl", url)} accept="video/mp4,video/quicktime" />
                )}
              </div>
            </div>
          )}

          {/* ── STEP 6: Review & Submit ── */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Review & Submit</h2>
                <p className="text-slate-400 text-sm mt-1">Please review your application before submitting</p>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                <ReviewSection title="Personal Information" fields={[
                  { label: "Name", value: `${formData.firstName} ${formData.lastName}` },
                  { label: "Email", value: formData.email },
                  { label: "Phone", value: formData.phone },
                  { label: "Location", value: `${formData.city}, ${formData.state}, ${formData.country}` },
                  { label: "Applying As", value: formData.applicationType === "BRAND_AMBASSADOR" ? "Brand Ambassador" : "Product Specialist" },
                ]} />

                <ReviewSection title="Physical Details" fields={[
                  { label: "Height", value: `${formData.heightFeet}'${formData.heightInches}"` },
                  { label: "Weight", value: `${formData.weight} lbs` },
                  { label: "Shirt", value: formData.shirtSize },
                  { label: "Pant", value: formData.pantSize },
                  { label: "Shoe", value: formData.shoeSize },
                ]} />

                <ReviewSection title="Experience" fields={[
                  { label: "Years", value: formData.yearsExperience },
                  { label: "How Heard", value: formData.howHeard },
                  { label: "Event Types", value: formData.eventTypes.join(", ") || "None selected" },
                  { label: "Agencies", value: formData.agenciesWorked.join(", ") || "None selected" },
                ]} />

                <ReviewSection title="Availability" fields={[
                  { label: "Travel", value: formData.travelWillingness.replace("_", " ") },
                  { label: "Days", value: formData.availableDays.join(", ") || "None selected" },
                  { label: "Times", value: formData.availableTimeWindows.join(", ") || "None selected" },
                ]} />

                <ReviewSection title="Media" fields={[
                  { label: "Headshot", value: formData.headshotUrl ? "✓ Uploaded" : "✗ Missing" },
                  { label: "Full Body", value: formData.fullBodyUrl ? "✓ Uploaded" : "✗ Missing" },
                  { label: "Resume", value: formData.resumeUrl ? "✓ Uploaded" : "Not provided" },
                  { label: "Video", value: formData.introVideoUrl ? "✓ Uploaded" : "Not provided" },
                ]} />

                {/* Gigs */}
                <div className="rounded-xl border border-slate-600 bg-slate-900/50 p-4">
                  <h3 className="text-sm font-semibold text-white mb-3">Last 3 Gigs</h3>
                  <div className="space-y-3">
                    {gigs.map((gig, i) => (
                      <div key={i} className="text-sm">
                        <p className="text-white font-medium">{gig.eventName || `Gig #${i + 1}`}</p>
                        <p className="text-slate-400">{gig.agencyName} • {gig.clientBrand} • {gig.location} • {gig.dateWorked}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legal Agreements */}
              <div className="space-y-3 rounded-xl border border-slate-600 bg-slate-900/50 p-4">
                <h3 className="text-sm font-semibold text-white">Legal Agreements</h3>
                {[
                  { key: "certifyAccuracy", label: "I certify all information is accurate" },
                  { key: "consentDataStorage", label: "I consent to UBA storing my application data" },
                  { key: "understandFalseInfo", label: "I understand false information may result in rejection" },
                  { key: "consentPhotoUse", label: "I agree submitted photos may be used for internal casting purposes" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData[key as keyof FormData] as boolean} onChange={(e) => updateField(key, e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-0" />
                    <span className="text-sm text-slate-300">{label} *</span>
                  </label>
                ))}
                {(errors.certifyAccuracy || errors.consentDataStorage || errors.understandFalseInfo || errors.consentPhotoUse) && (
                  <p className={errorClass}>All agreements are required</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
            <button onClick={goPrev} disabled={currentStep === 1}
              className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              Previous
            </button>
            <div className="flex items-center gap-2">
              <button onClick={saveProgress} className="rounded-lg border border-slate-600 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                Save Draft
              </button>
              {currentStep < 6 ? (
                <button onClick={goNext} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
                  Next
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading}
                  className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-500 disabled:opacity-50 transition-colors">
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function ReviewSection({ title, fields }: { title: string; fields: { label: string; value: string }[] }) {
  return (
    <div className="rounded-xl border border-slate-600 bg-slate-900/50 p-4">
      <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {fields.map((f) => (
          <div key={f.label} className="text-sm">
            <span className="text-slate-500">{f.label}:</span>{" "}
            <span className="text-slate-300">{f.value || "—"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadZone({ endpoint, onUploadComplete, accept }: { endpoint: string; onUploadComplete: (url: string) => void; accept: string }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError("");

    try {
      // Get presigned URL from UploadThing
      const res = await fetch("/api/uploadthing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint, files: [{ name: file.name, size: file.size, type: file.type }] }),
      });

      if (!res.ok) throw new Error("Failed to get upload URL");

      const data = await res.json();
      const uploadUrl = data.url;
      const fields = data.fields || {};

      // Upload directly
      const formData = new FormData();
      Object.entries(fields).forEach(([k, v]) => formData.append(k, v as string));
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      });

      await new Promise<void>((resolve, reject) => {
        xhr.onload = () => { if (xhr.status >= 200 && xhr.status < 300) resolve(); else reject(new Error("Upload failed")); };
        xhr.onerror = () => reject(new Error("Upload failed"));
        xhr.open("POST", uploadUrl);
        xhr.send(formData);
      });

      // Get the file URL from the response
      const fileUrl = data.fileUrl || uploadUrl.split("?")[0];
      onUploadComplete(fileUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="mt-2">
      {uploading ? (
        <div className="rounded-lg border border-slate-600 bg-slate-900/50 p-6 text-center">
          <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-slate-400">Uploading... {progress}%</p>
        </div>
      ) : (
        <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
          className="rounded-lg border-2 border-dashed border-slate-600 bg-slate-900/30 p-8 text-center hover:border-slate-500 transition-colors cursor-pointer"
          onClick={() => document.getElementById(`file-input-${endpoint}`)?.click()}>
          <svg className="mx-auto h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="mt-2 text-sm text-slate-400">Drag & drop or click to upload</p>
          <input id={`file-input-${endpoint}`} type="file" accept={accept} onChange={handleFileSelect} className="hidden" />
        </div>
      )}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
