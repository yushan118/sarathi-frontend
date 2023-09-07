import ContactEntry from "./ContactEntry";
import Marker from "@/../public/images/marker.png";
import Mail from "@/../public/images/mail.png";
import MarkerCall from "@/../public/images/marker-call.png";
import Map from "@/../public/images-temp/map.png";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export default function ContactUsPage() {
  return (
    <main className="container pb-8 pt-2 lg:py-8">
      <h1 className="mb-8 text-center text-4xl font-semibold">Contact Us</h1>
      <div className="mb-8 flex flex-col gap-8 md:flex-row">
        <Image src={Map} alt="Map" className="object-cover" />
        <div className="flex flex-wrap justify-center gap-8">
          <ContactEntry
            icon={Marker}
            title="Head Quarters"
            info="Head Office: Bagbazar - 28, Kathmandu, Nepal"
          />
          <ContactEntry
            icon={Mail}
            title="Mail Us"
            info="info@sarathi.com.np"
            info2="sarathimail@gmail.com"
          />
          <ContactEntry
            icon={MarkerCall}
            title="Contact Us"
            info="Mobile: +977-9841346545"
            info2="Mobile (Asst.): +977-9860568570"
            info3="Hotline: +977-1-5354490"
          />
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <Link href="#">
          <MdFacebook size={30} color="#1877F2" />
        </Link>
        <Link href="#">
          <FaTwitter size={30} color="#1C9CEA" />
        </Link>
        <Link href="#">
          <FaLinkedin size={30} color="#0A66C2" />
        </Link>
      </div>
    </main>
  );
}
