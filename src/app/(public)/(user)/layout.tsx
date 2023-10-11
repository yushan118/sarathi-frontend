import { redirectWithCurrentCallbackUrl } from "@/helper/auth";
import { getAuthenticatedUser } from "@/serverActions/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return redirectWithCurrentCallbackUrl("/signin");
  }

  return <>{children}</>;
}
