"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Plus } from "lucide-react";

interface ProfileEditFormProps {
  initialData: {
    displayName: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    positionType: string;
    city: string;
    state: string;
    zipCode: string;
    yearsExperience: number;
    skills: string[];
    certifications: string[];
    availableForWork: boolean;
    avatarUrl?: string;
  };
}

export function ProfileEditForm({ initialData }: ProfileEditFormProps) {
  const [form, setForm] = useState(initialData);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = useCallback((field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      update("skills", [...form.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", form.skills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error("Profile save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Photo */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-slate-900">Profile Photo</h2>
        <div className="mt-4 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={form.avatarUrl} />
            <AvatarFallback className="bg-navy-100 text-navy-600 font-heading text-xl">
              {form.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" size="sm">Upload Photo</Button>
            <p className="mt-1 text-xs text-slate-400">JPG, PNG, WEBP. Max 4MB.</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-slate-900">Basic Information</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Display Name</Label>
            <Input value={form.displayName} onChange={(e) => update("displayName", e.target.value)} />
          </div>
          <div>
            <Label>Username</Label>
            <Input value={form.username} onChange={(e) => update("username", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} />
          </div>
          <div>
            <Label>First Name</Label>
            <Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Position */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-slate-900">Position & Experience</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Position Type</Label>
            <select
              value={form.positionType}
              onChange={(e) => update("positionType", e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option value="">Select...</option>
              <option value="brand_ambassador">Brand Ambassador</option>
              <option value="product_specialist">Product Specialist</option>
              <option value="team_lead">Team Lead</option>
              <option value="demo_specialist">Demo Specialist</option>
              <option value="sampling_specialist">Sampling Specialist</option>
              <option value="event_staff">Event Staff</option>
              <option value="street_team">Street Team</option>
              <option value="trade_show_rep">Trade Show Rep</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <Label>Years of Experience</Label>
            <Input type="number" min={0} value={form.yearsExperience} onChange={(e) => update("yearsExperience", parseInt(e.target.value) || 0)} />
          </div>
          <div>
            <Label>City</Label>
            <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
          </div>
          <div>
            <Label>State</Label>
            <Input value={form.state} onChange={(e) => update("state", e.target.value.toUpperCase())} maxLength={2} />
          </div>
        </div>
        <div className="mt-4">
          <Label>Bio</Label>
          <Textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} maxLength={500} rows={3} />
          <p className="mt-1 text-xs text-slate-400">{form.bio.length}/500</p>
        </div>
      </div>

      {/* Skills */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-slate-900">Skills</h2>
        <div className="mt-4 flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            placeholder="Add a skill..."
          />
          <Button type="button" variant="outline" onClick={addSkill}><Plus className="h-4 w-4" /></Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {form.skills.map((skill) => (
            <span key={skill} className="flex items-center gap-1 rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-600">
              {skill}
              <button onClick={() => removeSkill(skill)} className="ml-1 text-navy-400 hover:text-brand-red">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-semibold text-slate-900">Available for Work</h2>
            <p className="text-sm text-slate-500">Agencies can find and invite you to jobs</p>
          </div>
          <Switch
            checked={form.availableForWork}
            onCheckedChange={(checked) => update("availableForWork", checked)}
          />
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-between">
        {success && <p className="text-sm text-emerald-600">Profile updated!</p>}
        <div className="flex-1" />
        <Button onClick={handleSave} disabled={saving} className="bg-brand-red hover:bg-brand-red-hover">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
