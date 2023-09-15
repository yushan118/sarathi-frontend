import StatusInfo from "./StatusInfo";
import StatusLiveLocation from "./StatusLiveLocation";
import StatusSteps from "./StatusSteps";

export default function AmbulanceStatusIDPage() {
  return (
    <main className="container flex flex-grow flex-col items-center justify-center gap-4 pb-8 pt-2 lg:py-8">
      <StatusInfo />
      <StatusSteps />
      <StatusLiveLocation />
    </main>
  );
}
