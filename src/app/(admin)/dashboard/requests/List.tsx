import RequestEntry, { IRequestEntry } from "./RequestEntry";

export default async function List({
  requests,
}: {
  requests: IRequestEntry[];
}) {
  return <RequestEntry entries={requests} subHref="requests" />;
}
