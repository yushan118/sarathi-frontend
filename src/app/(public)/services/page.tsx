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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium
            elit. Donec mattis felis ut dui aliquam, eget molestie quam euismod.
            Vestibulum nisi neque, porttitor at dignissim sed, consequat
            imperdiet dui. Vestibulum tincidunt sem lobortis felis pulvinar
            porta. Morbi et metus maximus, ultrices nisi eu, maximus sapien.
            Integer cursus libero quam, eu dictum ex tincidunt et.
          </p>
        </div>
        <div className="flex flex-col items-center gap-12 md:flex-row-reverse">
          <Image src={Ambulance2} alt="Ambulance 2" width={640} height={360} />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium
            elit. Donec mattis felis ut dui aliquam, eget molestie quam euismod.
            Vestibulum nisi neque, porttitor at dignissim sed, consequat
            imperdiet dui. Vestibulum tincidunt sem lobortis felis pulvinar
            porta. Morbi et metus maximus, ultrices nisi eu, maximus sapien.
            Integer cursus libero quam, eu dictum ex tincidunt et.
          </p>
        </div>
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <Image src={Ambulance3} alt="Ambulance 3" width={640} height={360} />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            maximus malesuada sagittis. Mauris ut pellentesque orci, vel pretium
            elit. Donec mattis felis ut dui aliquam, eget molestie quam euismod.
            Vestibulum nisi neque, porttitor at dignissim sed, consequat
            imperdiet dui. Vestibulum tincidunt sem lobortis felis pulvinar
            porta. Morbi et metus maximus, ultrices nisi eu, maximus sapien.
            Integer cursus libero quam, eu dictum ex tincidunt et.
          </p>
        </div>
      </div>
    </main>
  );
}
