"use client";

import type { ReactNode } from "react";
import { ContactPanelProvider } from "@/components/site/ContactPanel";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export function ReviewFrame({ children }: { children: ReactNode }) {
  return (
    <ContactPanelProvider>
      <SiteHeader />
      {children}
      <SiteFooter />
    </ContactPanelProvider>
  );
}
