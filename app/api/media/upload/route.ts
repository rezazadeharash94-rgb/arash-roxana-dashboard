import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const form = await req.formData();

  const file = form.get("file") as File | null;
  const type = String(form.get("type") || "");
  const month_id_raw = String(form.get("month_id") || "");
  const month_id = month_id_raw || null;
  const caption = String(form.get("caption") || "");
  const sort_order = Number(form.get("sort_order") || 0);

  if (!file) return NextResponse.json({ error: "هیچ فایلی انتخاب نشده است." }, { status: 400 });
  if (!["couple_photo", "month_photo", "month_song"].includes(type)) {
    return NextResponse.json({ error: "نوع فایل معتبر نیست." }, { status: 400 });
  }

  const supabase = createServiceSupabase();

  if (type === "month_photo" && month_id) {
    const { count, error: countError } = await supabase
      .from("media")
      .select("*", { count: "exact", head: true })
      .eq("type", "month_photo")
      .eq("month_id", month_id);

    if (countError) return NextResponse.json({ error: countError.message }, { status: 500 });
    if ((count || 0) >= 5) {
      return NextResponse.json({ error: "برای هر ماه حداکثر ۵ عکس مجاز است." }, { status: 400 });
    }
  }

  if (type === "month_song" && month_id) {
    await supabase.from("media").delete().eq("type", "month_song").eq("month_id", month_id);
  }

  const ext = file.name.split(".").pop() || "bin";
  const folder = type === "month_song" ? "songs" : "images";
  const path = `${folder}/${type}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("memories").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || undefined,
  });

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data } = supabase.storage.from("memories").getPublicUrl(path);
  const url = data.publicUrl;

  const { error: insertError } = await supabase.from("media").insert({
    type,
    month_id,
    url,
    caption,
    sort_order,
  });

  if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });

  if (type === "month_song" && month_id) {
    const { error: monthError } = await supabase.from("months").update({ song_url: url }).eq("id", month_id);
    if (monthError) return NextResponse.json({ error: monthError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, url });
}
