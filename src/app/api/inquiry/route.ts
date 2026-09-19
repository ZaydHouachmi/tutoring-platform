import { after, NextResponse } from "next/server";
import { parseInquiry, pruneRateLimits, rateLimit } from "@/lib/inquiry";
import { isConfigured, supabase } from "@/lib/supabase";
import { notifyNewBooking } from "@/lib/notify";

/**
 * Booking requests from the landing page.
 *
 * Validated, rate limited, then stored in Supabase. Without Supabase
 * configured (a fresh clone, or local work with no .env.local) it logs instead
 * of failing, so the form still works in development.
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
  // content-length is client-controlled and omitting it made the cap pass with
  // 0. Measure the bytes actually received instead.
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
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
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseInquiry(body);

  // A honeypot only works while the bot cannot tell it tripped one, so a
  // caught submission gets the same answer a real one would.
  if (!parsed.ok && parsed.errors[0] === "rejected") {
    return NextResponse.json({ ok: true, stored: false });
  }

  if (!parsed.ok) {
    // The response never echoes back what was submitted: that is how reflected
    // input turns into someone else's problem.
    return NextResponse.json(
      { error: "Invalid submission", fields: parsed.errors },
      { status: 422 },
    );
  }

  const inquiry = parsed.value;

  if (!isConfigured) {
    console.warn("[inquiry] Supabase not configured, logging instead", {
      ...inquiry,
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase()
    .from("bookings")
    .insert({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || null,
      grade: inquiry.grade,
      language: inquiry.language || null,
      format: inquiry.format || null,
      message: inquiry.message,
      slot: inquiry.slot || null,
      lang: inquiry.lang,
    });

  if (error) {
    // Log the database's reason, tell the visitor nothing about our internals.
    console.error("[inquiry] insert failed", error.message);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  // Saved first, told second, and told after the response has gone out: the
  // family should not wait on an email provider to learn their request landed.
  after(() => notifyNewBooking(inquiry));

  return NextResponse.json({ ok: true, stored: true });
}
