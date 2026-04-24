import Image from "next/image";
import Link from "next/link";
import { Heart, Settings, Sparkles, Crown } from "lucide-react";
import type { Media } from "@/lib/types";
import { money } from "@/lib/persian";

type Props = {
  title: string;
  tagline: string;
  quote: string;
  totalIncome: number;
  totalInvestment: number;
  net: number;
  couplePhotos: Media[];
};

export function LuxuryHero({ title, tagline, quote, totalIncome, totalInvestment, net, couplePhotos }: Props) {
  return (
    <section className="luxe-card-strong sparkle-bg relative overflow-hidden p-5 md:p-8 lg:p-10">
      <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[#e8c98f]/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-28 h-96 w-96 rounded-full bg-[#d98fa0]/28 blur-3xl" />

      <div className="relative grid gap-8 xl:grid-cols-[1.05fr_.95fr] xl:items-center">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-4 py-2 text-xs font-black text-stone-600 shadow-sm">
            <Crown className="h-4 w-4 text-[#d6a75f]" />
            Luxury Life & Wealth Journey
          </div>

          <h1 className="gold-text text-5xl font-black leading-tight tracking-tight md:text-7xl">{title}</h1>
          <p className="mt-4 text-2xl font-black text-stone-700 md:text-3xl">{tagline}</p>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-9 text-stone-500">
            {quote || "Building our dream life, one memory and one milestone at a time."}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <HeroMiniStat label="کل ورودی" value={money(totalIncome)} />
            <HeroMiniStat label="سرمایه‌گذاری" value={money(totalInvestment)} />
            <HeroMiniStat label="مانده خالص" value={money(net)} />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/admin" className="luxe-button inline-flex items-center gap-2">
              <Settings className="h-4 w-4" />
              صفحه تنظیمات
            </Link>
            <a href="#timeline" className="luxe-button-soft inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#d6a75f]" />
              خاطرات ماهانه
            </a>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_.74fr] gap-4">
          {couplePhotos[0] ? (
            <figure className="group relative h-[390px] overflow-hidden rounded-[2.4rem] border border-white/80 shadow-2xl">
              <Image src={couplePhotos[0].url} alt="Arash and Roxana" fill className="object-cover transition duration-700 group-hover:scale-105" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
            </figure>
          ) : <Placeholder label="عکس اصلی دونفره" tall />}

          <div className="grid gap-4">
            {couplePhotos[1] ? (
              <figure className="group relative h-48 overflow-hidden rounded-[2rem] border border-white/80 shadow-xl">
                <Image src={couplePhotos[1].url} alt="Arash and Roxana" fill className="object-cover transition duration-700 group-hover:scale-105" />
              </figure>
            ) : <Placeholder label="عکس دوم" />}

            <div className="rounded-[2rem] border border-white/70 bg-gradient-to-br from-white/75 to-[#f6d9df]/60 p-5 shadow-xl backdrop-blur">
              <Heart className="mb-3 h-8 w-8 text-[#d98fa0]" />
              <p className="text-sm font-black leading-7 text-stone-700">
                یک مسیر مشترک برای ساختن آینده‌ای زیبا، پر از خاطره، رشد و عشق.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/70 bg-white/65 p-4 shadow-sm backdrop-blur">
      <div className="text-xs font-black text-stone-400">{label}</div>
      <div className="mt-2 text-xl font-black text-stone-900">{value}</div>
    </div>
  );
}

function Placeholder({ label, tall = false }: { label: string; tall?: boolean }) {
  return (
    <div className={`flex ${tall ? "h-[390px]" : "h-48"} items-center justify-center rounded-[2rem] border border-dashed border-stone-300 bg-white/45 text-sm font-black text-stone-400`}>
      {label}
    </div>
  );
}
