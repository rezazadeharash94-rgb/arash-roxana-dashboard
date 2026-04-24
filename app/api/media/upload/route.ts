import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  const type = String(form.get("type") || "");
  const month_id = String(form.get("month_id") || "") || null;
  const caption = String(form.get("caption") || "");
  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  const supabase = createServiceSupabase();
  if (type === "month_photo" && month_id) {
    const { count } = await supabase.from("media").select("*", { count: "exact", head: true }).eq("type", "month_photo").eq("month_id", month_id);
    if ((count || 0) >= 5) return NextResponse.json({ error: "Maximum 5 images per month" }, { status: 400 });
  }
  const ext = file.name.split(".").pop() || "bin";
  const safeName = `${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
  const path = `${type}/${safeName}`;
  const { error: uploadError } = await supabase.storage.from("memories").upload(path, file, { cacheControl: "3600", upsert: false });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });
  const { data } = supabase.storage.from("memories").getPublicUrl(path);
  const url = data.publicUrl;
  if (type === "month_song" && month_id) {
    const { error } = await supabase.from("months").update({ song_url: url }).eq("id", month_id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, url });
  }
  const { error } = await supabase.from("media").insert({ type, month_id, caption, url, storage_path: path });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, url });
}
