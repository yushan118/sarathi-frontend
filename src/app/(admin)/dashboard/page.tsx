import AdminMetricEntry from "./AdminMetricEntry";

import { BiSolidHelpCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";

import Image from "next/image";
import MapLiveLocation from "@/../public/images-temp/map-location.png";
import { cookies } from "next/headers";

export default async function AdminDashboardPage() {
  const cookieStore = cookies();

  const dashboardDataRes = await fetch(`${process.env.API_URL}/dashboard`, {
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  });
  const dashboardData = await dashboardDataRes.json();

  return (
    <main className="flex items-start justify-center gap-5">
      {/* Metrics */}
      <div className="flex flex-wrap justify-center gap-6">
        <AdminMetricEntry
          title="Number of Request"
          value={dashboardData.bookings_count}
          change={15}
          icon={<BiSolidHelpCircle size={40} />}
          href="/dashboard/requests"
          className="w-[300px]"
        />
        <AdminMetricEntry
          title="Total Client"
          value={dashboardData.users_count}
          change={10}
          icon={<FaUser size={40} />}
          href="/dashboard/users"
          className="w-[300px]"
        />
        <AdminMetricEntry
          title="Total Assigned"
          value={dashboardData.assigned_count}
          change={0}
          icon={<FaAmbulance size={40} />}
          href="/dashboard/requests"
          className="w-[300px]"
        />
        <AdminMetricEntry
          title="Total Completed"
          value={dashboardData.completed_count}
          change={0}
          icon={<FaAmbulance size={40} />}
          href="/dashboard/requests"
          className="w-[300px]"
        />
      </div>

      <Image src={MapLiveLocation} alt="Live location" />
    </main>
  );
}
