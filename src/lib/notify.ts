import "server-only";
import type { Inquiry } from "@/lib/inquiry";

/**
 * Emails you when a booking request comes in.
 *
 * Plain fetch against the Resend API rather than their SDK: it is one POST, and
 * a dependency that does one POST is a dependency to keep updated forever.
 *
 * Never throws. The request is already saved by the time this runs, so a mail
 * outage must not turn a stored booking into an error for the family.
 */

const API = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatSlot(slot: string): string {
  if (!slot) return "No time chosen";
  const [date, time] = slot.split("T");
  const when = new Date(`${date}T${time}:00`);
  if (Number.isNaN(when.getTime())) return slot;
  return `${new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(when)} at ${time}`;
}

export async function notifyNewBooking(inquiry: Inquiry): Promise<void> {
  try {
    await send(inquiry);
  } catch (error) {
    // The booking is already stored by the time this runs. Nothing here is
    // allowed to turn a saved booking into an error for the family, including
    // a date that fails to format.
    console.error("[notify] could not send", error);
  }
}

async function send(inquiry: Inquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from = process.env.NOTIFY_FROM ?? "Tutoring Ottawa <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Say so in the logs. A silent skip here is indistinguishable from a
    // delivery failure, which makes it painful to diagnose in production.
    console.warn(
      "[notify] skipped: not configured",
      `RESEND_API_KEY ${apiKey ? "set" : "MISSING"}`,
      `NOTIFY_EMAIL ${to ? "set" : "MISSING"}`,
    );
    return;
  }

  const rows: [string, string][] = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone || "not given"],
    ["Grade", inquiry.grade],
    ["Language", inquiry.language || "not given"],
    ["Format", inquiry.format || "not given"],
    ["Requested time", formatSlot(inquiry.slot)],
    ["Page language", inquiry.lang],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 4px">New booking request</h2>
      <p style="margin:0 0 20px;color:#5a6560">${escapeHtml(
        formatSlot(inquiry.slot),
      )}</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#5a6560;white-space:nowrap">${label}</td>
            <td style="padding:6px 0;font-weight:500">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#5a6560">What they need help with</p>
      <p style="margin:0;padding:12px 14px;background:#f4f5f2;border-radius:10px;white-space:pre-wrap">${escapeHtml(
        inquiry.message,
      )}</p>
      <p style="margin:24px 0 0;color:#5a6560;font-size:13px">
        Reply to this email to answer ${escapeHtml(inquiry.name)} directly.
      </p>
    </div>`;

  {
    const res = await fetch(API, {
      method: "POST",
      // Without a deadline a hung provider holds the HTTP response open until
      // the platform kills the function.
      signal: AbortSignal.timeout(8000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Hitting reply answers the family, not the robot.
        reply_to: inquiry.email,
        subject: `Booking request: Grade ${inquiry.grade}, ${formatSlot(inquiry.slot)}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[notify] Resend rejected the email", res.status, await res.text());
      return;
    }

    // The id makes a delivery traceable in Resend's dashboard later.
    const { id } = (await res.json()) as { id?: string };
    console.info("[notify] sent", id);
  }
}
