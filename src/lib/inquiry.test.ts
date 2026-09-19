import { describe, expect, it } from "vitest";
import { isRealSlot, parseInquiry, pruneRateLimits, rateLimit } from "@/lib/inquiry";

/**
 * Behaviour of the booking gate.
 *
 * This is the only thing between the open internet and the database, and every
 * case below is one that actually reached production or was one deploy away
 * from it. Tests describe what a caller experiences, not how the code is
 * arranged inside.
 */

const valid = {
  name: "Marie Tremblay",
  email: "marie@example.com",
  phone: "613-555-0133",
  grade: "10",
  language: "Français",
  format: "online",
  message: "My daughter has a trigonometry test on Thursday.",
  slot: "2026-09-19T17:00",
  lang: "fr",
  consent: true,
};

describe("parseInquiry", () => {
  it("accepts a complete request and normalises the email", () => {
    const result = parseInquiry({ ...valid, email: "  Marie@Example.COM " });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.email).toBe("marie@example.com");
    expect(result.value.slot).toBe("2026-09-19T17:00");
  });

  it("refuses a request without consent", () => {
    const result = parseInquiry({ ...valid, consent: false });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors).toContain("consent");
  });

  it("refuses an address that is not an email", () => {
    for (const email of ["not-an-email", "a@b", "@example.com", ""]) {
      const result = parseInquiry({ ...valid, email });
      expect(result.ok, `${email} should be refused`).toBe(false);
    }
  });

  it("strips control characters rather than storing them", () => {
    // A newline in a name is how header injection gets attempted, since these
    // values end up in an email's subject and reply-to.
    const result = parseInquiry({
      ...valid,
      name: "Marie\r\nBcc: someone@evil.example",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.name).not.toContain("\n");
    expect(result.value.name).not.toContain("\r");
  });

  it("reports the honeypot separately so the caller can stay silent", () => {
    const result = parseInquiry({ ...valid, website: "http://spam.example" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors).toEqual(["rejected"]);
  });

  it("drops a slot that is not a real moment instead of passing it on", () => {
    // 2026-13-01 matched the old shape check and then threw when formatted
    // for the notification email, after the booking had already been stored.
    for (const slot of ["2026-13-01T10:00", "2026-99-99T99:99", "2026-02-30T17:00"]) {
      const result = parseInquiry({ ...valid, slot });
      expect(result.ok, `${slot} should parse`).toBe(true);
      if (!result.ok) return;
      expect(result.value.slot, `${slot} should be discarded`).toBe("");
    }
  });

  it("refuses values the form could never have produced", () => {
    expect(parseInquiry({ ...valid, grade: "99" }).ok).toBe(false);
    expect(parseInquiry({ ...valid, format: "telepathy" }).ok).toBe(false);
    expect(parseInquiry({ ...valid, language: "Klingon" }).ok).toBe(false);
  });

  it("caps a message rather than letting it through", () => {
    const result = parseInquiry({ ...valid, message: "x".repeat(50_000) });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.message.length).toBeLessThanOrEqual(2000);
  });

  it("rejects a body that is not an object", () => {
    for (const body of [null, "string", 42, undefined]) {
      expect(parseInquiry(body).ok).toBe(false);
    }
  });
});

describe("isRealSlot", () => {
  it("accepts a real moment and rejects an impossible one", () => {
    expect(isRealSlot("2026-09-19T17:00")).toBe(true);
    expect(isRealSlot("2026-13-01T10:00")).toBe(false);
    expect(isRealSlot("2026-02-30T17:00")).toBe(false);
    expect(isRealSlot("19-09-2026T17:00")).toBe(false);
    expect(isRealSlot("")).toBe(false);
  });
});

describe("rateLimit", () => {
  it("allows a burst then refuses, per caller", () => {
    const key = `test-${Math.random()}`;
    const results = Array.from({ length: 7 }, () => rateLimit(key).allowed);
    expect(results.slice(0, 5)).toEqual([true, true, true, true, true]);
    expect(results.slice(5)).toEqual([false, false]);

    // A different visitor is unaffected by the first one's burst.
    expect(rateLimit(`other-${Math.random()}`).allowed).toBe(true);
  });

  it("tells a refused caller how long to wait", () => {
    const key = `retry-${Math.random()}`;
    for (let i = 0; i < 6; i += 1) rateLimit(key);
    expect(rateLimit(key).retryAfter).toBeGreaterThan(0);
  });

  it("prunes without throwing", () => {
    expect(() => pruneRateLimits(Date.now() + 60 * 60 * 1000)).not.toThrow();
  });
});
