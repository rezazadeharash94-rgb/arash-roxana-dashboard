import Image from "next/image";
import Link from "next/link";
import { Heart, Settings, Sparkles } from "lucide-react";
import type { Media } from "@/lib/types";
import { money } from "@/lib/persian";

export function LuxuryHero({ title, tagline, quote, totalIncome, totalInvestment, net, couplePhotos }: { title: string; tagline: string; quote: string; totalIncome: number; totalInvestment: number; net: number; couplePhotos: Media[] }) {
  return (
    <section className="luxe-card relative overflow-hidden p-6 md:p-9">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-rose/20 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-stone-600 ring-1 ring-white/70"><Sparkles className="h-4 w-4 text-gold"/>Luxury Love Dashboard</div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-stone-900 md:text-6xl">{title}</h1>
          <p className="mt-4 text-xl font-extrabold text-stone-700">{tagline}</p>
          <p className="mt-4 max-w-2xl leading-8 text-stone-500">{quote}</p>
          <div className="mt-6 flex flex-wrap gap-3"><Badge label="کل ورودی" value={money(totalIncome)}/><Badge label="سرمایه‌گذاری" value={money(totalInvestment)}/><Badge label="مانده خالص" value={money(net)}/></div>
          <Link href="/admin" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-stone-900 px-5 py-3 font-black text-white shadow-xl transition hover:-translate-y-0.5"><Settings className="h-4 w-4"/>صفحه تنظیمات</Link>
        </div>
        <div className="grid grid-cols-[1fr_.78fr] gap-4">
          {couplePhotos[0] ? <figure className="relative h-80 overflow-hidden rounded-[2rem] shadow-luxe"><Image src={couplePhotos[0].url} alt="Arash and Roxana" fill className="object-cover"/></figure> : <Placeholder label="عکس دونفره اول" tall/>}
          <div className="grid gap-4">
            {couplePhotos[1] ? <figure className="relative h-44 overflow-hidden rounded-[2rem] shadow-luxe"><Image src={couplePhotos[1].url} alt="Arash and Roxana" fill className="object-cover"/></figure> : <Placeholder label="عکس دونفره دوم"/>}
            <div className="rounded-[2rem] bg-gradient-to-br from-gold/25 to-rose/25 p-5 shadow-luxe"><Heart className="mb-3 h-7 w-7 text-rose"/><p className="text-sm font-bold leading-7 text-stone-700">یک زندگی زیبا، با خاطره‌های زیبا و تصمیم‌های مالی درست.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Badge({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-sm"><div className="text-xs font-bold text-stone-500">{label}</div><div className="mt-1 text-lg font-black text-stone-900">{value}</div></div>; }
function Placeholder({ label, tall = false }: { label: string; tall?: boolean }) { return <div className={`flex ${tall ? "h-80" : "h-44"} items-center justify-center rounded-[2rem] border border-dashed border-stone-300 bg-white/50 text-sm font-black text-stone-400`}>{label}</div>; }
