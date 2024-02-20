"use client";

// Importing necessary modules and components from Chart.js and react-chartjs-2
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

// Registering necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// StatusGraph component for displaying a bar chart of booking statuses
export default function StatusGraph({ bookingsList }: { bookingsList: any }) {

   // Counting occurrences of each booking status
  const statusCounts: any = {};
  bookingsList.forEach((item: any) => {
    const status = item.status;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

   // Rendering the bar chart using the react-chartjs-2 Bar component
  return (
    <div className="mb-8">
      <Bar
        options={{

          // Chart options for plugins like legend and title
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

          // Chart data with labels and dataset for booking statuses
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
