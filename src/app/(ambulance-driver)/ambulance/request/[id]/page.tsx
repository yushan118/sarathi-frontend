// Importing the RequestPage component for the RequestDetailsPage
import RequestPage from "@/app/(admin)/dashboard/requests/[id]/RequestPage";

// Exporting an asynchronous function RequestDetailsPage that takes params as an argument
export default async function RequestDetailsPage({
  params,     // Destructuring params from the argument
}: {
  params: { id: string };   // Specifying the type of the params object with an id property of type string
}) {

   // Returning the RequestPage component with the id from the params and viewer set to "Ambulance"
  return <RequestPage id={params.id} viewer="Ambulance" />;
}
