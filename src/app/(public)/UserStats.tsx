"use client";

import { AuthContext } from "@/components/InitializeAuthStore";
import Image, { StaticImageData } from "next/image";
import { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import AmbulanceIcon from "@/../public/images/ambulance.png";
import BookedIcon from "@/../public/icons/booked.png";
import AcceptedIcon from "@/../public/icons/accepte.png";

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
      <Image src={icon} height={40} width={40} alt="Accepted Icon" />
      <div className="text-white">
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

export default function UserStats({ bookingsList }: { bookingsList: any }) {
  const userContext = useContext(AuthContext);

  const userBookings = bookingsList.filter(
    (b: any) => b.user?._id == userContext.user?.id,
  );

  if (!userContext.user) return null;

  return (
    <div className="flex gap-6">
      <Entry
        className="bg-gradient-315 from-[#47c5f4] to-[#6791d9] to-[74%]"
        value={userBookings.length}
        info="Ambulance Requested"
        icon={AmbulanceIcon}
      />
      <Entry
        className="bg-gradient-315 from-[#47c5f4] to-[#6791d9] to-[74%]"
        value={
          userBookings.filter(
            (u: any) => u.status != "Waiting to be approved by admin",
          ).length
        }
        info="Ambulance Booked"
        icon={BookedIcon}
      />
      <Entry
        className="bg-gradient-315 from-[#eb4786] to-[#b854a6]"
        value={
          userBookings.filter((u: any) => u.status == "Arrived on hospital")
            .length
        }
        info="Rides Completed"
        icon={AcceptedIcon}
      />
    </div>
  );
}
