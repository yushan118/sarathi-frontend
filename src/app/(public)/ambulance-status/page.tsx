// Importing the AmbulanceStatus component from the specified file
import AmbulanceStatus from "./AmbulanceStatus";

// AmbulanceStatusPage component definition
export default function AmbulanceStatusPage() {
  return (

    // Main container with flex layout, centered items, and padding
    <main className="container flex flex-grow items-center justify-center pb-8 pt-2 lg:py-8">

      {/* Rendering the AmbulanceStatus component */}
      <AmbulanceStatus />
    </main>
  );
}
