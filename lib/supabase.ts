import { createClient } from "@supabase/supabase-js";

export function createServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) throw new Error("Supabase env values are missing");
  return createClient(url, service, { auth: { persistSession: false } });
}
