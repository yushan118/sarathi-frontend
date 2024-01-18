import Ambulance1 from "@/../public/images-temp/ambulance/ambulance-01.jpg";
import Ambulance2 from "@/../public/images-temp/ambulance/ambulance-02.webp";
import Ambulance3 from "@/../public/images-temp/ambulance/ambulance-03.jpg";
import Image from "next/image";

export default function NewsPage() {
  return (
    <main className="container lg:py-4">
      <h1 className="mb-4 text-4xl font-semibold">Our Services</h1>
      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <Image src={Ambulance1} alt="Ambulance 1" width={640} height={360} />
          <ul className="list-disc list-inside">
            <li>Boat ambulance</li>
            <li>Intensive care ambulance</li>
            <li>Air ambulance</li>
            <li>Box ambulance</li>
            <li>Nontransporting ems vehicle</li>
            <li>Helicopter</li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-12 md:flex-row-reverse">
          <Image src={Ambulance2} alt="Ambulance 2" width={640} height={360} />
          <ul className="list-disc list-inside">
            <li>Basic Life Support ambulance</li>
            <li>Patient transport</li>
            <li>Mortuary ambulances</li>
            <li>Life support</li>
            <li>Bus</li>
            <li>MVA Ambulance</li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <Image src={Ambulance3} alt="Ambulance 3" width={640} height={360} />
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
