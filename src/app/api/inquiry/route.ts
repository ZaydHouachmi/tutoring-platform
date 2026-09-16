import { NextResponse } from "next/server";

/**
 * Booking requests from the landing page.
 *
 * Phase 1: validates the payload and logs it on the server. Nothing is stored
 * and no email is sent yet, so requests are NOT delivered anywhere.
 * Phase 2 replaces the log with a Supabase insert plus a confirmation email.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["name", "email", "grade", "message"];
  const missing = required.filter((field) => !String(payload[field] ?? "").trim());

  if (missing.length > 0) {
    return NextResponse.json({ error: "Missing fields", missing }, { status: 422 });
  }

  console.info("[inquiry]", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
