// Importing the RequestPage component
import RequestPage from "./RequestPage";

// Next.js page component for displaying details of a booking request with the viewer set as "Admin"
export default async function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {

  // Rendering the RequestPage component with the provided ID and viewer set as "Admin"
  return <RequestPage id={params.id} viewer="Admin" />;
}
