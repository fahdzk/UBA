
import { canAccessRoute, getPortalHome } from "../rbac";

jest.mock("@uba/database", () => ({
  prisma: {
    userRole: { findMany: jest.fn().mockResolvedValue([
      { role: { name: "BA" } },
    ])},
  },
}));

describe("RBAC", () => {
  describe("canAccessRoute", () => {
    it("allows BA to access BA portal routes", () => {
      expect(canAccessRoute(["BA"], "/portal/ba-portal/dashboard")).toBe(true);
    });

    it("blocks BA from admin routes", () => {
      expect(canAccessRoute(["BA"], "/portal/admin-portal/dashboard")).toBe(false);
    });

    it("allows admin to access all routes", () => {
      expect(canAccessRoute(["ADMIN"], "/portal/admin-portal/dashboard")).toBe(true);
      expect(canAccessRoute(["ADMIN"], "/portal/ba-portal/dashboard")).toBe(true);
    });

    it("allows super_admin to access all routes", () => {
      expect(canAccessRoute(["SUPER_ADMIN"], "/portal/admin-portal/dashboard")).toBe(true);
    });
  });

  describe("getPortalHome", () => {
    it("returns BA portal for BA role", () => {
      expect(getPortalHome(["BA"])).toBe("/portal/ba-portal/dashboard");
    });

    it("returns agency portal for agency role", () => {
      expect(getPortalHome(["AGENCY_ADMIN"])).toBe("/portal/agency-portal/dashboard");
    });

    it("returns lawyer portal for lawyer role", () => {
      expect(getPortalHome(["LAWYER"])).toBe("/portal/lawyer-portal/dashboard");
    });

    it("returns admin portal for admin role", () => {
      expect(getPortalHome(["ADMIN"])).toBe("/portal/admin-portal/dashboard");
    });

    it("defaults to dashboard for unknown role", () => {
      expect(getPortalHome([])).toBe("/dashboard");
    });
  });
});
