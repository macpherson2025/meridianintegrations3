"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { fullSiteHomePath } from "@/data/homepage";

export function isPlainActivation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function scrollHomeToTop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
  if (window.location.hash) {
    window.history.replaceState(null, "", fullSiteHomePath);
  }
}

export function useHomeNavigation(onPlainActivate?: () => void) {
  const pathname = usePathname();

  return function handleHomeClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isPlainActivation(event)) return;
    onPlainActivate?.();
    if (pathname !== fullSiteHomePath) return;
    event.preventDefault();
    scrollHomeToTop();
  };
}
