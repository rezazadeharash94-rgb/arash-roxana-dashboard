"use client";
import { useTransition } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Goal } from "@/lib/types";
import { money, percent } from "@/lib/persian";

export function GoalsPanel({ goals }: { goals: Goal[] }) {
  const [pending, startTransition] = useTransition();
  async function toggleGoal(id: string, checked: boolean) {
    startTransition(async () => {
      await fetch("/api/goals/toggle", { method: "POST", body: JSON.stringify({ id, is_done: checked }) });
      window.location.reload();
    });
  }
  return <div className="luxe-card p-6"><div className="mb-5"><h2 className="text-2xl font-black">هدف‌ها</h2><p className="mt-2 text-sm font-medium text-stone-500">از صفحه اصلی قابل تیک زدن هستند.</p></div><div className="grid gap-4">{goals.map((goal) => { const p = goal.target_amount > 0 ? Math.min(100, (goal.current_amount / goal.target_amount) * 100) : 0; return <motion.div key={goal.id} layout className={`rounded-[1.5rem] border p-4 transition ${goal.is_done ? "border-emerald-200 bg-emerald-50/80" : "border-stone-200 bg-white/70"}`}><label className="flex cursor-pointer items-center gap-3"><input type="checkbox" defaultChecked={goal.is_done} disabled={pending} onChange={(e) => toggleGoal(goal.id, e.target.checked)} className="hidden"/><span className={`flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-inner transition ${goal.is_done ? "border-emerald-400 bg-emerald-400 text-white" : "border-stone-300 bg-white text-transparent"}`}><Check className="h-5 w-5"/></span><span className="font-black text-stone-800">{goal.title}</span></label><div className="mt-3 flex items-center justify-between text-sm font-extrabold text-stone-600"><span>{money(goal.current_amount)} / {money(goal.target_amount)}</span><span>{percent(p)}</span></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-stone-100"><motion.div initial={{ width: 0 }} animate={{ width: `${p}%` }} className="h-full rounded-full bg-gradient-to-l from-gold to-rose"/></div></motion.div>; })}</div></div>;
}
