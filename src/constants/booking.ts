export const bookingStatuses: { value: string; info: string }[] = [
  {
    value: "Waiting to be approved by admin",
    info: "Immediate action is required by admins",
  },
  {
    value: "Approved by admin",
    info: "To be seen by ambulance",
  },
  {
    value: "Accepted by ambulance",
    info: "Ambulance should be going at any moment now",
  },
  {
    value: "Ambulance on the way",
    info: "Ambulance will arrive soon",
  },
  {
    value: "Picked up by ambulance",
    info: "Picked up by ambulance",
  },
  {
    value: "Arrived on hospital",
    info: "Job completed",
  },
];
