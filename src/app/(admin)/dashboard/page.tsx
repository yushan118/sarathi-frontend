// Importing the AdminMetricEntry component for displaying dashboard metrics
import AdminMetricEntry from "./AdminMetricEntry";

// Importing icons for metrics from React Icons
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";

// Importing the 'cookies' object from the 'next/headers' module
import { cookies } from "next/headers";

// Importing the TrafficPage component
import TrafficPage from "@/app/(public)/traffic/page";

// Async function to fetch and display data on the admin dashboard
export default async function AdminDashboardPage() {

  // Accessing cookies using 'cookies' object
  const cookieStore = cookies();


  // Fetching dashboard data from the API
  const dashboardDataRes = await fetch(`${process.env.API_URL}/dashboard`, {
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  });

  // Parsing the JSON response containing dashboard data
  const dashboardData = await dashboardDataRes.json();

  // Rendering the main content of the admin dashboard page
  return (
    <main className="flex items-start justify-center gap-5">
      {/* Metrics */}
      <div className="flex flex-wrap justify-center gap-6">

        {/* Displaying the number of requests metric */}
        <AdminMetricEntry
          title="Number of Request"
          value={dashboardData.bookings_count}
          change={15}
          icon={<BiSolidHelpCircle size={40} />}
          href="/dashboard/requests"
          className="w-[300px]"
        />

        {/* Displaying the total client metric */}
        <AdminMetricEntry
          title="Total Client"
          value={dashboardData.users_count}
          change={10}
          icon={<FaUser size={40} />}
          href="/dashboard/users"
          className="w-[300px]"
        />

        {/* Displaying the total assigned metric */}
        <AdminMetricEntry
          title="Total Assigned"
          value={dashboardData.assigned_count}
          change={0}
          icon={<FaAmbulance size={40} />}
          href="/dashboard/requests"
          className="w-[300px]"
        />

        {/* Displaying the total completed metric */}
        <AdminMetricEntry
          title="Total Completed"
          value={dashboardData.completed_count}
          change={0}
          icon={<FaAmbulance size={40} />}
          href="/dashboard/requests"
          className="w-[300px]"
        />
      </div>

      {/* Displaying the TrafficPage component */}
      <TrafficPage />
    </main>
  );
}
