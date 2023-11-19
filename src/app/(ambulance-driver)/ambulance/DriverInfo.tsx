import Image from "next/image";
import PublicAvatar from "@/../public/images/public_avatar.png";
import { getAuthenticatedAmbulanceUser } from "@/serverActions/auth";

export default async function DriverInfo() {
  const ambulanceUser = await getAuthenticatedAmbulanceUser();

  return (
    <div className="flex items-center gap-3">
      <Image
        src={PublicAvatar}
        width={80}
        className="rounded-full"
        alt="Avatar"
      />
      <div className="flex flex-col gap-1">
        <p className="text-2xl text-[#54657E]">{ambulanceUser?.name}</p>
        <p>Position: Ambulance Driver</p>
      </div>
    </div>
  );
}
