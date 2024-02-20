// Importing necessary modules and components
import Image, { StaticImageData } from "next/image";
import AcceptIcon from "@/../public/icons/accept.png";
import AcceptedIcon from "@/../public/icons/accepte.png";
import SurvivalIcon from "@/../public/icons/survival.png";
import AmbulanceIcon from "@/../public/images/ambulance.png";
import { twMerge } from "tailwind-merge";

// Array defining different booking statuses
const bookingStatus = [
  "Waiting to be approved by admin",
  "Approved by admin",
  "Accepted by ambulance",
  "Ambulance on the way",
  "Picked up by ambulance",
  "Arrived on hospital",
];

// Entry component for displaying booking-related information
function Entry({
  className,
  value,
  info,
  icon,
}: {
  className?: string;
  value: number;
  info: string;
  icon: StaticImageData;
}) {
  return (
    <div
      className={twMerge(
        "relative flex h-[120px] flex-1 items-start gap-4 rounded-lg p-4 transition-transform hover:-translate-y-2",
        className,
      )}
    >
      {/* Displaying the icon image */}
      <Image src={icon} height={40} width={40} alt="Accepted Icon" />
      <div className="text-white">

        {/* Displaying the value, information, and a decorative SVG background */}
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm font-semibold uppercase">{info}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 left-0 w-full"
        >
          <path
            fill="rgba(255,255,255,0.3)"
            fill-opacity="1"
            d="M0,192L30,208C60,224,120,256,180,245.3C240,235,300,181,360,144C420,107,480,85,540,96C600,107,660,149,720,154.7C780,160,840,128,900,117.3C960,107,1020,117,1080,112C1140,107,1200,85,1260,74.7C1320,64,1380,64,1410,64L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

// Overview component for displaying different entries related to booking status
export default function Overview({ bookingsList }: { bookingsList: any }) {
  return (
    <div className="mb-8 flex gap-6">

      {/* Entry for displaying rides accepted */}
      <Entry
        className="bg-gradient-315 from-[#47c5f4] to-[#6791d9] to-[74%]"
        value={bookingsList.reduce(
          (acc: number, c: any) =>
            bookingStatus.indexOf(c.status) >= 1 ? acc + 1 : acc,
          0,
        )}
        info="Rides accepted"
        icon={AcceptIcon}
      />

      {/* Entry for displaying rides completed */}
      <Entry
        className="bg-gradient-315 from-[#eb4786] to-[#b854a6]"
        value={bookingsList.reduce(
          (acc: number, c: any) =>
            bookingStatus.indexOf(c.status) == 5 ? acc + 1 : acc,
          0,
        )}
        info="Rides completed"
        icon={AcceptedIcon}
      />

      {/* Entry for displaying total survival */}
      <Entry
        className="bg-gradient-315 from-[#875fc0] to-[#5346ba]"
        value={bookingsList.reduce(
          (acc: number, c: any) =>
            bookingStatus.indexOf(c.status) == 5 ? acc + 1 : acc,
          0,
        )}
        info="Total survival"
        icon={SurvivalIcon}
      />

      {/* Entry for displaying total rides */}
      <Entry
        className="bg-gradient-315 from-[#3358cb] to-[#1197e6]"
        value={bookingStatus.length}
        info="Total rides"
        icon={AmbulanceIcon}
      />
    </div>
  );
}
