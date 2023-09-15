import MapLiveLocation from "@/../public/images-temp/map-location.png";
import Image from "next/image";

export default function StatusLiveLocation() {
  return (
    <div>
      <p className="text-center">Live ambulance location:</p>
      <Image src={MapLiveLocation} alt="Live location" />
    </div>
  );
}
