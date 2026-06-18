// Middleware for route protection and role-based redirects
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserRoles } from "@uba/auth";
import { canAccessRoute, getPortalHome } from "@uba/security";

// Public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/news(.*)",
  "/contact",
  "/pricing",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/api/webhooks(.*)",
  "/api/public(.*)",
]);

// Routes that require authentication but no specific role
const isAuthRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/dashboard",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth;

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Require auth for all other routes
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Get user roles from DB
  const roles = await getUserRoles(userId);

  // Check role-based access
  if (!canAccessRoute(roles, req.nextUrl.pathname)) {
    // Redirect to appropriate portal
    const portalHome = getPortalHome(roles);
    return NextResponse.redirect(new URL(portalHome, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip static files and Next.js internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
