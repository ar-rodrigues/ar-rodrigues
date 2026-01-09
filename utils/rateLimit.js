/**
 * Simple in-memory rate limiter for IP-based request limiting
 * Tracks submission timestamps per IP address
 */

// Store IP addresses and their submission timestamps
const rateLimitStore = new Map();

// Configuration
const MAX_REQUESTS_PER_HOUR = 3;
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
const HOUR_MS = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Clean up old entries from the rate limit store
 * Removes entries older than 1 hour
 */
function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitStore.entries()) {
    // Filter timestamps within the last hour
    const recentTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < HOUR_MS
    );

    if (recentTimestamps.length === 0) {
      // Remove IP if no recent submissions
      rateLimitStore.delete(ip);
    } else {
      // Update with filtered timestamps
      rateLimitStore.set(ip, recentTimestamps);
    }
  }
}

/**
 * Check if an IP address is allowed to make a request
 * @param {string} ip - The IP address to check
 * @returns {{ allowed: boolean, remaining: number }} - Whether request is allowed and remaining requests
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) || [];

  // Filter timestamps within the last hour
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < HOUR_MS
  );

  // Check if limit is exceeded
  if (recentTimestamps.length >= MAX_REQUESTS_PER_HOUR) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  // Add current timestamp
  recentTimestamps.push(now);
  rateLimitStore.set(ip, recentTimestamps);

  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_HOUR - recentTimestamps.length,
  };
}

/**
 * Get the client IP address from a request
 * @param {Request} request - The incoming request
 * @returns {string} - The client IP address
 */
export function getClientIP(request) {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  // Fallback to connection remote address (if available)
  // In Next.js, we'll use a default if headers aren't available
  return "unknown";
}

// Start periodic cleanup
if (typeof setInterval !== "undefined") {
  setInterval(cleanupOldEntries, CLEANUP_INTERVAL_MS);
}






