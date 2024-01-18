import Ambulance1 from "@/../public/images-temp/ambulance/ambulance-01.jpg";
import Image from "next/image";

export default function NewsPage() {
  return (
    <main className="container lg:py-4">
      <h1 className="mb-4 text-4xl font-semibold">Helplines</h1>
      <div className="flex flex-col items-center gap-8">
        <Image src={Ambulance1} alt="Ambulance 1" width={640} height={360} />
        <table>
          <thead className="bg-[#DDDDDD] font-semibold">
            <tr>
              <td>Name</td>
              <td>Telephone Numbers</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Police Control</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Police Emergency Number</td>
              <td>4228435/4226853</td>
            </tr>
            <tr>
              <td>Metropolitan Police Range (Kathmandu)</td>
              <td>4261945/4261790</td>
            </tr>
            <tr>
              <td>Metropolitan Police Range (Lalitpur)</td>
              <td>5521207</td>
            </tr>
            <tr>
              <td>Metropolitan Police Range (Bhaktapur)</td>
              <td>6614821</td>
            </tr>
            <tr>
              <td>Paropakar Ambulance Service</td>
              <td>4260859</td>
            </tr>
            <tr>
              <td>Lalitpur Redcross Ambulance Service</td>
              <td>5545666</td>
            </tr>
            <tr>
              <td>Bishal Bazar Ambulance Service</td>
              <td>4244121</td>
            </tr>
            <tr>
              <td>Redcross Ambulance Service</td>
              <td>4228094</td>
            </tr>
            <tr>
              <td>Agrawal Sewa Centre</td>
              <td>4424875</td>
            </tr>
            <tr>
              <td>Aasara Drug Rehabilitation Center</td>
              <td>01-4384881</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
