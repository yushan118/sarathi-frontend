import { cookies } from "next/headers";

export default async function fetchWithAuth(
  url: string,
  type: "ADMIN_" | "AMBULANCE_" | "",
  requestInit?: RequestInit,
) {
  const cookieStore = cookies();

  return fetch(`${process.env.API_URL}${url}`, {
    ...requestInit,
    headers: {
      Authorization: cookieStore.get(`AUTH_${type}TOKEN`)?.value || "",
      ...requestInit?.headers,
    },
  });
}
