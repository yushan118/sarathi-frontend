import { headers } from "next/headers";
import { redirect } from "next/navigation";

export function redirectWithCurrentCallbackUrl(url: string) {
  const headersList = headers();
  redirect(`${url}?redirect=${headersList.get("x-pathname")}`);

  return null;
}
