
/**
 * @jest-environment node
 */
import { GET, POST } from "../../../app/api/jobs/route";
import { prisma } from "@uba/database";

jest.mock("@clerk/nextjs/server", () => ({
  auth: () => Promise.resolve({ userId: "test-user-id" }),
}));

describe("Jobs API", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  describe("GET /api/jobs", () => {
    it("returns public job listings", async () => {
      (prisma.job.findMany as jest.Mock).mockResolvedValue([
        { id: "1", title: "Test Job", agency: { companyName: "Test Co", verified: true } },
      ]);
      (prisma.job.count as jest.Mock).mockResolvedValue(1);

      const req = new Request("http://localhost/api/jobs");
      const res = await GET(req as any);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.jobs).toHaveLength(1);
    });

    it("filters by search term", async () => {
      (prisma.job.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.job.count as jest.Mock).mockResolvedValue(0);

      const req = new Request("http://localhost/api/jobs?search=brand");
      const res = await GET(req as any);
      expect(res.status).toBe(200);
    });
  });

  describe("POST /api/jobs", () => {
    it("requires agency profile", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
      (prisma.agencyProfile.findUnique as jest.Mock).mockResolvedValue(null);

      const req = new Request("http://localhost/api/jobs", {
        method: "POST",
        body: JSON.stringify({ title: "Test", description: "Desc" }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req as any);
      expect(res.status).toBe(403);
    });

    it("creates job for agency", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
      (prisma.agencyProfile.findUnique as jest.Mock).mockResolvedValue({ id: "agency-1" });
      (prisma.job.create as jest.Mock).mockResolvedValue({ id: "job-1", title: "Test" });

      const req = new Request("http://localhost/api/jobs", {
        method: "POST",
        body: JSON.stringify({ title: "Test", description: "Desc", location: "NYC" }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req as any);
      expect(res.status).toBe(200);
    });
  });
});
