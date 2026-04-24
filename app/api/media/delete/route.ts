import { NextResponse } from "next/server";
import { createServiceSupabase } from "@/lib/supabase";

function pathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/memories/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length));
}

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) return NextResponse.json({ error: "شناسه فایل وجود ندارد." }, { status: 400 });

  const supabase = createServiceSupabase();

  const { data: item, error: readError } = await supabase.from("media").select("*").eq("id", id).single();
  if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });

  const filePath = pathFromPublicUrl(item.url);
  if (filePath) await supabase.storage.from("memories").remove([filePath]);

  const { error: deleteError } = await supabase.from("media").delete().eq("id", id);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });

  if (item.type === "month_song" && item.month_id) {
    await supabase.from("months").update({ song_url: "" }).eq("id", item.month_id);
  }

  return NextResponse.json({ ok: true });
}
