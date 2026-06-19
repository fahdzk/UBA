import { SignIn } from "@clerk/nextjs";
import { UBALogo } from "@uba/ui/components/logo";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <UBALogo size={80} />
          </div>
          <h1 className="text-2xl font-bold text-[#032B66]">Welcome Back</h1>
          <p className="text-gray-500 mt-1">Sign in to your UBA account</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#032B66] hover:bg-[#032B66]/90",
              footerActionLink: "text-[#032B66] hover:text-[#032B66]/80",
            },
          }}
        />
      </div>
    </div>
  );
}
