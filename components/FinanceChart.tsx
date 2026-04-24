"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { money, toPersianDigits } from "@/lib/persian";

export function FinanceChart({ data }: { data: { name: string; balance: number }[] }) {
  return (
    <div className="h-[430px] rounded-[2rem] border border-white/70 bg-gradient-to-br from-white/90 to-rose/10 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 28, right: 20, left: 30, bottom: 32 }}>
          <defs>
            <linearGradient id="luxuryLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#d9b070"/><stop offset="100%" stopColor="#d99aa4"/></linearGradient>
            <linearGradient id="luxuryFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d9b070" stopOpacity={0.42}/><stop offset="100%" stopColor="#d99aa4" stopOpacity={0.02}/></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 8" stroke="rgba(120,90,60,.16)" />
          <XAxis dataKey="name" tick={{ fill: "#7b6b5e", fontSize: 12, fontWeight: 700 }} tickFormatter={toPersianDigits} />
          <YAxis width={92} tick={{ fill: "#7b6b5e", fontSize: 12, fontWeight: 800 }} tickFormatter={(v) => money(Number(v))} />
          <Tooltip formatter={(value) => [money(Number(value)), "مانده"]} labelFormatter={(label) => toPersianDigits(String(label))} contentStyle={{ direction: "rtl", borderRadius: 18, border: "1px solid rgba(120,90,60,.18)", boxShadow: "0 18px 48px rgba(80,60,40,.12)", fontFamily: "Vazirmatn" }} />
          <Area type="monotone" dataKey="balance" stroke="url(#luxuryLine)" fill="url(#luxuryFill)" strokeWidth={5} dot={{ r: 5, fill: "#fff", stroke: "#d9b070", strokeWidth: 3 }} activeDot={{ r: 8, fill: "#d99aa4", stroke: "#fff", strokeWidth: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
