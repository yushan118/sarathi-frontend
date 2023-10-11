import Image from "next/image";
import PublicAvatar from "@/../public/images/public_avatar.png";

export default function DriverInfo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={PublicAvatar}
        width={80}
        className="rounded-full"
        alt="Avatar"
      />
      <div className="flex flex-col gap-1">
        <p className="text-2xl text-[#54657E]">Foo Bar</p>
        <p>Position: Driver</p>
      </div>
    </div>
  );
}