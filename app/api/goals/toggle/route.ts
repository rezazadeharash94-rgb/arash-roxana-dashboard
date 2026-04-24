import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";
export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createServiceSupabase();
  if (body.mode === "edit") {
    const { error } = await supabase.from("goals").update({ title: body.title, current_amount: body.current_amount, target_amount: body.target_amount }).eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }
  const { error } = await supabase.from("goals").update({ is_done: body.is_done }).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
