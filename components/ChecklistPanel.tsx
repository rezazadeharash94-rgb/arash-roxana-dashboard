"use client";
import { useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import type { ChecklistItem } from "@/lib/types";
export function ChecklistPanel({ checklist }: { checklist: ChecklistItem[] }) {
  const [pending, startTransition] = useTransition();
  async function toggle(id: string, checked: boolean) { startTransition(async () => { await fetch("/api/checklist/toggle", { method: "POST", body: JSON.stringify({ id, is_done: checked }) }); window.location.reload(); }); }
  return <div className="luxe-card p-6"><div className="mb-5"><h2 className="text-2xl font-black">چک‌لیست مسیر</h2><p className="mt-2 text-sm font-medium text-stone-500">برای کنترل مسیر زندگی و سرمایه‌گذاری.</p></div><div className="grid gap-3">{checklist.map((item) => <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-[1.4rem] border p-4 transition ${item.is_done ? "border-emerald-200 bg-emerald-50" : "border-stone-200 bg-white/70"}`}><input type="checkbox" disabled={pending} defaultChecked={item.is_done} onChange={(e) => toggle(item.id, e.target.checked)} className="hidden"/><span className={`${item.is_done ? "text-emerald-500" : "text-stone-300"}`}><CheckCircle2 className="h-7 w-7"/></span><span className="font-extrabold text-stone-700">{item.title}</span></label>)}</div></div>;
}
