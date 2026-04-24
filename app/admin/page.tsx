import { AdminClient } from "@/components/AdminClient";
import { getDashboardData } from "@/lib/data";
export default async function AdminPage() { const { settings, months, goals, media } = await getDashboardData(); return <AdminClient settings={settings} months={months} goals={goals} media={media}/>; }
