import { Car, Plane, PiggyBank, Wallet, TrendingUp } from "lucide-react";
import { money } from "@/lib/persian";

export function StatsCards({
  carGoal,
  tripGoal,
  funGoal,
  investGoal,
  net,
}: {
  carGoal: number;
  tripGoal: number;
  funGoal: number;
  investGoal: number;
  net?: number;
}) {
  const items = [
    { title: "مانده فعلی", value: net || 0, icon: TrendingUp, desc: "تصویر امروز" },
    { title: "هدف خودرو", value: carGoal, icon: Car, desc: "رویای جاده‌ای شما" },
    { title: "سفر اروپا", value: tripGoal, icon: Plane, desc: "خاطره‌های لاکچری" },
    { title: "خوش‌گذرانی", value: funGoal, icon: Wallet, desc: "لذت کنترل‌شده" },
    { title: "سرمایه‌گذاری", value: investGoal, icon: PiggyBank, desc: "ساخت آینده" },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <div key={item.title} className="luxe-card group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-1">
          <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-[#e8c98f]/20 blur-2xl transition group-hover:bg-[#d98fa0]/20" />
          <div className="relative">
            <div className="mb-4 inline-flex rounded-2xl bg-white/70 p-3 text-[#b98242] shadow-sm">
              <item.icon className="h-6 w-6" />
            </div>
            <div className="text-sm font-black text-stone-500">{item.title}</div>
            <div className="mt-2 text-2xl font-black text-stone-900">{money(item.value)}</div>
            <div className="mt-2 text-xs font-bold text-stone-400">{item.desc}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
