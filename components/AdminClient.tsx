"use client";

import { useMemo, useState, useTransition } from "react";
import type { Goal, Media, Month } from "@/lib/types";
import { ImagePlus, Music, Save, Trash2, UploadCloud } from "lucide-react";

type Props = {
  settings: Record<string, string>;
  months: Month[];
  goals: Goal[];
  media: Media[];
};

export function AdminClient({ settings, months, goals, media }: Props) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const couplePhotos = useMemo(
    () => media.filter((m) => m.type === "couple_photo").sort((a, b) => a.sort_order - b.sort_order),
    [media]
  );

  const monthPhotos = useMemo(
    () => media.filter((m) => m.type === "month_photo").sort((a, b) => a.sort_order - b.sort_order),
    [media]
  );

  const monthSongs = useMemo(
    () => media.filter((m) => m.type === "month_song").sort((a, b) => a.sort_order - b.sort_order),
    [media]
  );

  const allUploadedImages = useMemo(
    () => media
      .filter((m) => m.type === "couple_photo" || m.type === "month_photo")
      .sort((a, b) => a.sort_order - b.sort_order),
    [media]
  );

  async function saveSettings(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    startTransition(async () => {
      const res = await fetch("/api/settings", { method: "POST", body: JSON.stringify(payload) });
      setMessage(res.ok ? "تنظیمات ذخیره شد." : "خطا در ذخیره تنظیمات.");
      if (res.ok) setTimeout(() => window.location.reload(), 700);
    });
  }

  async function saveMonth(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    startTransition(async () => {
      const res = await fetch("/api/months", {
        method: "POST",
        body: JSON.stringify({
          id: payload.id,
          month_title: payload.month_title,
          income: Number(payload.income || 0),
          expense: Number(payload.expense || 0),
          investment: Number(payload.investment || 0),
          note: payload.note,
        }),
      });
      setMessage(res.ok ? "اطلاعات ماه ذخیره شد." : "خطا در ذخیره ماه.");
      if (res.ok) setTimeout(() => window.location.reload(), 700);
    });
  }

  async function upload(formData: FormData) {
    startTransition(async () => {
      const res = await fetch("/api/media/upload", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data.error || "خطا در آپلود فایل.");
        return;
      }

      setMessage("فایل با موفقیت آپلود شد.");
      setTimeout(() => window.location.reload(), 800);
    });
  }

  async function deleteMedia(id: string) {
    const ok = confirm("مطمئنی می‌خوای این فایل حذف بشه؟");
    if (!ok) return;

    startTransition(async () => {
      const res = await fetch("/api/media/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data.error || "خطا در حذف فایل.");
        return;
      }

      setMessage("فایل حذف شد.");
      setTimeout(() => window.location.reload(), 700);
    });
  }

  function getMonthTitle(monthId: string | null) {
    if (!monthId) return "عکس دونفره / هدر";
    return months.find((m) => m.id === monthId)?.month_title || "ماه نامشخص";
  }

  return (
    <div className="mx-auto grid max-w-[1360px] gap-5 p-4 md:p-7">
      <section className="luxe-card p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black text-gold">Admin Panel</p>
            <h1 className="mt-2 text-4xl font-black">پنل تنظیمات کامل سایت</h1>
            <p className="mt-3 text-sm font-bold text-stone-500">
              مدیریت عنوان‌ها، مبالغ، ماه‌ها، عکس‌های آپلودشده و آهنگ‌ها.
            </p>
          </div>
          <a href="/" className="luxe-button-soft">بازگشت به صفحه اصلی</a>
        </div>

        {message && (
          <div className="mt-5 rounded-2xl bg-emerald-50 p-4 font-bold text-emerald-700">
            {message}
          </div>
        )}
      </section>

      <section className="luxe-card p-6">
        <h2 className="mb-5 text-2xl font-black">تنظیمات کلی</h2>

        <form action={saveSettings} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field name="site_title" label="عنوان سایت" defaultValue={settings.site_title} />
          <Field name="site_tagline" label="زیرعنوان" defaultValue={settings.site_tagline} />
          <Field name="hero_quote" label="متن عاشقانه هدر" defaultValue={settings.hero_quote} />
          <Field name="starting_cash" label="پول نقد شروع" defaultValue={settings.starting_cash} type="number" />
          <Field name="car_goal" label="هدف خودرو" defaultValue={settings.car_goal} type="number" />
          <Field name="trip_goal" label="هدف سفر" defaultValue={settings.trip_goal} type="number" />
          <Field name="fun_goal" label="هدف خوش‌گذرانی" defaultValue={settings.fun_goal} type="number" />
          <Field name="invest_goal" label="هدف سرمایه‌گذاری" defaultValue={settings.invest_goal} type="number" />

          <button disabled={pending} className="luxe-button md:col-span-2 xl:col-span-4">
            <Save className="ml-2 inline h-4 w-4" />
            ذخیره تنظیمات
          </button>
        </form>
      </section>

      <section className="luxe-card p-6">
        <div className="mb-5">
          <h2 className="text-2xl font-black">مدیریت همه عکس‌های آپلودشده</h2>
          <p className="mt-2 text-sm font-bold text-stone-500">
            همه عکس‌های هدر و ماهانه اینجا نمایش داده می‌شوند و می‌توانی مستقیم حذفشان کنی.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allUploadedImages.length ? (
            allUploadedImages.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                label={getMonthTitle(item.month_id)}
                onDelete={() => deleteMedia(item.id)}
              />
            ))
          ) : (
            <EmptyMedia title="هنوز هیچ عکسی آپلود نشده است." />
          )}
        </div>
      </section>

      <section className="luxe-card p-6">
        <h2 className="mb-2 text-2xl font-black">افزودن عکس دونفره هدر</h2>
        <p className="mb-5 text-sm font-bold text-stone-500">
          دو عکس اول در صفحه اصلی نمایش داده می‌شوند.
        </p>

        <form action={upload} className="grid gap-4 md:grid-cols-[1fr_1fr_120px_auto]">
          <input type="hidden" name="type" value="couple_photo" />
          <input className="luxe-input" type="file" name="file" accept="image/*" required />
          <input className="luxe-input" name="caption" placeholder="کپشن اختیاری" />
          <input className="luxe-input" name="sort_order" type="number" defaultValue="0" placeholder="ترتیب" />
          <button disabled={pending} className="luxe-button">
            <UploadCloud className="ml-2 inline h-4 w-4" />
            آپلود
          </button>
        </form>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {couplePhotos.length ? (
            couplePhotos.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                label="عکس دونفره / هدر"
                onDelete={() => deleteMedia(item.id)}
              />
            ))
          ) : (
            <EmptyMedia title="هنوز عکس دونفره‌ای آپلود نشده." />
          )}
        </div>
      </section>

      <section className="grid gap-5">
        <h2 className="px-2 text-2xl font-black">ماه‌ها، گالری و آهنگ</h2>

        {months.map((month) => {
          const photos = monthPhotos.filter((m) => m.month_id === month.id);
          const songs = monthSongs.filter((m) => m.month_id === month.id);

          return (
            <div key={month.id} className="luxe-card p-6">
              <h3 className="mb-5 text-2xl font-black">{month.month_title}</h3>

              <form action={saveMonth} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <input type="hidden" name="id" value={month.id} />
                <Field name="month_title" label="عنوان ماه" defaultValue={month.month_title} />
                <Field name="income" label="درآمد" defaultValue={String(month.income)} type="number" />
                <Field name="expense" label="خرج" defaultValue={String(month.expense)} type="number" />
                <Field name="investment" label="سرمایه‌گذاری" defaultValue={String(month.investment)} type="number" />
                <Field name="note" label="یادداشت" defaultValue={month.note} />
                <button disabled={pending} className="luxe-button xl:col-span-5">
                  ذخیره اطلاعات {month.month_title}
                </button>
              </form>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                <div className="rounded-[1.7rem] border border-stone-200 bg-white/60 p-4">
                  <div className="mb-4 flex items-center gap-2 font-black">
                    <ImagePlus className="h-5 w-5 text-gold" />
                    افزودن عکس ماهانه
                  </div>

                  <form action={upload} className="grid gap-3">
                    <input type="hidden" name="type" value="month_photo" />
                    <input type="hidden" name="month_id" value={month.id} />
                    <input className="luxe-input" type="file" name="file" accept="image/*" required />
                    <input className="luxe-input" name="caption" placeholder="کپشن عکس" />
                    <input className="luxe-input" name="sort_order" type="number" defaultValue="0" placeholder="ترتیب نمایش" />
                    <button disabled={pending} className="luxe-button">آپلود عکس</button>
                  </form>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {photos.length ? (
                      photos.map((item) => (
                        <MediaCard
                          key={item.id}
                          item={item}
                          label={month.month_title}
                          onDelete={() => deleteMedia(item.id)}
                        />
                      ))
                    ) : (
                      <EmptyMedia title="هنوز عکسی برای این ماه نیست." />
                    )}
                  </div>
                </div>

                <div className="rounded-[1.7rem] border border-stone-200 bg-white/60 p-4">
                  <div className="mb-4 flex items-center gap-2 font-black">
                    <Music className="h-5 w-5 text-rose" />
                    آهنگ اختصاصی ماه
                  </div>

                  <form action={upload} className="grid gap-3">
                    <input type="hidden" name="type" value="month_song" />
                    <input type="hidden" name="month_id" value={month.id} />
                    <input className="luxe-input" type="file" name="file" accept="audio/*" required />
                    <input className="luxe-input" name="caption" placeholder="نام آهنگ / توضیح" />
                    <input type="hidden" name="sort_order" value="0" />
                    <button disabled={pending} className="luxe-button">آپلود / تغییر آهنگ</button>
                  </form>

                  <div className="mt-5 grid gap-3">
                    {songs.length ? (
                      songs.map((item) => (
                        <AudioCard key={item.id} item={item} onDelete={() => deleteMedia(item.id)} />
                      ))
                    ) : (
                      <EmptyMedia title="هنوز آهنگی برای این ماه نیست." />
                    )}
                  </div>

                  {month.song_url && (
                    <div className="mt-4 rounded-2xl bg-white/70 p-4">
                      <div className="mb-2 text-sm font-black text-stone-600">آهنگ فعال فعلی:</div>
                      <audio controls className="w-full" src={month.song_url} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
}: {
  name: string;
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-stone-600">
      {label}
      <input className="luxe-input" name={name} type={type} defaultValue={defaultValue || ""} />
    </label>
  );
}

function MediaCard({
  item,
  label,
  onDelete,
}: {
  item: Media;
  label: string;
  onDelete: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-stone-200 bg-white shadow-sm">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img src={item.url} alt={item.caption || "media"} className="h-full w-full object-cover" />
      </div>
      <div className="grid gap-2 p-3">
        <div className="rounded-xl bg-stone-100 px-3 py-2 text-xs font-black text-stone-600">
          {label}
        </div>
        <div className="truncate text-xs font-bold text-stone-500">
          {item.caption || "بدون کپشن"}
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-600 transition hover:bg-red-100"
        >
          <Trash2 className="ml-1 inline h-4 w-4" />
          حذف
        </button>
      </div>
    </div>
  );
}

function AudioCard({ item, onDelete }: { item: Media; onDelete: () => void }) {
  return (
    <div className="rounded-[1.4rem] border border-stone-200 bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-black text-stone-700">
        {item.caption || "آهنگ ماه"}
      </div>
      <audio controls className="w-full" src={item.url} />
      <button
        type="button"
        onClick={onDelete}
        className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-600 transition hover:bg-red-100"
      >
        <Trash2 className="ml-1 inline h-4 w-4" />
        حذف آهنگ
      </button>
    </div>
  );
}

function EmptyMedia({ title }: { title: string }) {
  return (
    <div className="rounded-[1.4rem] border border-dashed border-stone-300 bg-white/50 p-6 text-center text-sm font-black text-stone-400">
      {title}
    </div>
  );
}
