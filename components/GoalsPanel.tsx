"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { Goal } from "@/lib/types";
import { money, percent } from "@/lib/persian";
import { useTransition } from "react";

export function GoalsPanel({ goals }: { goals: Goal[] }) {
  const [pending, startTransition] = useTransition();

  async function toggleGoal(id: string, checked: boolean) {
    startTransition(async () => {
      await fetch("/api/goals/toggle", { method: "POST", body: JSON.stringify({ id, is_done: checked }) });
      window.location.reload();
    });
  }

  return (
    <div className="luxe-card p-6">
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-2 text-xs font-black text-stone-500">
          <Sparkles className="h-4 w-4 text-[#d6a75f]" />
          Milestones
        </div>
        <h2 className="mt-3 text-2xl font-black">هدف‌های مشترک</h2>
      </div>

      <div className="grid gap-4">
        {goals.map((goal, idx) => {
          const p = goal.target_amount > 0 ? Math.min(100, (goal.current_amount / goal.target_amount) * 100) : 0;
          return (
            <motion.div
              key={goal.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={`relative overflow-hidden rounded-[1.7rem] border p-4 transition ${
                goal.is_done ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white" : "border-white/70 bg-white/65"
              }`}
            >
              {goal.is_done && <div className="absolute left-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">Done with love ✨</div>}
              <label className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" defaultChecked={goal.is_done} disabled={pending} onChange={(e) => toggleGoal(goal.id, e.target.checked)} className="hidden" />
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 shadow-inner transition ${goal.is_done ? "border-emerald-400 bg-emerald-400 text-white" : "border-[#e8d7c4] bg-white text-transparent"}`}>
                  <Check className="h-5 w-5" />
                </span>
                <span className="font-black text-stone-800">{goal.title}</span>
              </label>

              <div className="mt-4 flex items-center justify-between text-sm font-extrabold text-stone-600">
                <span>{money(goal.current_amount)} / {money(goal.target_amount)}</span>
                <span>{percent(p)}</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-stone-100">
                <motion.div initial={{ width: 0 }} animate={{ width: `${p}%` }} className="h-full rounded-full bg-gradient-to-l from-[#d6a75f] to-[#d98fa0]" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
