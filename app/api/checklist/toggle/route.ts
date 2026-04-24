import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";
export async function POST(req: Request) {
  const { id, is_done } = await req.json();
  const supabase = createServiceSupabase();
  const { error } = await supabase.from("checklist").update({ is_done }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
