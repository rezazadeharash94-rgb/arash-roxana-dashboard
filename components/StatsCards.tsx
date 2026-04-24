import { Car, PiggyBank, Plane, Wallet } from "lucide-react";
import { money } from "@/lib/persian";
export function StatsCards({ carGoal, tripGoal, funGoal, investGoal }: { carGoal: number; tripGoal: number; funGoal: number; investGoal: number }) {
  const items = [{ title: "هدف خودرو", value: carGoal, icon: Car }, { title: "سفر اروپا", value: tripGoal, icon: Plane }, { title: "خوش‌گذرانی", value: funGoal, icon: Wallet }, { title: "سرمایه‌گذاری", value: investGoal, icon: PiggyBank }];
  return <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map((item) => <div key={item.title} className="luxe-card p-5"><item.icon className="h-6 w-6 text-gold"/><div className="mt-4 text-sm font-bold text-stone-500">{item.title}</div><div className="mt-2 text-3xl font-black text-stone-900">{money(item.value)}</div></div>)}</section>;
}
