import { getAuthenticatedAmbulanceUser } from "@/serverActions/auth";
import DriverInfo from "./DriverInfo";
import DriverMenu from "./DriverMenu";
import { redirect } from "next/navigation";

export default async function AmbulanceDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ambulanceUser = await getAuthenticatedAmbulanceUser();
  if (!ambulanceUser) {
    redirect("/signin-ambulance");
  }

  return (
    <div className="flex min-h-[100dvh]">
      <DriverMenu className="sticky top-0 h-full min-h-[100dvh] shrink-0 grow-0 basis-[300px]" />

      <div className="flex flex-grow flex-col gap-10 p-8">
        <div className="flex items-center justify-between">
          <DriverInfo />
          <p>
            Status: Online{" "}
            <span className="ml-1 inline-block aspect-square h-[12px] rounded-full bg-[#71FF01]" />
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
