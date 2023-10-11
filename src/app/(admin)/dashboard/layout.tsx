import { getAuthenticatedAdminUser } from "@/serverActions/auth";
import AdminInfo from "./AdminInfo";
import AdminMenu from "./AdminMenu";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminUser = await getAuthenticatedAdminUser();
  if (!adminUser) {
    redirect("/signin-admin");
  }

  return (
    <div className="flex h-[100dvh]">
      <AdminMenu className="h-full w-[350px]" />

      <div className="flex flex-grow flex-col gap-10 p-8">
        <div className="flex items-center justify-between">
          <AdminInfo />
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
