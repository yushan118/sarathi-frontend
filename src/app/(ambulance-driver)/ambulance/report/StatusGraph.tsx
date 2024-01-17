"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function StatusGraph({ bookingsList }: { bookingsList: any }) {
  const statusCounts: any = {};
  bookingsList.forEach((item: any) => {
    const status = item.status;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  return (
    <div className="mb-8">
      <Bar
        options={{
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Booking Status Chart",
            },
          },
        }}
        data={{
          labels: Object.keys(statusCounts),
          datasets: [
            {
              label: "Current dataset",
              data: Object.values(statusCounts),
              backgroundColor: "#1E82AD",
            },
          ],
        }}
      />
    </div>
  );
}
