

import RequestEntry, { IRequestEntry } from "./RequestEntry";

export default async function List({
  requests,
}: {
  requests: IRequestEntry[];
}) {
  return (
    <ul className="list-disc">
      {requests.map((request) => (
        <RequestEntry key={request.id} entry={request} subHref="requests" />
      ))}
    </ul>
  );
}
