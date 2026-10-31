import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudy } from "@/components/CaseStudy";
import { denverMetro } from "@/data/denverMetro";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: {
    absolute: "Meridian Integrations | Denver Local SEO for Service Businesses",
  },
  description:
    "We Help Denver Metro Service Businesses Dominate Google Maps from Boulder to Castle Rock. 20 years of trusted Front Range local business heritage.",
};

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Meridian Integrations",
  description:
    "Local SEO and technical growth for Front Range service businesses and commercial property managers.",
  areaServed: [
    "Denver",
    ...denverMetro.map((location) => location.cityName),
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Denver",
    addressRegion: "CO",
    addressCountry: "US",
  },
  knowsAbout: ["Local SEO", "Google Business Profile", "Technical SEO", "Map pack"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.22),transparent_58%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-xs font-semibold tracking-[0.28em] text-brandRed">
            DENVER, COLORADO
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            We Help Denver Metro Service Businesses Dominate Google Maps &
            Out-Rank Local Competitors
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            20 years of trusted Front Range local business heritage, engineered
            into map-pack rank, technical SEO, and the calls that follow.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#audit"
              className="inline-flex items-center justify-center bg-brandRed px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brandRedHover"
            >
              Get Free Video Audit
            </a>
            <a
              href="#case-study"
              className="inline-flex items-center justify-center border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brandRed"
            >
              See the locksmith results
            </a>
          </div>
          <dl className="mt-14 grid gap-4 border border-white/10 bg-brandCard/80 sm:grid-cols-3">
            <div className="px-5 py-4">
              <dt className="text-xs tracking-[0.18em] text-zinc-500">HERITAGE</dt>
              <dd className="mt-1 text-lg font-bold text-white">20 years on the Front Range</dd>
            </div>
            <div className="px-5 py-4 sm:border-l sm:border-white/10">
              <dt className="text-xs tracking-[0.18em] text-zinc-500">FOCUS</dt>
              <dd className="mt-1 text-lg font-bold text-white">Maps, calls, high-ticket jobs</dd>
            </div>
            <div className="px-5 py-4 sm:border-l sm:border-white/10">
              <dt className="text-xs tracking-[0.18em] text-zinc-500">BASE</dt>
              <dd className="mt-1 text-lg font-bold text-white">Engineered in Denver, CO</dd>
            </div>
          </dl>
        </div>
      </section>

      <CaseStudy />

      <section id="services" className="scroll-mt-24 border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.28em] text-brandRed">
            SERVICES
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technical SEO blueprints for the trades that live on the phone
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/seo/${industry.slug}`}
                className="group border border-white/10 bg-brandCard p-6 transition-colors hover:border-brandRed"
              >
                <h3 className="text-xl font-bold text-white group-hover:text-brandRed">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{industry.summary}</p>
                <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-zinc-500">
                  {industry.keywordTargets[0]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="markets" className="scroll-mt-24 border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.28em] text-brandRed">
            MARKETS
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Denver metro pages built around how each city actually searches
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {denverMetro.map((location) => (
              <Link
                key={location.slug}
                href={`/local-seo/${location.slug}`}
                className="border border-white/10 bg-brandCard p-6 transition-colors hover:border-brandRed"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-brandRed">
                  {location.county.toUpperCase()}
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">{location.cityName}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-300">
                  {location.neighborhoodHook}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="audit" className="scroll-mt-24 border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <div className="border border-white/10 bg-brandCard px-6 py-10 sm:px-10">
            <p className="text-xs font-semibold tracking-[0.28em] text-brandRed">
              FREE VIDEO AUDIT
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A short recording of your map pack, your competitors, and the technical leaks costing calls
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300">
              Built for Front Range roofers, HVAC and plumbing companies, and
              commercial property managers. We walk the Google Business Profile,
              the queries you should own, and the pages that fail to convert the
              click.
            </p>
            <a
              href="mailto:audit@meridianintegrations.com?subject=Free%20Video%20Audit%20Request"
              className="mt-8 inline-flex items-center justify-center bg-brandRed px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brandRedHover"
            >
              Request the audit
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
