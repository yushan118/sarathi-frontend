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
    <div className="flex min-h-[100dvh]">
      <AdminMenu className="sticky top-0 h-full min-h-[100dvh] shrink-0 grow-0 basis-[300px]" />

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
