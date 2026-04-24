"use client";

import { CheckCircle2, ListChecks } from "lucide-react";
import type { ChecklistItem } from "@/lib/types";
import { useTransition } from "react";

export function ChecklistPanel({ checklist }: { checklist: ChecklistItem[] }) {
  const [pending, startTransition] = useTransition();

  async function toggle(id: string, checked: boolean) {
    startTransition(async () => {
      await fetch("/api/checklist/toggle", { method: "POST", body: JSON.stringify({ id, is_done: checked }) });
      window.location.reload();
    });
  }

  return (
    <div className="luxe-card p-6">
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-2 text-xs font-black text-stone-500">
          <ListChecks className="h-4 w-4 text-[#d6a75f]" />
          To‑Do
        </div>
        <h2 className="mt-3 text-2xl font-black">چک‌لیست مسیر</h2>
      </div>

      <div className="grid gap-3">
        {checklist.map((item) => (
          <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-[1.5rem] border p-4 transition hover:-translate-y-0.5 ${item.is_done ? "border-emerald-200 bg-emerald-50/80" : "border-white/70 bg-white/65"}`}>
            <input type="checkbox" disabled={pending} defaultChecked={item.is_done} onChange={(e) => toggle(item.id, e.target.checked)} className="hidden" />
            <span className={`${item.is_done ? "text-emerald-500" : "text-stone-300"}`}>
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <span className="font-black text-stone-700">{item.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
