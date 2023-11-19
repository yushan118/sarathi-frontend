import RequestPage from "./RequestPage";

export default async function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <RequestPage id={params.id} viewer="Admin" />;
}
