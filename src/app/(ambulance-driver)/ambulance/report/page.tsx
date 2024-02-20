// Importing necessary modules and components
import Overview from "./Overview";
import StatusGraph from "./StatusGraph";
import SurvivalRateLine from "./SurvivalRateLine";

// Exporting an asynchronous function RequestsReportPage
export default async function RequestsReportPage() {

  // Fetching bookings data from the API endpoint
  const bookingsList = await fetch(`${process.env.API_URL}/bookings/all`, {
    cache: "no-cache",
  }).then((res) => res.json());

   // Rendering the main content of the page with Overview, StatusGraph, and SurvivalRateLine components
  return (
    <main>

      {/* Displaying an overview of booking-related information */}
      <Overview bookingsList={bookingsList} />

      {/* Displaying a graph depicting the status of bookings */}
      <StatusGraph bookingsList={bookingsList} />

      {/* Displaying a line chart representing the survival rate of bookings */}
      <SurvivalRateLine bookingsList={bookingsList} />
    </main>
  );
}
