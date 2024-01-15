import fetchWithAuth from "@/helper/fetch";
import UserEdit from "./Edit";

export default async function UsersPage() {
  const usersListRes = await fetchWithAuth("/user/list", "ADMIN_", {
    next: { tags: ["users-list"] },
  });
  const usersList: {
    _id: string;
    name: string;
    mobile_number: string;
    is_suspended: boolean;
  }[] = await usersListRes.json();

  return (
    <div>
      <table className="text-left">
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
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
