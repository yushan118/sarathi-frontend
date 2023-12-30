import Title from "@/components/Title";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Ambulance from "@/../public/images/ambulance.png";
import EmergencyCall from "@/../public/images/emergency_call.png";
import { RxDashboard } from "react-icons/rx";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaTrafficLight } from "react-icons/fa6";
import { FaAmbulance, FaUser } from "react-icons/fa";
import MenuEntry, { IMenuEntry } from "./MenuEntry";
import LogoutButton from "./LogoutButton";

const menuItems: IMenuEntry[] = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    href: "/dashboard",
  },
  {
    title: "Request Details",
    icon: <BiSolidHelpCircle size={20} />,
    href: "/dashboard/requests",
  },
  {
    title: "Traffic Status",
    icon: <FaTrafficLight size={20} />,
    href: "/dashboard/traffic",
  },
  {
    title: "Users",
    icon: <FaUser size={20} />,
    href: "/dashboard/users",
  },
  {
    title: "Ambulance Drivers",
    icon: <FaAmbulance size={20} />,
    href: "/dashboard/ambulance-drivers",
  },
];

export default function AdminMenu({ className }: { className?: string }) {
  return (
    <header
      className={twMerge(
        "flex flex-col items-center gap-6 bg-[#1E82AD] py-8",
        className,
      )}
    >
      <div className="flex flex-col items-center">
        <Title className="text-3xl lg:text-5xl" />
        <Image src={Ambulance} alt="Ambulance" width={75} />
        <div className="h-[1px] w-full bg-gray-400" />
      </div>

      {/* Menu items */}
      <div className="flex flex-grow flex-col gap-2">
        {menuItems.map((item) => (
          <MenuEntry key={item.title} entry={item} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-white p-7">
        <Image src={EmergencyCall} alt="Emergency Call" width={100} />
        <p className="text-[#263156]">Have Emergency?</p>
        <button className="rounded-full bg-[#FF8057] px-8 py-2 text-white">
          Book Now
        </button>
      </div>
      <LogoutButton />
    </header>
  );
}
