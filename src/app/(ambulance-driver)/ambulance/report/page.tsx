import Overview from "./Overview";
import StatusGraph from "./StatusGraph";
import SurvivalRateLine from "./SurvivalRateLine";

export default async function RequestsReportPage() {
  const bookingsList = await fetch(`${process.env.API_URL}/bookings/all`, {
    cache: "no-cache",
  }).then((res) => res.json());

  return (
    <main>
      <Overview bookingsList={bookingsList} />
      <StatusGraph bookingsList={bookingsList} />
      <SurvivalRateLine bookingsList={bookingsList} />
    </main>
  );
}
