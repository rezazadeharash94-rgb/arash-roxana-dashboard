import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";
export async function POST(req: Request) {
  const body = await req.json();
  const { id, ...patch } = body;
  const supabase = createServiceSupabase();
  const { error } = await supabase.from("months").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
