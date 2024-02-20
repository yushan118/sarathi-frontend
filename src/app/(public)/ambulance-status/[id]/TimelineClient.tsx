// Using the "server" pragma to indicate that this is a server-side module
"use client";   

// Importing necessary modules and components
import { Timeline } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";

// Functional component for rendering a timeline with entries
export default function TimelineClient({ entries }: { entries: string[] }) {
  return (

    // Using the Timeline component from the rsuite library
    <Timeline>

       {/* Mapping through the entries array to render Timeline.Item for each entry */}
      {entries.map((entry) => (
        <Timeline.Item key={entry}>{entry}</Timeline.Item>
      ))}
    </Timeline>
  );
}
