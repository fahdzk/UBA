
/**
 * @jest-environment node
 */
import middleware from "../../middleware";

jest.mock("@clerk/nextjs/server", () => ({
  clerkMiddleware: (handler: any) => handler,
  createRouteMatcher: (routes: string[]) => () => false,
}));

jest.mock("@uba/auth", () => ({
  getUserRoles: jest.fn().mockResolvedValue(["BA"]),
}));

jest.mock("@uba/security", () => ({
  canAccessRoute: jest.fn().mockReturnValue(true),
  getPortalHome: jest.fn().mockReturnValue("/portal/ba-portal/dashboard"),
}));

describe("Middleware", () => {
  it("is a function", () => {
    expect(typeof middleware).toBe("function");
  });

  it("config matcher includes API routes", () => {
    const { config } = require("../../middleware");
    expect(config.matcher).toContain("/(api|trpc)(.*)");
  });
});
