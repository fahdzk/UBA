
"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles = ["BA", "ADMIN", "SUPER_ADMIN"] }: ProtectedRouteProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    // Check roles via API
    fetch("/api/user/roles")
      .then((res) => res.json())
      .then((data) => {
        const hasRole = data.roles?.some((r: string) => allowedRoles.includes(r));
        if (!hasRole) {
          router.push("/dashboard");
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => router.push("/dashboard"));
  }, [isLoaded, isSignedIn, router, allowedRoles]);

  if (!isLoaded || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#032B66]" />
      </div>
    );
  }

  return <>{children}</>;
}
