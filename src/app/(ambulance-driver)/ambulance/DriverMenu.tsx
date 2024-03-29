"use client";

// Importing necessary components and libraries
import Title from "@/components/Title";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Ambulance from "@/../public/images/ambulance.png";
import EmergencyCall from "@/../public/images/emergency_call.png";
import { BiSolidHelpCircle } from "react-icons/bi";
import { TbFileReport } from "react-icons/tb";
import MenuEntry, { IMenuEntry } from "./MenuEntry";
import { logout } from "@/serverActions/auth";
import { AmbulanceAuthContext } from "@/components/InitializeAmbulanceAuthStore";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


// Array of menu items with their details
const menuItems: IMenuEntry[] = [
  {
    title: "Request Details",
    icon: <BiSolidHelpCircle size={20} />,
    href: "/ambulance",
  },
  {
    title: "Requests Report",
    icon: <TbFileReport size={20} />,
    href: "/ambulance/report",
  },
];

// Functional component for the Driver Menu
export default function DriverMenu({ className }: { className?: string }) {

  // Accessing the context and router
  const ambulanceDriverContext = useContext(AmbulanceAuthContext);
  const router = useRouter();

  // Rendering the component
  return (
    <header
      className={twMerge(
        "flex flex-col items-center gap-6 bg-[#1E82AD] py-8",
        className,
      )}
    >
      {/* Logo and title section */}
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
      <button
        className="rounded-full bg-[#FF5757] px-8 py-2 text-xl font-bold text-white"
        onClick={async () => {
          toast("Logged out successfully", {
            type: "success",
            position: "bottom-right",
          });
          await logout();
          await ambulanceDriverContext.update();
          router.replace("/signin-ambulance");
        }}
      >
        Log Out
      </button>
    </header>
  );
}
