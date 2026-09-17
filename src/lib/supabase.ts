import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase, server side only.
 *
 * The service role key bypasses row level security, so it must never reach the
 * browser. The `server-only` import above makes that a build error rather than
 * a bad afternoon: importing this file from a client component fails the build.
 *
 * Both values are missing during local work until .env.local exists, so the
 * caller checks `isConfigured` and falls back to logging instead of crashing.
 */

const url = process.env.SUPABASE_URL;
// Supabase renamed these: sb_secret_... replaces the older service_role JWT.
// Both are accepted so an older project keeps working.
const serviceKey =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isConfigured = Boolean(url && serviceKey);

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient {
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase is not configured: set SUPABASE_URL and SUPABASE_SECRET_KEY",
    );
  }

  client ??= createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}
