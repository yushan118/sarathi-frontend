import Image from "next/image";
import PublicAvatar from "@/../public/images/public_avatar.png";

export default function AdminInfo() {
  return (
    <div className="flex gap-3 items-center">
      <Image src={PublicAvatar} width={80} className="rounded-full" alt="Avatar" />
      <div className="flex flex-col gap-1">
        <p className="text-2xl text-[#54657E]">Anna Parker</p>
        <p>Position: Admin</p>
      </div>
    </div>
  );
}
