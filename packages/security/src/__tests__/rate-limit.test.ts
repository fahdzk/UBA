
import { RateLimiter } from "../rate-limiter";
import { Redis } from "@upstash/redis";

jest.mock("@upstash/redis");

describe("RateLimiter", () => {
  let limiter: RateLimiter;

  beforeEach(() => {
    (Redis as jest.Mock).mockImplementation(() => ({
      incr: jest.fn().mockResolvedValue(1),
      expire: jest.fn().mockResolvedValue(true),
    }));
    limiter = new RateLimiter();
  });

  it("allows requests under limit", async () => {
    const result = await limiter.check("test-key", 10, 60);
    expect(result.allowed).toBe(true);
  });

  it("blocks requests over limit", async () => {
    (Redis as jest.Mock).mockImplementation(() => ({
      incr: jest.fn().mockResolvedValue(11),
      expire: jest.fn().mockResolvedValue(true),
    }));
    const result = await limiter.check("test-key", 10, 60);
    expect(result.allowed).toBe(false);
  });
});
