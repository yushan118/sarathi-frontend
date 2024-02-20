// Importing necessary constants and modules
import { bookingStatuses } from "@/constants/booking";
import { cookies } from "next/headers";

// Functional component for each step entry in the status
function StepEntry({ info, checked }: { info: string; checked?: boolean }) {
  return (
    <div className="flex items-center gap-2">

      {/* Displaying a checkbox if 'checked' prop is true */}
      <div className="flex h-[26px] w-[26px] items-center justify-center bg-white">
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
          >
            <path
              d="M7.38357 15.6054L0.318349 8.66794C-0.106116 8.25115 -0.106116 7.57537 0.318349 7.15854L1.8555 5.64913C2.27997 5.2323 2.96823 5.2323 3.39269 5.64913L8.15216 10.3225L18.3464 0.312594C18.7709 -0.104198 19.4591 -0.104198 19.8836 0.312594L21.4208 1.822C21.8452 2.23879 21.8452 2.91457 21.4208 3.33141L8.92076 15.6055C8.49625 16.0223 7.80803 16.0223 7.38357 15.6054Z"
              fill="black"
            />
          </svg>
        )}
      </div>

      {/* Displaying the information */}
      <p>{info}</p>
    </div>
  );
}

// Main component for displaying status steps
export default async function StatusSteps({ id }: { id: string }) {

  // Getting cookies from next/headers
  const cookieStore = cookies();

  // Fetching booking details from the API
  const requestDetails = await fetch(`${process.env.API_URL}/bookings/${id}`, {
    cache: "no-cache",
    next: {
      tags: ["request-details"],
    },
    headers: {
      Authorization: cookieStore.get("AUTH_ADMIN_TOKEN")?.value || "",
    },
  }).then((res) => res.json());

  // Finding the index of the current booking status
  const currentBookingStatusIdx = bookingStatuses.findIndex(
    (s) => s.value == requestDetails.status,
  );

  // Displaying status steps
  return (
    <div className="flex flex-col gap-2 bg-[#DFDBDB] p-4">
      {bookingStatuses.map((s, idx) => (

        // Rendering StepEntry component for each status
        <StepEntry
          key={s.id}
          info={s.value}
          checked={idx <= currentBookingStatusIdx}
        />
      ))}
    </div>
  );
}
