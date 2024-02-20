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
      <table className="text-left">

         {/* Table header */}
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
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
