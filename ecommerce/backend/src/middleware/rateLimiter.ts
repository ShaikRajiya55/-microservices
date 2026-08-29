import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/Errors';

const ipBucketMap = new Map<string, { tokens: number; lastRefill: number }>();
const MAX_TOKENS = 100;
const REFILL_INTERVAL_MS = 60000;

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.socket.remoteAddress || 'unknown_ip';
  const now = Date.now();

  let bucket = ipBucketMap.get(ip);
  if (!bucket) {
    bucket = { tokens: MAX_TOKENS, lastRefill: now };
    ipBucketMap.set(ip, bucket);
  }

  const elapsed = now - bucket.lastRefill;
  if (elapsed > REFILL_INTERVAL_MS) {
    bucket.tokens = MAX_TOKENS;
    bucket.lastRefill = now;
  }

  if (bucket.tokens <= 0) {
    return next(new AppError('Too many requests. Rate limit exceeded.', 429));
  }

  bucket.tokens -= 1;
  next();
}
