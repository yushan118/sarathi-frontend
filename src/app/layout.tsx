import Toast from "@/components/Toast";
import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import ScrollbarWidthCSSVariable from "@/components/ScrollbarWidthCSSVariable";
import InitializeAuthenticatedUser from "@/components/InitializeAuthStore";
import InitializeAuthenticatedAdminUser from "@/components/InitializeAdminAuthStore";
import {
  getAuthenticatedUser,
  getAuthenticatedAdminUser,
} from "@/serverActions/auth";
import CookieProviderWrapper from "@/components/CookieProviderWrapper";

const public_sans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sarathi",
  description: "Your Trusted Ambulance Booking Service",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();
  const adminUser = await getAuthenticatedAdminUser();

  return (
    <>
      <html lang="en">
        <CookieProviderWrapper>
          <InitializeAuthenticatedUser user={user}>
            <InitializeAuthenticatedAdminUser adminUser={adminUser}>
              <body
                className={`${public_sans.className} flex min-h-[100dvh] flex-col`}
              >
                {children}
                <Toast />
              </body>
            </InitializeAuthenticatedAdminUser>
          </InitializeAuthenticatedUser>
        </CookieProviderWrapper>
      </html>

      {/* External effects */}
      <ScrollbarWidthCSSVariable />
    </>
  );
}
