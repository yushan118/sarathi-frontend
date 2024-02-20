"use client";

// Importing necessary modules and components from Chart.js and react-chartjs-2
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

// Registering necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// SurvivalRateLine component for displaying a line chart of survival rates
export default function SurvivalRateLine({
  bookingsList,
}: {
  bookingsList: any;
}) {

  // Counting occurrences of each survival rate
  const statusCounts: any = {};
  bookingsList.forEach((item: any) => {
    const status = item.survival_rate;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

   // Rendering the line chart using the react-chartjs-2 Line component
  return (
    <div>
      <Line
        options={{

          // Chart options for plugins like legend and title
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

          // Chart data with labels and dataset for survival rates
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
