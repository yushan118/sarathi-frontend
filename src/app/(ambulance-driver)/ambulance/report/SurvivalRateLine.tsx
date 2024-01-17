"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function SurvivalRateLine({
  bookingsList,
}: {
  bookingsList: any;
}) {
  const statusCounts: any = {};
  bookingsList.forEach((item: any) => {
    const status = item.survival_rate;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  return (
    <div>
      <Line
        options={{
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Survival Rate Line",
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
