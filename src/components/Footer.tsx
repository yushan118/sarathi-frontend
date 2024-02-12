import { FaLocationArrow, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdFacebook } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import Link from "next/link";
import Title from "@/components/Title";

function FooterSectionHeader(props: { title: string }) {
  return (
    <p className="w-fit border-b-2 border-white font-semibold">{props.title}</p>
  );
}

function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-start gap-3 md:items-start">
      <FooterSectionHeader title="About Us" />
      <p className="text-justify text-sm">
        Welcome to Sarathi, your trusted companion in times of emergency. We are
        a dedicated ambulance booking service committed to providing swift and
        reliable assistance across Nepal. With a deep understanding of the
        urgency in medical situations, we bridge the gap between patients and
        healthcare facilities, ensuring timely transportation and care.
      </p>
    </div>
  );
}

function OurLocation() {
  return (
    <div className="flex flex-col items-center justify-start gap-3 md:items-end lg:items-center">
      <FooterSectionHeader title="Our Location" />
      <div className="flex flex-col items-start gap-1 text-sm md:items-end lg:items-start">
        <div className="flex items-center justify-center gap-2">
          <FaLocationArrow />
          <p>Sano Gaucharan-05, Kathmandu</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <MdEmail />
          <p>contact@sarathi.com</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <BiSolidPhoneCall />
          <p>+977 9876543210</p>
        </div>
      </div>
    </div>
  );
}

function ReachUs() {
  return (
    <div className="hidden flex-col items-center justify-start gap-3 md:items-end lg:flex">
      <FooterSectionHeader title="Reach Us" />
      <div className="flex flex-col items-end gap-1 text-sm">
        <Link href="#" className="hover:underline">
          Contact us
        </Link>
        <Link href="#" className="hover:underline">
          Partner with us
        </Link>
        <Link href="#" className="hover:underline">
          Locations
        </Link>
        <Link href="#" className="hover:underline">
          Work with us
        </Link>
      </div>
    </div>
  );
}

function SubFooter() {
  return (
    <div className="bg-white">
      <div className="container mx-auto grid grid-cols-1 bg-white py-1 text-sm font-semibold text-black md:grid-cols-3">
        <div />
        <p className="flex items-center justify-center">
          &copy; 2023 SARATHI. All rights reversed.
        </p>
        <div className="flex items-center justify-center gap-3 md:justify-end">
          <p>Follow us on</p>
          <div className="flex gap-2">
            <MdFacebook size={20} color="#1877F2" />
            <FaTwitter size={20} color="#1C9CEA" />
            <FaLinkedin size={20} color="#0A66C2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Footer() {
  return (
    <footer className="w-full bg-[#1E82AD] pt-10 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-x-8 gap-y-6 pb-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-2">
        <AboutUs />
        <OurLocation />
        <ReachUs />
        <Title className="col-[1_/_-1] flex justify-center md:justify-start" />
      </div>
      <SubFooter />
    </footer>
  );
}
