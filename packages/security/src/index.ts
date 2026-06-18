// @uba/security — Core security utilities
import { RoleName } from "@uba/database";

// ============================================================
// RBAC — Route Access Control
// ============================================================

export const ROUTE_PERMISSIONS: Record<string, RoleName[]> = {
  // Public routes
  "/": [RoleName.GUEST, RoleName.BA, RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF, RoleName.LAWYER, RoleName.MODERATOR, RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/about": [RoleName.GUEST, RoleName.BA, RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF, RoleName.LAWYER, RoleName.MODERATOR, RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/news": [RoleName.GUEST, RoleName.BA, RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF, RoleName.LAWYER, RoleName.MODERATOR, RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/contact": [RoleName.GUEST, RoleName.BA, RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF, RoleName.LAWYER, RoleName.MODERATOR, RoleName.ADMIN, RoleName.SUPER_ADMIN],

  // BA Portal
  "/ba": [RoleName.BA],
  "/ba/dashboard": [RoleName.BA],
  "/ba/profile": [RoleName.BA],
  "/ba/complaints": [RoleName.BA],
  "/ba/jobs": [RoleName.BA],
  "/ba/applications": [RoleName.BA],
  "/ba/membership": [RoleName.BA],

  // Agency Portal
  "/agency": [RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF],
  "/agency/dashboard": [RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF],
  "/agency/profile": [RoleName.AGENCY_ADMIN],
  "/agency/jobs": [RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF],
  "/agency/applications": [RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF],
  "/agency/reviews": [RoleName.AGENCY_ADMIN, RoleName.AGENCY_STAFF],

  // Lawyer Portal
  "/lawyer": [RoleName.LAWYER],
  "/lawyer/dashboard": [RoleName.LAWYER],
  "/lawyer/cases": [RoleName.LAWYER],
  "/lawyer/profile": [RoleName.LAWYER],

  // Admin Portal
  "/admin": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/dashboard": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/users": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/complaints": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/tickets": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/legal-cases": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/agencies": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/analytics": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/news": [RoleName.ADMIN, RoleName.SUPER_ADMIN],
  "/admin/settings": [RoleName.SUPER_ADMIN],
  "/admin/audit-logs": [RoleName.SUPER_ADMIN],
};

export function canAccessRoute(userRoles: RoleName[], pathname: string): boolean {
  if (userRoles.includes(RoleName.SUPER_ADMIN)) return true;

  const matchingRoutes = Object.keys(ROUTE_PERMISSIONS)
    .filter(route => pathname === route || pathname.startsWith(route + "/"))
    .sort((a, b) => b.length - a.length);

  if (matchingRoutes.length === 0) return true;

  const requiredRoles = ROUTE_PERMISSIONS[matchingRoutes[0]];
  return userRoles.some(role => requiredRoles.includes(role));
}

export function getPortalHome(roles: RoleName[]): string {
  if (roles.includes(RoleName.SUPER_ADMIN) || roles.includes(RoleName.ADMIN) || roles.includes(RoleName.MODERATOR)) {
    return "/admin/dashboard";
  }
  if (roles.includes(RoleName.LAWYER)) return "/lawyer/dashboard";
  if (roles.includes(RoleName.AGENCY_ADMIN) || roles.includes(RoleName.AGENCY_STAFF)) {
    return "/agency/dashboard";
  }
  if (roles.includes(RoleName.BA)) return "/ba/dashboard";
  return "/";
}

// ============================================================
// RATE LIMITING
// ============================================================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

export function checkAuthRateLimit(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
  return checkRateLimit(identifier, 5, 15 * 60_000);
}

export function checkApiRateLimit(identifier: string): { allowed: boolean; remaining: number; resetAt: number } {
  return checkRateLimit(identifier, 100, 60_000);
}

// ============================================================
// INPUT SANITIZATION
// ============================================================

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}

// ============================================================
// CSRF
// ============================================================

export function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
}

// ============================================================
// BRUTE FORCE PROTECTION
// ============================================================

interface LoginAttempt {
  count: number;
  firstAttempt: number;
  lockedUntil: number | null;
}

const loginAttempts = new Map<string, LoginAttempt>();

export function checkBruteForce(identifier: string): { allowed: boolean; lockedUntil: number | null } {
  const now = Date.now();
  const attempt = loginAttempts.get(identifier);

  if (!attempt) {
    loginAttempts.set(identifier, { count: 1, firstAttempt: now, lockedUntil: null });
    return { allowed: true, lockedUntil: null };
  }

  if (attempt.lockedUntil && now < attempt.lockedUntil) {
    return { allowed: false, lockedUntil: attempt.lockedUntil };
  }

  if (now - attempt.firstAttempt > 15 * 60_000) {
    loginAttempts.set(identifier, { count: 1, firstAttempt: now, lockedUntil: null });
    return { allowed: true, lockedUntil: null };
  }

  attempt.count++;

  if (attempt.count >= 5) {
    attempt.lockedUntil = now + 30 * 60_000;
    return { allowed: false, lockedUntil: attempt.lockedUntil };
  }

  return { allowed: true, lockedUntil: null };
}

export function resetLoginAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

// ============================================================
// PII MASKING
// ============================================================

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
}

export function maskPhone(phone: string): string {
  if (phone.length < 4) return "***";
  return `${"*".repeat(phone.length - 4)}${phone.slice(-4)}`;
}

export function maskSsn(ssn: string): string {
  if (ssn.length < 4) return "***";
  return `***-**-${ssn.slice(-4)}`;
}
