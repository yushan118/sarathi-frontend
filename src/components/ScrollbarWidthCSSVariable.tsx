"use client";

import { useEffect } from "react";

export default function ScrollbarWidthCSSVariable() {
  function setScrollbarWidthCSSVariable() {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      window.innerWidth - document.documentElement.offsetWidth + "px",
    );
  }

  useEffect(() => {
    setScrollbarWidthCSSVariable();
    window.addEventListener(
      "resize",
      () => setScrollbarWidthCSSVariable(),
      false,
    );
  }, []);

  return null;
}
