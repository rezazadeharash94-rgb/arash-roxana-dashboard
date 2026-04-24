"use client";
import { useEffect, useRef } from "react";
import { Music } from "lucide-react";
import type { Month } from "@/lib/types";
export function MonthlyMusic({ month }: { month: Month | undefined }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => { const audio = ref.current; if (!audio) return; audio.play().catch(() => {}); }, []);
  return <div className="luxe-card p-6"><div className="mb-4 flex items-center gap-3"><div className="rounded-2xl bg-rose/20 p-3 text-rose"><Music className="h-6 w-6"/></div><div><h2 className="text-xl font-black">موزیک ماه جاری</h2><p className="text-sm font-bold text-stone-500">{month?.month_title || "ماه جاری"}</p></div></div>{month?.song_url ? <><audio ref={ref} controls muted className="w-full" src={month.song_url}/><p className="mt-3 text-xs font-bold leading-6 text-stone-400">مرورگرها گاهی autoplay را قبل از اولین کلیک می‌بندند.</p></> : <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 p-6 text-center text-sm font-bold text-stone-400">هنوز برای این ماه آهنگی ثبت نشده.</div>}</div>;
}
