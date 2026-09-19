/**
 * Validation and abuse limits for booking requests.
 *
 * Everything here runs on the server. Client-side `required` attributes are a
 * convenience for real people; they stop nobody who posts to the route
 * directly, so the rules that matter live here.
 */

export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  grade: string;
  language: string;
  format: string;
  message: string;
  lang: string;
  slot: string;
  consent: boolean;
};

/** Caps exist so a single request cannot push megabytes into storage or email. */
const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  grade: 20,
  language: 40,
  format: 20,
  message: 2000,
  lang: 5,
  slot: 20,
} as const;

import { GRADES, SESSION_LANGUAGES } from "@/lib/content";

const FORMATS = ["online", "in-person", "either"] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLOT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

/**
 * True only for a slot id that names a real moment. The regex alone accepts
 * 2026-13-01T10:00, and February 30th silently rolls forward to March, so the
 * parsed date is formatted back and compared to what was sent.
 */
export function isRealSlot(value: string): boolean {
  if (!SLOT.test(value)) return false;
  const date = new Date(`${value}:00`);
  if (Number.isNaN(date.getTime())) return false;

  const pad = (n: number) => String(n).padStart(2, "0");
  const rebuilt =
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return rebuilt === value;
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // Strip control characters, which have no place in a form field and are a
  // common way to smuggle line breaks into an email header.
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

export function parseInquiry(
  input: unknown,
): { ok: true; value: Inquiry } | { ok: false; errors: string[] } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, errors: ["body"] };
  }

  const raw = input as Record<string, unknown>;

  // Honeypot: a hidden field real people never fill in. Bots fill everything.
  if (clean(raw.website, 100) !== "") {
    return { ok: false, errors: ["rejected"] };
  }

  const value: Inquiry = {
    name: clean(raw.name, LIMITS.name),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    phone: clean(raw.phone, LIMITS.phone),
    grade: clean(raw.grade, LIMITS.grade),
    language: clean(raw.language, LIMITS.language),
    format: clean(raw.format, LIMITS.format),
    message: clean(raw.message, LIMITS.message),
    lang: clean(raw.lang, LIMITS.lang) === "fr" ? "fr" : "en",
    // Shape-checked rather than trusted: it lands in a confirmation message.
    slot: isRealSlot(clean(raw.slot, LIMITS.slot))
      ? clean(raw.slot, LIMITS.slot)
      : "",
    // Recorded as given: consent is a claim the sender makes, so it is stored
    // rather than assumed, and the request is refused without it.
    consent: raw.consent === true || raw.consent === "on",
  };

  const errors: string[] = [];
  if (value.name.length < 2) errors.push("name");
  if (!EMAIL.test(value.email)) errors.push("email");
  if (!(GRADES as readonly string[]).includes(value.grade)) errors.push("grade");
  if (
    value.language !== "" &&
    !(SESSION_LANGUAGES as readonly string[]).includes(value.language)
  ) {
    errors.push("language");
  }
  if (value.format !== "" && !(FORMATS as readonly string[]).includes(value.format)) {
    errors.push("format");
  }
  if (value.message.length < 5) errors.push("message");
  if (!value.consent) errors.push("consent");

  return errors.length > 0 ? { ok: false, errors } : { ok: true, value };
}

/**
 * Fixed-window rate limit, in memory.
 *
 * Good enough to stop a script hammering the form from one address. It does
 * NOT survive a restart and is not shared between serverless instances, so it
 * gets replaced by a shared store (Upstash or a Postgres table) once this is
 * deployed on more than one instance.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  return { allowed: true, retryAfter: 0 };
}

/** Keeps the map from growing without bound on a long-lived instance. */
export function pruneRateLimits(now = Date.now()) {
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}
