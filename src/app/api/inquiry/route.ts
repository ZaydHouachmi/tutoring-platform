import { NextResponse } from "next/server";
import { parseInquiry, pruneRateLimits, rateLimit } from "@/lib/inquiry";

/**
 * Booking requests from the landing page.
 *
 * Phase 1: validates, rate limits, and logs on the server. Nothing is stored
 * and no email is sent yet, so requests are NOT delivered anywhere.
 * Phase 2 replaces the log with a Supabase insert plus a confirmation email.
 */

/** A request body this large is never a real booking request. */
const MAX_BODY_BYTES = 16 * 1024;

function clientKey(request: Request): string {
  // On Vercel this header is set by the platform. Locally it is absent, so
  // everything shares one bucket, which is fine for development.
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Body too large" }, { status: 413 });
  }

  pruneRateLimits();
  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseInquiry(body);
  if (!parsed.ok) {
    // The response never echoes back what was submitted: that is how reflected
    // input turns into someone else's problem.
    return NextResponse.json(
      { error: "Invalid submission", fields: parsed.errors },
      { status: 422 },
    );
  }

  console.info("[inquiry]", {
    ...parsed.value,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
