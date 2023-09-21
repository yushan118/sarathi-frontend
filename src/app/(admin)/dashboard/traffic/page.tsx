import Ambulance from "@/../public/images/ambulance.png";
import LiveMap from "@/../public/images-temp/live-map-3/map.png";
import LiveMapIcons from "@/../public/images-temp/live-map-3/icons.png";
import Image from "next/image";

export default function TrafficStatusPage() {
  return (
    <main className="flex flex-col justify-center gap-5">
      <div className="self-end">
        <div className="flex items-center justify-center gap-3">
          <Image src={Ambulance} alt="Ambulance" width={50} />
          <p>Ambulance Driver</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="bg-[#FF0000] p-1 font-bold text-white">HT</div>
          <div className="bg-[#1FE70D] p-1 font-bold text-white">ST</div>
          <div className="bg-[#F9FD0B] p-1 font-bold text-gray-400">MT</div>
        </div>
      </div>

      <h1 className="text-center text-2xl font-bold">Traffic Information</h1>
      <div className="relative self-center">
        <Image src={LiveMap} alt="Live Map" />
        <Image
          src={LiveMapIcons}
          alt="Live Map Icons"
          className="absolute left-0 top-12"
        />
      </div>
    </main>
  );
}
