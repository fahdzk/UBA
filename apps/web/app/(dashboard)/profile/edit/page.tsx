"use client";

import { useUser } from "@clerk/nextjs";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";

export default function ProfileEditPage() {
  const { user } = useUser();

  const initialData = {
    displayName: `${user?.firstName || "User"} ${user?.lastName || ""}`.trim(),
    username: user?.username || "username",
    firstName: user?.firstName || "User",
    lastName: user?.lastName || "",
    email: user?.emailAddresses?.[0]?.emailAddress || "",
    phone: user?.phoneNumbers?.[0]?.phoneNumber || "",
    bio: "",
    positionType: "brand_ambassador",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    yearsExperience: 3,
    skills: ["Communication", "Customer Service"],
    certifications: [],
    availableForWork: true,
    avatarUrl: user?.imageUrl,
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Edit Profile</h1>
      <ProfileEditForm initialData={initialData} />
    </div>
  );
}
