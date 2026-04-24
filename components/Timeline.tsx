import Image from "next/image";
import { Music2, Camera } from "lucide-react";
import type { Media, Month } from "@/lib/types";
import { money } from "@/lib/persian";

export function Timeline({ months, media, currentMonthKey }: { months: Month[]; media: Media[]; currentMonthKey: string }) {
  return (
    <div id="timeline" className="luxe-card p-6">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-2 text-xs font-black text-stone-500">
          <Camera className="h-4 w-4 text-[#d6a75f]" />
          Memories Timeline
        </div>
        <h2 className="mt-3 text-2xl font-black">تایم‌لاین خاطرات</h2>
      </div>

      <div className="grid gap-5">
        {months.map((month) => {
          const photos = media.filter((m) => m.type === "month_photo" && m.month_id === month.id).slice(0, 5);
          const song = media.find((m) => m.type === "month_song" && m.month_id === month.id);
          const isCurrent = month.month_key === currentMonthKey;

          return (
            <article key={month.id} className={`relative overflow-hidden rounded-[2rem] border bg-white/65 p-5 shadow-sm transition hover:-translate-y-1 ${isCurrent ? "border-[#d6a75f]/80 ring-4 ring-[#d6a75f]/15" : "border-white/70"}`}>
              <div className="absolute -left-16 -top-16 h-36 w-36 rounded-full opacity-40 blur-2xl" style={{ background: month.color_from }} />
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl font-black gold-text">{month.month_title}</h3>
                      {isCurrent && <span className="rounded-full bg-[#e8c98f]/35 px-3 py-1 text-xs font-black text-stone-700">ماه جاری</span>}
                    </div>
                    <p className="mt-2 text-sm font-bold text-stone-500">{month.note || "هنوز یادداشتی ثبت نشده است."}</p>
                  </div>

                  {song?.url && (
                    <a href={song.url} target="_blank" className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 px-4 py-2 text-sm font-bold text-white">
                      <Music2 className="h-4 w-4" />
                      آهنگ ماه
                    </a>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm font-black text-stone-600">
                  <span className="rounded-full bg-white/70 px-3 py-2">درآمد: {money(month.income)}</span>
                  <span className="rounded-full bg-white/70 px-3 py-2">خرج: {money(month.expense)}</span>
                  <span className="rounded-full bg-white/70 px-3 py-2">سرمایه‌گذاری: {money(month.investment)}</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                  {photos.length ? photos.map((p) => (
                    <figure key={p.id} className="group relative h-36 overflow-hidden rounded-[1.5rem] bg-stone-100 shadow-sm">
                      <Image src={p.url} alt={p.caption || month.month_title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                    </figure>
                  )) : (
                    <div className="col-span-full rounded-[1.5rem] border border-dashed border-stone-300 bg-white/55 p-8 text-center text-sm font-black text-stone-400">
                      هنوز عکسی برای این ماه ثبت نشده.
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
