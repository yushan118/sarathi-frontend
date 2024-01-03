import StatusInfo from "./StatusInfo";
import StatusLiveLocation from "./StatusLiveLocation";
import StatusSteps from "./StatusSteps";
import StatusTimeline from "./StatusTimeline";

export default function AmbulanceStatusIDPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="container flex flex-grow flex-col items-center justify-center gap-4 pb-8 pt-2 lg:py-8">
      <StatusInfo id={params.id} />
      <StatusSteps id={params.id} />
      <StatusTimeline id={params.id} />
      <StatusLiveLocation id={params.id} />
    </main>
  );
}
