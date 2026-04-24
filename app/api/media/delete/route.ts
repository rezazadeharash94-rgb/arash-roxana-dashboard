import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";
export async function POST(req: Request) {
  const { id } = await req.json();
  const supabase = createServiceSupabase();
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
