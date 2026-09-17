import { NextResponse } from "next/server";
import { isConfigured, supabase } from "@/lib/supabase";

/**
 * Which slots are already taken.
 *
 * Returns slot ids and nothing else. No names, no emails, no messages: this is
 * a public endpoint, so it must not leak who booked what. Only confirmed
 * bookings count, since a pending request should not block the calendar.
 */
export const revalidate = 0;

export async function GET() {
  if (!isConfigured) {
    return NextResponse.json({ taken: [] });
  }

  const { data, error } = await supabase()
    .from("bookings")
    .select("slot")
    .eq("status", "booked")
    .not("slot", "is", null)
    .gte("created_at", new Date(Date.now() - 90 * 86_400_000).toISOString());

  if (error) {
    console.error("[slots] query failed", error.message);
    // A failure here must not break booking: show everything as open and let
    // the confirmation step catch a clash.
    return NextResponse.json({ taken: [] });
  }

  return NextResponse.json({
    taken: data.map((row) => row.slot).filter(Boolean),
  });
}
