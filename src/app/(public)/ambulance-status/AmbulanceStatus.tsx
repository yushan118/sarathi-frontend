// Importing Link from the 'next/link' package
import Link from "next/link";

// AmbulanceStatus component definition
export default function AmbulanceStatus() {
  return (

    // Container with styling for the AmbulanceStatus component
    <div className="m-auto flex max-w-[600px] flex-col items-center justify-center gap-4 rounded-3xl bg-[#E2DEDE] p-12">

      {/* Title for Ambulance Status */}
      <p className="text-3xl font-extrabold">Ambulance Status</p>

      {/* Container for links with a vertical layout */}
      <div className="flex flex-col gap-2">

        {/* Link to the page for Ambulance status called by the user */}
        <Link
          href="/ambulance-status/list/my"
          className="w-full rounded-2xl bg-white px-4 py-2 text-center shadow-lg transition-colors hover:bg-gray-100"
        >
          An Ambulance was called by me
        </Link>

        {/* Link to the page for Ambulance status called by others */}
        <Link
          href="/ambulance-status/list"
          className="w-full rounded-2xl bg-white px-4 py-2 text-center shadow-lg transition-colors hover:bg-gray-100"
        >
          An Ambulance was called by others
        </Link>
      </div>
    </div>
  );
}
