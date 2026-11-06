"use client";

import { Logo } from "@/components/Logo";
import {
  conversationLabel,
  fullSiteHomePath,
} from "@/data/homepage";
import { ConsultationLink } from "@/components/site/ConsultationLink";
import { SiteHamburgerMenu } from "@/components/site/SiteHamburgerMenu";
import { useHomeNavigation } from "@/components/site/useHomeNavigation";

const ctaClass =
  "inline-flex min-h-11 items-center justify-center bg-brandRed px-4 text-sm font-bold text-white transition-colors hover:bg-brandRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function SiteHeader() {
  const handleSectionClick = useHomeNavigation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brandDark/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="h-0.5 bg-brandRed" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Logo
          href={fullSiteHomePath}
          label="Meridian Integrations"
          className="min-h-11"
          onClick={handleSectionClick}
        />
        <div className="flex items-center gap-3 sm:gap-4">
          <ConsultationLink
            className={`${ctaClass} hidden sm:inline-flex`}
            label={conversationLabel}
          />
          <SiteHamburgerMenu />
        </div>
      </div>
    </header>
  );
}
