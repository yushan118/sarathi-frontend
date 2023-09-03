import { IoMdCall } from "react-icons/io";
import { GrStatusInfo } from "react-icons/gr";

export default async function Actions() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex w-max flex-col items-center justify-center">
        <h1 className="text-2xl font-thin">Actions</h1>
        <div className="block h-[6px] w-[90%] bg-[#FF5C00D4] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-8">
        <button className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-300 p-8 transition-colors hover:border-gray-500 sm:w-[250px]">
          <IoMdCall size={40} color="red" />
          Call an Ambulance
        </button>
        <button className="flex flex-col items-center justify-center gap-2 rounded-md border border-gray-300 p-8 transition-colors hover:border-gray-500 sm:w-[250px]">
          <GrStatusInfo size={40} color="blue" />
          Track status of previously called Ambulance
        </button>
      </div>
    </div>
  );
}
