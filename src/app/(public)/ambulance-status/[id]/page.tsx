// Importing necessary components from specified files
import { RiskInvolved } from "./RiskInvolved";
import StatusInfo from "./StatusInfo";
import StatusLiveLocation from "./StatusLiveLocation";
import StatusSteps from "./StatusSteps";
import StatusTimeline from "./StatusTimeline";
import UpdateSocket from "./UpdateSocket";


// AmbulanceStatusIDPage component definition
export default function AmbulanceStatusIDPage({
  params,
}: {
  params: { id: string };
}) {
  return (

    // Main container with flex layout, centered items, and padding
    <main className="container flex flex-grow flex-col items-center justify-center gap-4 pb-8 pt-2 lg:py-8">

      {/* Rendering the StatusInfo component with the 'id' parameter */}
      <StatusInfo id={params.id} />

      {/* Rendering the StatusSteps component with the 'id' parameter */}
      <StatusSteps id={params.id} />

       {/* Rendering the RiskInvolved component with the 'id' parameter */}
      <RiskInvolved id={params.id} />

      {/* Rendering the StatusTimeline component with the 'id' parameter */}
      <StatusTimeline id={params.id} />

       {/* Rendering the StatusLiveLocation component with the 'id' parameter */}
      <StatusLiveLocation id={params.id} />

    {/* Rendering the UpdateSocket component with the 'id' parameter */}
      <UpdateSocket id={params.id} />
    </main>
  );
}
