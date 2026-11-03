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

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function scrollHomeTarget(hash: string) {
  const behavior = scrollBehavior();
  if (!hash) {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    if (behavior === "auto") root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior });
    if (behavior === "auto") root.style.scrollBehavior = previous;
    if (window.location.hash || window.location.pathname !== fullSiteHomePath) {
      window.history.pushState(null, "", fullSiteHomePath);
    }
    return;
  }

  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior, block: "start" });
  const nextUrl = `${fullSiteHomePath}#${id}`;
  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    window.history.pushState(null, "", nextUrl);
  }
}

export function useHomeNavigation(onPlainActivate?: () => void) {
  const pathname = usePathname();

  return function handleHomeClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isPlainActivation(event)) return;
    const url = new URL(event.currentTarget.href);
    if (url.origin !== window.location.origin || url.pathname !== fullSiteHomePath) return;
    onPlainActivate?.();
    if (pathname !== fullSiteHomePath) return;
    if (url.hash && !document.getElementById(decodeURIComponent(url.hash.slice(1)))) return;
    event.preventDefault();
    window.setTimeout(() => scrollHomeTarget(url.hash), 0);
  };
}
