"use client";

import { IUser } from "@/interfaces/auth";
import { getAuthenticatedUser } from "@/serverActions/auth";
import { createContext, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext<{
  user: IUser | undefined;
  update: () => Promise<void>;
}>({ user: undefined, update: async () => {} });

export default function InitializeAuthenticatedUser(props: {
  user: IUser | undefined;
  children: React.ReactNode;
}) {
  const [authenticatedUser, setAuthenticatedUser] = useState(props.user);

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
    const user = await getAuthenticatedUser();
    setAuthenticatedUser(user);
  }

  return (
    <AuthContext.Provider
      value={{ user: authenticatedUser, update: updateUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
