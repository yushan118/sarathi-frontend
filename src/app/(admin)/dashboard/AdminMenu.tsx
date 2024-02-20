// Importing Title component from specified path
import Title from "@/components/Title";

// Importing twMerge function from tailwind-merge library
import { twMerge } from "tailwind-merge";

// Importing Image component from Next.js
import Image from "next/image";

// Importing images for menu items
import Ambulance from "@/../public/images/ambulance.png";
import EmergencyCall from "@/../public/images/emergency_call.png";

// Importing icons for menu items
import { RxDashboard } from "react-icons/rx";
import { BiSolidHelpCircle } from "react-icons/bi";
import { FaTrafficLight } from "react-icons/fa6";
import { FaAmbulance, FaUser } from "react-icons/fa";

// Importing MenuEntry component and IMenuEntry interface from specified path
import MenuEntry, { IMenuEntry } from "./MenuEntry";

// Importing LogoutButton component from specified path
import LogoutButton from "./LogoutButton";

// Array of menu items with title, icon, and href
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

// Component for rendering the admin menu
export default function AdminMenu({ className }: { className?: string }) {
  return (
    <header
      className={twMerge(
        "flex flex-col items-center gap-6 bg-[#1E82AD] py-8",
        className,
      )}
    >

      {/* Logo and separator */}
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
      
      {/* Logout button */}
      <LogoutButton />
    </header>
  );
}
