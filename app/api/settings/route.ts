import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";
export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createServiceSupabase();
  const rows = Object.entries(body).map(([key, value]) => ({ key, value: String(value ?? "") }));
  const { error } = await supabase.from("settings").upsert(rows, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
