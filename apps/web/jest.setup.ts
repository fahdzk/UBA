
import "@testing-library/jest-dom";

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Clerk
jest.mock("@clerk/nextjs/server", () => ({
  auth: () => Promise.resolve({ userId: "test-user-id" }),
  clerkMiddleware: () => () => ({}),
  createRouteMatcher: () => () => false,
}));

jest.mock("@clerk/nextjs", () => ({
  useAuth: () => ({ isLoaded: true, isSignedIn: true }),
  SignIn: () => null,
  SignUp: () => null,
}));

// Mock Prisma
jest.mock("@uba/database", () => ({
  prisma: {
    user: { findUnique: jest.fn(), findMany: jest.fn(), count: jest.fn(), create: jest.fn(), update: jest.fn() },
    job: { findMany: jest.fn(), findUnique: jest.fn(), count: jest.fn(), create: jest.fn() },
    application: { findMany: jest.fn(), count: jest.fn(), create: jest.fn() },
    complaint: { findMany: jest.fn(), count: jest.fn(), create: jest.fn() },
    legalCase: { findMany: jest.fn(), count: jest.fn() },
    ticket: { findMany: jest.fn(), count: jest.fn() },
    notification: { findMany: jest.fn(), count: jest.fn() },
    agencyProfile: { findFirst: jest.fn(), count: jest.fn() },
    review: { count: jest.fn() },
    payment: { findMany: jest.fn() },
  },
}));

// Suppress console errors in tests
global.console.error = jest.fn();
