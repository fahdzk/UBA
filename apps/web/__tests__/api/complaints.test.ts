
/**
 * @jest-environment node
 */
import { POST, GET } from "../../../app/api/complaints/route";
import { prisma } from "@uba/database";

const mockAuth = jest.fn(() => Promise.resolve({ userId: "test-user-id" }));
jest.mock("@clerk/nextjs/server", () => ({ auth: mockAuth }));

describe("Complaints API", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  describe("GET /api/complaints", () => {
    it("returns 401 when unauthenticated", async () => {
      mockAuth.mockResolvedValueOnce({ userId: null });
      const req = new Request("http://localhost/api/complaints");
      const res = await GET(req as any);
      expect(res.status).toBe(401);
    });

    it("returns complaints for authenticated user", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
      (prisma.complaint.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.complaint.count as jest.Mock).mockResolvedValue(0);

      const req = new Request("http://localhost/api/complaints");
      const res = await GET(req as any);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data).toHaveProperty("complaints");
      expect(data).toHaveProperty("total", 0);
    });
  });

  describe("POST /api/complaints", () => {
    it("creates a new complaint", async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: "user-1" });
      (prisma.complaint.create as jest.Mock).mockResolvedValue({
        id: "complaint-1", title: "Test", description: "Desc",
      });

      const req = new Request("http://localhost/api/complaints", {
        method: "POST",
        body: JSON.stringify({ title: "Test", description: "Desc", category: "Other" }),
        headers: { "Content-Type": "application/json" },
      });

      const res = await POST(req as any);
      expect(res.status).toBe(200);
    });
  });
});
