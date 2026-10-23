# Tutoring Ottawa

[![CI](https://github.com/ZaydHouachmi/tutoring-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/ZaydHouachmi/tutoring-platform/actions/workflows/ci.yml)

**The booking site for my math tutoring business in Ottawa (Grades 7–12), in English and French.**

Live: **[tutoring-platform-mauve.vercel.app](https://tutoring-platform-mauve.vercel.app)**

Families pick a time from the weekly schedule, fill in a short request, and it lands in a database and in my inbox. I run the business, so this is the real intake for real clients, and it's built to treat their information that way.

## What it does

- **Bilingual from the URL down.** Every page lives under `/en` or `/fr`, and the document language is set per locale.
- **Live schedule.** Offered times come from one rule in `src/lib/availability.ts` (Friday evenings, weekend daytime). The grid is generated from it, and `/api/slots` marks confirmed bookings as taken.
- **Booking requests.** `/api/inquiry` validates the request, stores it in Supabase and emails me through Resend.
- **Legal pages.** Privacy, terms, cookies and refunds, with a stated retention period, rendered from one source.

## Security, because the form is public

All of this runs on the server. Client-side checks are only a convenience for real people.

| Threat | What stops it |
|---|---|
| Malformed or hostile input | Every field is type-checked, length-capped and checked against an allowed list. Control characters are stripped so line breaks can't be smuggled into an email header. |
| Impossible dates | A slot id like `2026-02-30T10:00` passes a regex, so it's parsed and rebuilt, and has to match exactly. |
| Oversized requests | The body is measured in bytes actually received (16 KB cap), not trusted from `content-length`. |
| Bots | Honeypot field. A caught bot gets the same "OK" answer as a real person, so it can't tell it was caught. |
| Scripts hammering the form | Rate limit of 5 requests per 10 minutes per address, with `Retry-After`. |
| Data leaks | Row-level security is **on with no policies**: only the server's secret key can touch the table, so a leaked public key opens nothing. `/api/slots` returns slot ids only, never names or emails. Error responses never echo submitted input. |
| Consent | Required, and recorded as given rather than assumed. |

A mail outage never turns a stored booking into an error for the family: the notification runs after the response and never throws.

## Stack

| Piece | Used for |
|---|---|
| **Next.js** (App Router), React, TypeScript | Pages and API routes in one project |
| **Tailwind CSS** | Styling |
| **Supabase** (Postgres) | Booking storage, locked down with RLS |
| **Resend** | New-booking email, called with plain `fetch` |
| **Vitest** | Tests for validation, slot checking and rate limiting |
| **GitHub Actions** | Types, lint, tests and build on every push |
| **Vercel** | Hosting |

## Project layout

| Path | Role |
|---|---|
| `src/app/[lang]/` | Localised pages, including `legal/[doc]` |
| `src/app/api/inquiry/route.ts` | Booking requests: size cap, rate limit, validation, storage, notification |
| `src/app/api/slots/route.ts` | Which slots are already booked |
| `src/lib/inquiry.ts` | Validation rules and rate limiter (and `inquiry.test.ts`) |
| `src/lib/availability.ts` | The weekly schedule rule |
| `src/lib/content.ts`, `src/lib/legal.ts` | Bilingual copy and legal documents |
| `supabase/schema.sql` | Table, indexes and RLS setup |

## Running locally

```bash
npm install
cp .env.example .env.local   # optional: Supabase and Resend keys
npm run dev                  # http://localhost:3000
npm test
```

Without Supabase keys the form still works: requests are logged instead of stored, so a fresh clone runs with no setup. To store bookings, run `supabase/schema.sql` once in the Supabase SQL editor and fill in `.env.local`.

## Known limits

- The rate limiter is in memory. It doesn't survive a restart and isn't shared between serverless instances; it will move to a shared store (Upstash or a Postgres table) if traffic needs it.
- A confirmed slot is unique in the database, but pending requests can overlap on purpose: two families can ask for the same time before either is booked.

---

Built by [Zayd Houachmi](https://zaydhouachmi.github.io).
