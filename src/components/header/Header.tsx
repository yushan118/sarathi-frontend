import MidLogoSvg from "@/../public/images/mid-logo.svg";
import Image from "next/image";
import Account from "./Account";
import Link from "next/link";
import Title from "@/components/Title";
import { twMerge } from "tailwind-merge";
import Drawer from "./Drawer";
import { drawerItems } from "./drawerItems";

function MidLogo() {
  return (
    <div className="flex flex-col items-center justify-center lg:flex-row">
      <Image src={MidLogoSvg} alt="Sarathi Mid Logo" width={40} height={40} />
      <p className="hidden text-xl font-bold text-[#F00] lg:block lg:text-6xl">
        H
      </p>
    </div>
  );
}

function TopHeader() {
  return (
    <div className="container grid grid-cols-3 items-center justify-center py-3">
      <div className="flex items-center justify-start gap-3">
        <Drawer />
        <Title className="text-2xl lg:text-4xl" />
      </div>
      <MidLogo />
      <Account />
    </div>
  );
}

function SubHeader(props: { className?: string }) {
  return (
    <div className={twMerge("w-full bg-[#DC0000]", props.className)}>
      <div className="container flex items-center justify-center gap-8 py-4 font-semibold text-white">
        {drawerItems.map((drawerItem) => (
          <Link key={drawerItem.title} href={drawerItem.href}>
            <p>{drawerItem.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function Header() {
  return (
    <header className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-lg lg:static">
      <TopHeader />
      <SubHeader className="hidden lg:block" />
    </header>
  );
}
