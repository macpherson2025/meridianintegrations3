"use client";

import { useEffect, type ReactNode } from "react";
import { useHomeNavigation } from "@/components/site/useHomeNavigation";

export function HomeSectionLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const onClick = useHomeNavigation();
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function HomeHashSync() {
  useEffect(() => {
    function align(hash: string) {
      if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
      }
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }

    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    if (window.location.hash) align(window.location.hash);
    function onPopState() {
      window.setTimeout(() => align(window.location.hash), 0);
    }
    window.addEventListener("popstate", onPopState);
    return () => {
      window.history.scrollRestoration = previousRestoration;
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return null;
}
