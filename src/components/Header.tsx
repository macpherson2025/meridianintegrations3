"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";

const navItems = [
  { href: "/#markets", label: "Markets" },
  { href: "/#services", label: "Services" },
  { href: "/#case-study", label: "Case Study" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brandDark/75 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150">
      <div className="h-0.5 bg-brandRed" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#audit"
            className="inline-flex items-center justify-center bg-brandRed px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brandRedHover"
          >
            Get Free Video Audit
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
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
          id="mobile-nav"
          className="border-t border-white/10 bg-brandDark/90 px-5 py-4 backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-1 py-3 text-sm font-medium text-zinc-200"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#audit"
              className="mt-2 inline-flex items-center justify-center bg-brandRed px-4 py-3 text-sm font-bold text-white"
              onClick={() => setOpen(false)}
            >
              Get Free Video Audit
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
