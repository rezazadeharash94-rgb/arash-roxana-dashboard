import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createServiceSupabase();

  const { error } = await supabase
    .from("goals")
    .update({
      title: body.title,
      current_amount: Number(body.current_amount || 0),
      target_amount: Number(body.target_amount || 0),
    })
    .eq("id", body.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
