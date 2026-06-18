
/**
 * @jest-environment node
 */
import { GET, POST } from "../../../app/api/applications/route";
import { prisma } from "@uba/database";

jest.mock("@clerk/nextjs/server", () => ({
  auth: () => Promise.resolve({ userId: "test-user-id" }),
}));

describe("Applications API", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  describe("GET /api/applications", () => {
    it("returns user applications", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
      (prisma.application.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.application.count as jest.Mock).mockResolvedValue(0);

      const req = new Request("http://localhost/api/applications");
      const res = await GET(req as any);
      expect(res.status).toBe(200);
    });
  });

  describe("POST /api/applications", () => {
    it("prevents duplicate applications", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
      (prisma.application.findUnique as jest.Mock).mockResolvedValue({ id: "existing" });

      const req = new Request("http://localhost/api/applications", {
        method: "POST",
        body: JSON.stringify({ jobId: "job-1" }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req as any);
      expect(res.status).toBe(400);
    });

    it("creates application", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
      (prisma.application.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.application.create as jest.Mock).mockResolvedValue({ id: "app-1" });

      const req = new Request("http://localhost/api/applications", {
        method: "POST",
        body: JSON.stringify({ jobId: "job-1", coverLetter: "Test" }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req as any);
      expect(res.status).toBe(200);
    });
  });
});
