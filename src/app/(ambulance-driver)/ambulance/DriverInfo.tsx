// Importing necessary components and functions
import Image from "next/image";
import PublicAvatar from "@/../public/images/public_avatar.png";
import { getAuthenticatedAmbulanceUser } from "@/serverActions/auth";

// Async function component to display driver information
export default async function DriverInfo() {

  // Fetching authenticated ambulance user data
  const ambulanceUser = await getAuthenticatedAmbulanceUser();

  // Rendering the component
  return (
    <div className="flex items-center gap-3">

      {/* Displaying the avatar image */}
      <Image
        src={PublicAvatar}
        width={80}
        className="rounded-full"
        alt="Avatar"
      />

      {/* Displaying user information */}
      <div className="flex flex-col gap-1">

        {/* Displaying user name */}
        <p className="text-2xl text-[#54657E]">{ambulanceUser?.name}</p>

        {/* Displaying user position */}
        <p>Position: Ambulance Driver</p>
      </div>
    </div>
  );
}
