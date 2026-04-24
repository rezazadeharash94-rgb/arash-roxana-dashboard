"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { money, toPersianDigits } from "@/lib/persian";

type Point = { name: string; balance: number };

export function FinanceChart({ data }: { data: Point[] }) {
  return (
    <div className="h-[440px] rounded-[2rem] border border-white/70 bg-gradient-to-br from-white/90 via-[#fff7ef] to-[#f6d9df]/55 p-4 shadow-inner">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 28, right: 20, left: 36, bottom: 34 }}>
          <defs>
            <linearGradient id="luxuryLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d6a75f" />
              <stop offset="55%" stopColor="#e8c98f" />
              <stop offset="100%" stopColor="#d98fa0" />
            </linearGradient>
            <linearGradient id="luxuryFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6a75f" stopOpacity={0.42} />
              <stop offset="60%" stopColor="#d98fa0" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#d98fa0" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 8" stroke="rgba(120,90,60,.16)" />
          <XAxis dataKey="name" tick={{ fill: "#7b6b5e", fontSize: 12, fontWeight: 800 }} tickFormatter={toPersianDigits} />
          <YAxis width={100} tick={{ fill: "#7b6b5e", fontSize: 12, fontWeight: 900 }} tickFormatter={(v) => money(Number(v))} />
          <Tooltip
            formatter={(value) => [money(Number(value)), "مانده"]}
            labelFormatter={(label) => toPersianDigits(label)}
            contentStyle={{
              direction: "rtl",
              borderRadius: 22,
              border: "1px solid rgba(120,90,60,.16)",
              boxShadow: "0 22px 56px rgba(80,60,40,.14)",
              fontFamily: "Vazirmatn",
              background: "rgba(255,255,255,.92)",
            }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="url(#luxuryLine)"
            fill="url(#luxuryFill)"
            strokeWidth={6}
            dot={{ r: 5, fill: "#fff", stroke: "#d6a75f", strokeWidth: 3 }}
            activeDot={{ r: 9, fill: "#d98fa0", stroke: "#fff", strokeWidth: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
