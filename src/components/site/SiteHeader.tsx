"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  fullSiteHomePath,
  showPortfolio,
} from "@/data/homepage";
import { ConsultationLink } from "@/components/site/ConsultationLink";
import { useHomeNavigation } from "@/components/site/useHomeNavigation";

const navItems = [
  { href: fullSiteHomePath, label: "Home" },
  { href: `${fullSiteHomePath}#services`, label: "Services" },
  { href: `${fullSiteHomePath}#why`, label: "Why Meridian" },
  { href: `${fullSiteHomePath}#how-we-work`, label: "How We Work" },
  { href: `${fullSiteHomePath}#work`, label: "Work" },
  { href: `${fullSiteHomePath}#contact`, label: "Contact" },
].filter((item) => showPortfolio || item.href !== `${fullSiteHomePath}#work`);

const navLinkClass =
  "text-sm font-medium text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const ctaClass =
  "inline-flex min-h-11 items-center justify-center bg-brandRed px-4 text-sm font-bold text-white transition-colors hover:bg-brandRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const handleHomeClick = useHomeNavigation(() => setOpen(false));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brandDark/80 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="h-0.5 bg-brandRed" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Logo
          href={fullSiteHomePath}
          label="Meridian Integrations"
          className="min-h-11"
          onClick={handleHomeClick}
        />
        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass}
              onClick={item.href === fullSiteHomePath ? handleHomeClick : undefined}
            >
              {item.label}
            </Link>
          ))}
          <ConsultationLink className={ctaClass} />
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className="block h-px w-5 bg-white" />
            <span className="block h-px w-5 bg-white" />
            <span className="block h-px w-5 bg-brandRed" />
          </span>
        </button>
      </div>
      {open ? (
        <div
          id="site-mobile-nav"
          className="border-t border-white/10 bg-brandDark/95 px-5 py-4 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-sm font-medium text-zinc-200"
                onClick={
                  item.href === fullSiteHomePath
                    ? handleHomeClick
                    : () => setOpen(false)
                }
              >
                {item.label}
              </Link>
            ))}
            <ConsultationLink className={`${ctaClass} mt-2`} onNavigate={() => setOpen(false)} />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
