-- Booking requests from the website.
--
-- Run this once in the Supabase SQL editor (left sidebar, "SQL Editor",
-- then "New query", paste, Run).
--
-- Security model: the site never talks to this table from the browser. The
-- server inserts with the service role key, which bypasses row level security.
-- RLS is switched ON with NO policies, so anon and authenticated keys can read
-- and write nothing. If the anon key ever leaks, it opens nothing here.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Who is asking
  name text not null,
  email text not null,
  phone text,

  -- What they need
  grade text not null,
  language text,
  format text,
  message text not null,

  -- Chosen slot, e.g. 2026-09-19T17:00. Null when they did not pick one.
  slot text,

  -- Where the request came from and how it has been handled
  lang text not null default 'en',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'booked', 'declined')),
  notes text
);

-- One booking per slot, once a slot is actually confirmed. Pending requests
-- can overlap: two families may ask for Saturday 10:00 before either is booked.
create unique index if not exists bookings_confirmed_slot_idx
  on public.bookings (slot)
  where status = 'booked' and slot is not null;

create index if not exists bookings_created_at_idx
  on public.bookings (created_at desc);

alter table public.bookings enable row level security;

-- Deliberately no policies. Nothing but the service role touches this table.

comment on table public.bookings is
  'Booking requests from tutoringottawa. Server-side writes only; RLS on with no policies.';
