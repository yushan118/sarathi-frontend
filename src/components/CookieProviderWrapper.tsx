"use client";

import { CookiesProvider } from "react-cookie";

export default function CookieProviderWrapper(props: {
  children: React.ReactNode;
}) {
  return <CookiesProvider>{props.children}</CookiesProvider>;
}
