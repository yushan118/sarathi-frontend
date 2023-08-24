import Toast from "@/components/Toast";
import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

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
    <html lang="en">
      <body>
        {children}
        <Toast />
      </body>
    </html>
  );
}
