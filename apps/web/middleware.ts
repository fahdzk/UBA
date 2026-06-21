import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about(.*)",
  "/news(.*)",
  "/contact(.*)",
  "/agency-ratings(.*)",
  "/pay-tiers(.*)",
  "/report(.*)",
  "/pricing(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/apply(.*)",
  "/api/webhooks(.*)",
  "/api/cron(.*)",
  "/api/uploadthing(.*)",
  "/api/ambassador-applications(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAgencyRoute = createRouteMatcher(["/agency(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth();

  // Security headers on every response
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.uploadthing.com https://img.clerk.com blob:; connect-src 'self' https://*.supabase.co https://api.clerk.com wss://*.supabase.co;"
  );

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Onboarding gate — redirect incomplete profiles
  if (userId && !isPublicRoute(req)) {
    const metadata = sessionClaims?.metadata as Record<string, unknown> | undefined;
    const role = metadata?.role as string | undefined;
    const onboardingComplete = metadata?.onboardingComplete as boolean | undefined;

    if (!onboardingComplete && !req.nextUrl.pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // Role-based route protection
    if (isAdminRoute(req) && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (isAgencyRoute(req) && !["admin", "agency"].includes(role ?? "")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
