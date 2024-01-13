import RequestEntry, { IRequestEntry } from "./RequestEntry";

export default async function List({
  requests,
}: {
  requests: IRequestEntry[];
}) {
  return (
    <ul className="list-disc">
      <RequestEntry entries={requests} />
    </ul>
  );
}
