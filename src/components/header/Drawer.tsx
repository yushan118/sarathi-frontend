"use client";

import { useDrawerStore } from "@/stores/drawer";
import Link from "next/link";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { GiHamburgerMenu } from "react-icons/gi";
import { drawerItems } from "./drawerItems";
import Title from "../Title";

export default function Drawer() {
  const showDrawer = useDrawerStore((state) => state.showDrawer);
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showDrawer);
    document.body.classList.toggle("pr-[--scrollbar-width]", showDrawer);
  }, [showDrawer]);

  return (
    <div className="block lg:hidden">
      {/* Hamburger icon */}
      <GiHamburgerMenu
        className="block cursor-pointer lg:hidden"
        size={24}
        onClick={() => useDrawerStore.setState(() => ({ showDrawer: true }))}
      />

      {/* Overlay when drawer is open */}
      <div
        className={twMerge(
          "pointer-events-none fixed left-0 top-0 block h-[100dvh] w-full cursor-pointer bg-black opacity-0 transition-opacity duration-500",
          showDrawer && "pointer-events-auto w-[100dvw] opacity-70",
        )}
        onClick={() => useDrawerStore.setState(() => ({ showDrawer: false }))}
      />

      {/* The actual drawer */}
      <div
        className={twMerge(
          "fixed left-0 top-0 z-50 block h-[100dvh] w-[250px] translate-x-[-250px] overflow-y-auto bg-white transition-transform duration-500",
          showDrawer && "translate-x-0",
        )}
      >
        <Title className="flex items-center justify-center py-4" />
        {drawerItems.map((drawerItem) => (
          <Link
            key={drawerItem.title}
            href={drawerItem.href}
            className="hover:text-gray-500"
          >
            <p className="py-4 pl-4">{drawerItem.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
