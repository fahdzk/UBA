import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { OnboardingForm } from "./onboarding-form";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#032B66]">Complete Your Profile</h1>
          <p className="text-gray-500 mt-2">
            Tell us about yourself so we can personalize your UBA experience.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
