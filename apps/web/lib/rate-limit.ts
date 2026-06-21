import { LRUCache } from "lru-cache";

type RateLimitOptions = {
  limit: number;
  window: number; // seconds
};

type RateLimitResult = {
  success: boolean;
  remaining: number;
  reset: number;
};

const cache = new LRUCache<string, number[]>({ max: 10000 });

export async function rateLimit(
  identifier: string,
  namespace: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const key = `${namespace}:${identifier}`;
  const now = Date.now();
  const windowMs = options.window * 1000;

  const requests = (cache.get(key) ?? []).filter((ts) => now - ts < windowMs);

  if (requests.length >= options.limit) {
    return {
      success: false,
      remaining: 0,
      reset: Math.ceil((requests[0] + windowMs - now) / 1000),
    };
  }

  requests.push(now);
  cache.set(key, requests);

  return {
    success: true,
    remaining: options.limit - requests.length,
    reset: 0,
  };
}
