// Importing necessary modules and components
import { getAuthenticatedAmbulanceUser } from "@/serverActions/auth";
import DriverInfo from "./DriverInfo";
import DriverMenu from "./DriverMenu";
import { redirect } from "next/navigation";

// Async function for rendering the Ambulance Dashboard Layout
export default async function AmbulanceDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Retrieving the authenticated ambulance user
  const ambulanceUser = await getAuthenticatedAmbulanceUser();

  // Redirecting to the ambulance sign-in page if no authenticated user is found
  if (!ambulanceUser) {
    redirect("/signin-ambulance");
  }

  // Rendering the ambulance dashboard layout
  return (
    <div className="flex min-h-[100dvh]">
      {/* Sidebar menu for the driver */}
      <DriverMenu className="sticky top-0 h-full min-h-[100dvh] shrink-0 grow-0 basis-[300px]" />

      {/* Main content area */} 
      <div className="flex flex-grow flex-col gap-10 p-8">

        {/* Header section with driver information and status */}
        <div className="flex items-center justify-between">

          {/* Component displaying driver information */}
          <DriverInfo />

          {/* Status information */}
          <p>
            Status: Online{" "}
            {/* Colored indicator for online status */}
            <span className="ml-1 inline-block aspect-square h-[12px] rounded-full bg-[#71FF01]" />
          </p>
        </div>
        
      {/* Main content section */}
        {children}
      </div>
    </div>
  );
}
