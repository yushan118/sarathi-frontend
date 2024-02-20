// Importing necessary modules from the 'next/image' package
import Image, { StaticImageData } from "next/image";

// ContactEntry component definition
export default function ContactEntry({
  icon,       // Icon for the contact entry
  title,      // Title of the contact entry
  info,       // Main information for the contact entry
  info2,      // Additional information
  info3,      // Additional information
}: {
  icon: StaticImageData;      // Type for the icon, using StaticImageData
  title: string;              // Type for the title, a string
  info: string;               // Type for the main information, a string
  info2?: string;             // Optional type for additional information
  info3?: string;             // Optional type for additional information
}) {
  return (

    // Container with styling for the contact entry
    <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-300 p-6 shadow-2xl">

      {/* Container for the icon with styling */}
      <div className="mb-2 rounded-full border-[3px] border-[#FF0000] p-2">

        {/* Image component for displaying the icon */}
        <Image
          src={icon}      // Icon source
          width={0}       // Width set to 0, as it's controlled by the aspect ratio
          height={0}      // Height set to 0, as it's controlled by the aspect ratio
          sizes="100%"    // Size set to 100%
          alt="icon"      // Alt text for accessibility
          className="aspect-square h-[35px] w-[35px] object-fill"    // Styling for the icon
        />
      </div>

      {/* Title of the contact entry */}
      <p className="text-center text-xl font-semibold uppercase">{title}</p>

      {/* Main information for the contact entry */}
      <p className="mt-2 text-center italic">{info}</p>

      {/* Additional information if provided */}
      {info2 && <p className="text-center italic">{info2}</p>}

      {/* Additional information if provided */}
      {info3 && <p className="text-center italic">{info3}</p>}
    </div>
  );
}
