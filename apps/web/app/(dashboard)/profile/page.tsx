"use client";

import { useUser } from "@clerk/nextjs";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useUser();

  const profileData = {
    displayName: `${user?.firstName || "User"} ${user?.lastName || ""}`.trim(),
    username: user?.username || "username",
    firstName: user?.firstName || "User",
    lastName: user?.lastName || "",
    positionType: "brand_ambassador",
    tierLevel: 2,
    city: "Los Angeles",
    state: "CA",
    bio: "Experienced brand ambassador with expertise in tech events and product demos.",
    yearsExperience: 3,
    skills: ["Communication", "Customer Service", "Tech Savvy", "Bilingual"],
    certifications: ["Food Handler", "CPR Certified"],
    avatarUrl: user?.imageUrl,
    memberSince: "2025-01-15",
    totalEventsWorked: 18,
    averageRating: 4.6,
    isAvailable: true,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-900">My Profile</h1>
        <Link href="/profile/edit">
          <Button variant="outline">Edit Profile</Button>
        </Link>
      </div>
      <ProfileCard {...profileData} />
    </div>
  );
}
