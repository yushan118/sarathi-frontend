import Image from "next/image";
import PublicAvatar from "@/../public/images/public_avatar.png";
import { getAuthenticatedAdminUser } from "@/serverActions/auth";
import { redirect } from "next/navigation";

export default async function AdminInfo() {
  const adminUser = await getAuthenticatedAdminUser();
  if (!adminUser) {
    redirect("/signin-admin");
  }

  return (
    <div className="flex items-center gap-3">
      <Image
        src={PublicAvatar}
        width={80}
        className="rounded-full"
        alt="Avatar"
      />
      <div className="flex flex-col gap-1">
        <p className="text-2xl text-[#54657E]">{adminUser.name}</p>
        <p>Position: Admin</p>
      </div>
    </div>
  );
}
