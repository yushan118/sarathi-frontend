import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import LiveMap from "@/../public/images-temp/live-map-2/map.png";
import LiveMapIcons from "@/../public/images-temp/live-map-2/icons.png";
import Image from "next/image";

function DetailsEntry({
  details1,
  details2,
}: {
  details1: string;
  details2: string;
}) {
  return (
    <div className="flex w-[350px] gap-4 p-3 shadow-lg">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="inline-block aspect-square w-[10px] rounded-full bg-[#1152FD]" />
        <div className="inline-block h-[30px] w-[2px] bg-gray-400" />
        <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-gray-500" />
      </div>
      <div className="grid flex-grow grid-cols-1 divide-y">
        <p className="pb-3">{details1}</p>
        <p className="pt-3">{details2}</p>
      </div>
    </div>
  );
}

export default function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="flex flex-col justify-center gap-8">
      <Link href="." className="flex w-max items-center gap-1 hover:underline">
        <IoIosArrowBack />
        Back
      </Link>

      <div className="flex flex-wrap gap-10">
        <DetailsEntry
          details1="Name: Lilly"
          details2="Contact no: 9876543210"
        />
        <DetailsEntry
          details1="Address: Boudha, Chabil"
          details2="Time: 11:11 AM (10 sec ago)"
        />
        <DetailsEntry
          details1="Status: Approved"
          details2="Sent to Ambulance Driver"
        />
      </div>

      <div className="relative mt-10 self-center">
        <Image src={LiveMap} alt="Live Map" />
        <Image
          src={LiveMapIcons}
          alt="Live Map Icons"
          className="absolute left-0 top-0"
        />
      </div>
    </main>
  );
}
