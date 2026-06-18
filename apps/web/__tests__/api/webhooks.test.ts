
/**
 * @jest-environment node
 */
import { POST } from "../../../app/api/webhooks/stripe/route";

jest.mock("stripe", () => {
  const mockConstructEvent = jest.fn();
  return jest.fn(() => ({
    webhooks: { constructEvent: mockConstructEvent },
  }));
});

describe("Stripe Webhook API", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it("returns 400 for invalid signature", async () => {
    const req = new Request("http://localhost/api/webhooks/stripe", {
      method: "POST",
      body: JSON.stringify({ type: "payment_intent.succeeded" }),
      headers: { "stripe-signature": "invalid" },
    });

    const res = await POST(req as any);
    expect(res.status).toBe(400);
  });
});
