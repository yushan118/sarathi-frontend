// Importing necessary modules and components
import fetchWithAuth from "@/helper/fetch";
import CreateDriver from "./Create";      // this component handles driver creation
import DriverEdit from "./Edit";    // this component handles driver editing


// Async function for rendering the Ambulance Drivers page
export default async function AmbulanceDriversPage() {

  // Fetching the list of ambulance drivers with authentication and cache tags
  const driversListRes = await fetchWithAuth("/ambulance/drivers", "ADMIN_", {
    next: { tags: ["drivers-list"] },
  });

  // Parsing the JSON response to get the list of drivers
  const driversList: { _id: string; name: string; mobile_number: string }[] =
    await driversListRes.json();

  return (
    <div>

      {/* Component for creating a new driver */}
      <CreateDriver />

      {/* Table displaying the list of ambulance drivers */}
      <table className="text-left">

        {/* Table header with columns: Name, Mobile Number */}
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
          </tr>
        </thead>

        {/* Table body containing rows for each driver */}
        <tbody>
          {driversList.map((d) => (

            // Component for editing a specific driver
            <DriverEdit
              key={d._id}
              _id={d._id}
              name={d.name}
              mobile_number={d.mobile_number}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
