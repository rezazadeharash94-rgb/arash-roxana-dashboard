import { FinanceChart } from "@/components/FinanceChart";
import { GoalsPanel } from "@/components/GoalsPanel";
import { ChecklistPanel } from "@/components/ChecklistPanel";
import { LuxuryHero } from "@/components/LuxuryHero";
import { MonthlyMusic } from "@/components/MonthlyMusic";
import { StatsCards } from "@/components/StatsCards";
import { Timeline } from "@/components/Timeline";
import { getDashboardData } from "@/lib/data";
import { getDashboardMonthKeyByCurrentJalali } from "@/lib/persian";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const { settings, months, goals, checklist, media } = await getDashboardData();

  const startCash = Number(settings.starting_cash || 0);
  let totalIncome = 0;
  let totalInvestment = 0;
  let balance = startCash;

  const chartData = [{ name: "شروع", balance }];

  for (const month of months) {
    totalIncome += Number(month.income || 0);
    totalInvestment += Number(month.investment || 0);
    balance += Number(month.income || 0) - Number(month.expense || 0) - Number(month.investment || 0);
    chartData.push({ name: month.month_title, balance });
  }

  const currentMonthKey = getDashboardMonthKeyByCurrentJalali();
  const currentMonth = months.find((m) => m.month_key === currentMonthKey) || months[0];
  const couplePhotos = media.filter((m) => m.type === "couple_photo").slice(0, 2);

  return (
    <main className="mx-auto grid max-w-[1480px] gap-5 p-4 md:p-7">
      <LuxuryHero
        title={settings.site_title || "Arash & Roxana"}
        tagline={settings.site_tagline || "Two Souls, One Future"}
        quote={settings.hero_quote || ""}
        totalIncome={totalIncome}
        totalInvestment={totalInvestment}
        net={balance}
        couplePhotos={couplePhotos}
      />

      <StatsCards
        carGoal={Number(settings.car_goal || 0)}
        tripGoal={Number(settings.trip_goal || 0)}
        funGoal={Number(settings.fun_goal || 0)}
        investGoal={Number(settings.invest_goal || 0)}
        net={balance}
      />

      <section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div className="luxe-card p-6">
          <div className="mb-5">
            <div className="inline-flex rounded-full bg-white/65 px-4 py-2 text-xs font-black text-stone-500">Financial Flow</div>
            <h2 className="mt-3 text-2xl font-black">نمودار رشد مالی</h2>
            <p className="mt-2 text-sm font-bold text-stone-500">خوانا، فارسی، تعاملی و هماهنگ با تم لاکچری.</p>
          </div>
          <FinanceChart data={chartData} />
        </div>

        <div className="grid gap-5">
          <GoalsPanel goals={goals} />
          <MonthlyMusic month={currentMonth} />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <Timeline months={months} media={media} currentMonthKey={currentMonthKey} />
        <ChecklistPanel checklist={checklist} />
      </section>
    </main>
  );
}
