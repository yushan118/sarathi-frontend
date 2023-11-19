"use client";

import { IAmbulanceUser } from "@/interfaces/auth";
import { getAuthenticatedAmbulanceUser } from "@/serverActions/auth";
import { createContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export const AmbulanceAuthContext = createContext<{
  ambulanceUser: IAmbulanceUser | undefined;
  update: () => Promise<void>;
}>({ ambulanceUser: undefined, update: async () => {} });

export default function InitializeAuthenticatedAmbulanceUser(props: {
  ambulanceUser: IAmbulanceUser | undefined;
  children: React.ReactNode;
}) {
  const [authenticatedAmbulanceUser, setAuthenticatedAmbulanceUser] = useState(
    props.ambulanceUser,
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
    const user = await getAuthenticatedAmbulanceUser();
    setAuthenticatedAmbulanceUser(user);
  }

  return (
    <AmbulanceAuthContext.Provider
      value={{ ambulanceUser: authenticatedAmbulanceUser, update: updateUser }}
    >
      {props.children}
    </AmbulanceAuthContext.Provider>
  );
}
