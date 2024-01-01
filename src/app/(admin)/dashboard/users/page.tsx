import fetchWithAuth from "@/helper/fetch";
import UserEdit from "./Edit";

export default async function UsersPage() {
  const usersListRes = await fetchWithAuth("/user/list", "ADMIN_", {
    next: { tags: ["users-list"] },
  });
  const usersList: { _id: string; name: string; mobile_number: string }[] =
    await usersListRes.json();

  return (
    <div>
      <ol className="list-disc">
        {usersList.map((d) => (
          <UserEdit
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