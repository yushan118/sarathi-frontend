import fetchWithAuth from "@/helper/fetch";
import CreateDriver from "./Create";
import DriverEdit from "./Edit";

export default async function AmbulanceDriversPage() {
  const driversListRes = await fetchWithAuth("/ambulance/drivers", "ADMIN_", {
    next: { tags: ["drivers-list"] },
  });
  const driversList: { _id: string; name: string; mobile_number: string }[] =
    await driversListRes.json();

  return (
    <div>
      <CreateDriver />
      <ol className="list-disc">
        {driversList.map((d) => (
          <DriverEdit
            key={d._id}
            _id={d._id}
            name={d.name}
            mobile_number={d.mobile_number}
          />
        ))}
      </ol>
    </div>
  );
}
