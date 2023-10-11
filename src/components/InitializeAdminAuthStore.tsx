"use client";

import { IAdminUser } from "@/interfaces/auth";
import { getAuthenticatedAdminUser } from "@/serverActions/auth";
import { createContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export const AdminAuthContext = createContext<{
  adminUser: IAdminUser | undefined;
  update: () => Promise<void>;
}>({ adminUser: undefined, update: async () => {} });

export default function InitializeAuthenticatedAdminUser(props: {
  adminUser: IAdminUser | undefined;
  children: React.ReactNode;
}) {
  const [authenticatedAdminUser, setAuthenticatedAdminUser] = useState(
    props.adminUser,
  );

  const firstRender = useRef(true);
  const [authCookies] = useCookies(["AUTH_TOKEN"]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    updateUser();
  }, [authCookies]);

  async function updateUser() {
    const user = await getAuthenticatedAdminUser();
    setAuthenticatedAdminUser(user);
  }

  return (
    <AdminAuthContext.Provider
      value={{ adminUser: authenticatedAdminUser, update: updateUser }}
    >
      {props.children}
    </AdminAuthContext.Provider>
  );
}
