"use client";

import { Logo } from "@/components/Logo";
import {
  contactEmail,
  fullSiteHomePath,
  heroLocation,
  services,
} from "@/data/homepage";
import { useHomeNavigation } from "@/components/site/useHomeNavigation";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const handleHomeClick = useHomeNavigation();

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo
            href={fullSiteHomePath}
            label="Meridian Integrations"
            onClick={handleHomeClick}
          />
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">{heroLocation}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">
            SERVICES
          </h2>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href={`${fullSiteHomePath}#${service.id}`}
                  className="inline-flex min-h-11 items-center text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-0 sm:py-1"
                  onClick={handleHomeClick}
                >
                  {service.cardTitle}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">
            STUDIO
          </h2>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-white underline decoration-brandRed decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {contactEmail}
          </a>
          <p className="mt-6 text-xs text-zinc-400">© {year} Meridian Integrations</p>
        </div>
      </div>
    </footer>
  );
}
