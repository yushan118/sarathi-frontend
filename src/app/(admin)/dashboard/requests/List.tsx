// Importing the RequestEntry component and IRequestEntry interface
import RequestEntry, { IRequestEntry } from "./RequestEntry";

// Async function representing the List component
export default async function List({
  requests,
}: {
  requests: IRequestEntry[];
}) {

  // Rendering the RequestEntry component with the provided list of requests
  return <RequestEntry entries={requests} subHref="requests" />;
}
