import AdminMetricEntry from "./AdminMetricEntry";

import { BiSolidHelpCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";

import Image from "next/image";
import MapLiveLocation from "@/../public/images-temp/map-location.png";

export default function AdminDashboardPage() {
  return (
    <main className="flex items-start justify-center gap-5">
      {/* Metrics */}
      <div className="flex flex-wrap justify-center gap-6">
        <AdminMetricEntry
          title="Number of Request"
          value={620}
          change={15}
          icon={<BiSolidHelpCircle size={40} />}
          className="w-[300px]"
        />
        <AdminMetricEntry
          title="Total Client"
          value={1400}
          change={10}
          icon={<FaUser size={40} />}
          className="w-[300px]"
        />
        <AdminMetricEntry
          title="Total Assigned / Completed"
          value={1300}
          change={-3.5}
          icon={<FaAmbulance size={40} />}
          className="w-[300px]"
        />
      </div>

      <Image src={MapLiveLocation} alt="Live location" />
    </main>
  );
}
