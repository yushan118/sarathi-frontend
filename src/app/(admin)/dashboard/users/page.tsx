// Importing the fetchWithAuth function for authenticated API calls
import fetchWithAuth from "@/helper/fetch";

// Importing the UserEdit component for editing user details
import UserEdit from "./Edit";

// Async function for rendering the UsersPage component
export default async function UsersPage() {

  // Fetching the list of users with authentication
  const usersListRes = await fetchWithAuth("/user/list", "ADMIN_", {
    
    next: { tags: ["users-list"] },
  });

  // Parsing the JSON response containing the list of users
  const usersList: {
    _id: string;
    name: string;
    mobile_number: string;
    is_suspended: boolean;
  }[] = await usersListRes.json();

  return (

    // Rendering the main content of the UsersPage component
    <div>

      {/* Table displaying user details */}
      <table className="border-2 border-[#E7E8EA] text-left font-light w-full">

         {/* Table header */}
        <thead className="border-b-2 font-medium dark:border-[#E7E8EA]">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Mobile Number</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        {/* Table body with UserEdit components for each user */}
        <tbody>
          {usersList.map((d) => (
            <UserEdit
              key={d._id}
              _id={d._id}
              name={d.name}
              mobile_number={d.mobile_number}
              is_suspended={d.is_suspended}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
