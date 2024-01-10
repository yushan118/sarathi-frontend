"use client";

import { Timeline } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

export default function TimelineClient({ entries }: { entries: string[] }) {
  return (
    <Timeline>
      {entries.map((entry) => (
        <Timeline.Item key={entry}>{entry}</Timeline.Item>
      ))}
    </Timeline>
  );
}
