import Link from "next/link";

export default function AmbulanceStatus() {
  return (
    <div className="m-auto flex max-w-[600px] flex-col items-center justify-center gap-4 rounded-3xl bg-[#E2DEDE] p-12">
      <p className="text-3xl font-extrabold">Ambulance Status</p>
      <div className="flex flex-col gap-2">
        <Link
          href="/ambulance-status/list/my"
          className="w-full rounded-2xl bg-white px-4 py-2 text-center shadow-lg transition-colors hover:bg-gray-100"
        >
          An Ambulance was called by me
        </Link>
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
