import RequestPage from "@/app/(admin)/dashboard/requests/[id]/RequestPage";

export default async function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <RequestPage id={params.id} viewer="Ambulance" />;
}
