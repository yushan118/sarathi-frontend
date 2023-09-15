import Toast from "@/components/Toast";
import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import ScrollbarWidthCSSVariable from "@/components/ScrollbarWidthCSSVariable";

const public_sans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sarathi",
  description: "Your Trusted Ambulance Booking Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body
          className={`${public_sans.className} flex min-h-[100dvh] flex-col`}
        >
          {children}
          <Toast />
        </body>
      </html>

      {/* External effects */}
      <ScrollbarWidthCSSVariable />
    </>
  );
}
