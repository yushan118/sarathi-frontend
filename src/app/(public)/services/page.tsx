// Importing image files for ambulances using aliases (e.g., @) and relative paths
import Ambulance1 from "@/../public/images-temp/ambulance/ambulance-01.jpg";
import Ambulance2 from "@/../public/images-temp/ambulance/ambulance-02.webp";
import Ambulance3 from "@/../public/images-temp/ambulance/ambulance-03.jpg";
import Image from "next/image"; // Importing the next/image component from Next.js


// NewsPage component representing a page displaying services
export default function NewsPage() {
  return (
    
    // Main container with padding for large screens
    <main className="container lg:py-4"> 

    {/*heading for the page*/} 
      <h1 className="mb-4 text-4xl font-semibold">Our Services</h1>       

      {/* Flex container for service information */}
      <div className="flex flex-col items-start gap-8">

        {/* Flex container for ambulance image and service list */}
        <div className="flex flex-col items-center gap-12 md:flex-row">

          {/* Image component displaying the first ambulance image */}
          <Image src={Ambulance1} alt="Ambulance 1" width={640} height={360} />

          {/* Unordered list displaying different ambulance services */}
          <ul className="list-disc list-inside">
            <li>Boat ambulance</li>
            <li>Intensive care ambulance</li>
            <li>Air ambulance</li>
            <li>Box ambulance</li>
            <li>NonTransporting EMS vehicle</li>
            <li>Helicopter</li>
          </ul>
        </div>


        {/* Flex container for the second set of ambulance image and service list */}
        <div className="flex flex-col items-center gap-12 md:flex-row">

          {/* Image component displaying the second ambulance image */}
          <Image src={Ambulance2} alt="Ambulance 2" width={640} height={360} />

          {/* Unordered list displaying the second set of ambulance services */}
          <ul className="list-disc list-inside">
            <li>Basic Life Support ambulance</li>
            <li>Patient transport</li>
            <li>Mortuary ambulances</li>
            <li>Life support</li>
            <li>Bus</li>
            <li>MVA Ambulance</li>
          </ul>
        </div>

        {/* Flex container for the third set of ambulance image and service list */}
        <div className="flex flex-col items-center gap-12 md:flex-row">

          {/* Image component displaying the third ambulance image */}
          <Image src={Ambulance3} alt="Ambulance 3" width={640} height={360} />

          {/* Unordered list displaying the third set of ambulance services */}
          <ul className="list-disc list-inside">
            <li>Bariatric ambulance</li>
            <li>Neonatal ambulance</li>
            <li>Neonatology</li>
            <li>Emergency care practitioner vehicle</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
