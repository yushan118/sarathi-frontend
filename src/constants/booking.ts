export const bookingStatuses: { id: number; value: string; info: string }[] = [
  {
    id: 1,
    value: "Waiting to be approved by admin",
    info: "Immediate action is required by admins",
  },
  {
    id: 2,
    value: "Approved by admin",
    info: "To be seen by ambulance",
  },
  {
    id: 3,
    value: "Accepted by ambulance",
    info: "Ambulance should be going at any moment now",
  },
  {
    id: 4,
    value: "Ambulance on the way",
    info: "Ambulance will arrive soon",
  },
  {
    id: 5,
    value: "Picked up by ambulance",
    info: "Picked up by ambulance",
  },
  {
    id: 6,
    value: "Arrived on hospital",
    info: "Job completed",
  },
];
