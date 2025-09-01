// Simple in-memory token bucket rate limiter (per IP + route)
// For production across multiple instances use Redis/Upstash.
interface Bucket { tokens: number; lastRefill: number; }
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, capacity = 10, refillPerSec = 1) {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { tokens: capacity, lastRefill: now };
    buckets.set(key, bucket);
  }
  const elapsed = (now - bucket.lastRefill) / 1000;
  if (elapsed > 0) {
    const refill = Math.floor(elapsed * refillPerSec);
    if (refill > 0) {
      bucket.tokens = Math.min(capacity, bucket.tokens + refill);
      bucket.lastRefill = now;
    }
  }
  if (bucket.tokens <= 0) return false;
  bucket.tokens -= 1;
  return true;
}
