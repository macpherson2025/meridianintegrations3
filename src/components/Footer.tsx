import Link from "next/link";
import { Logo } from "@/components/Logo";
import { denverMetro } from "@/data/denverMetro";
import { industries } from "@/data/industries";

export function Footer() {
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-white/10 bg-brandDark">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
            Local SEO and technical growth for high-ticket Front Range service
            businesses and commercial property managers.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">
            DENVER REGIONS
          </h2>
          <ul className="mt-4 space-y-2">
            {denverMetro.map((location) => (
              <li key={location.slug}>
                <Link
                  href={`/local-seo/${location.slug}`}
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  {location.cityName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">
            SERVICE VERTICALS
          </h2>
          <ul className="mt-4 space-y-2">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/seo/${industry.slug}`}
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">
            STUDIO
          </h2>
          <p className="mt-4 text-sm leading-6 text-zinc-300">
            Proudly engineered in Denver, CO.
          </p>
          <Link
            href="/#audit"
            className="mt-4 inline-flex text-sm font-bold text-white underline decoration-brandRed decoration-2 underline-offset-4"
          >
            Get Free Video Audit
          </Link>
          <p className="mt-6 text-xs text-zinc-500">
            © {year} Meridian Integrations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
