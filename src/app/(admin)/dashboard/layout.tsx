import AdminInfo from "./AdminInfo";
import AdminMenu from "./AdminMenu";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
