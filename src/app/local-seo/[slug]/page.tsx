import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { denverMetro, getDenverLocation } from "@/data/denverMetro";
import { industries } from "@/data/industries";

type LocalSeoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return denverMetro.map((location) => ({ slug: location.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LocalSeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getDenverLocation(slug);

  if (!location) {
    return { title: "Market not found" };
  }

  return {
    title: `${location.cityName} Local SEO`,
    description: `Map-pack and technical SEO for roofers, HVAC, plumbers, and property managers in ${location.cityName}, ${location.county}.`,
    openGraph: {
      title: `${location.cityName} Local SEO | Meridian Integrations`,
      description: `Local search built around how ${location.cityName} actually hires a service business.`,
    },
  };
}

export default async function LocalSeoPage({ params }: LocalSeoPageProps) {
  const { slug } = await params;
  const location = getDenverLocation(slug);

  if (!location) {
    notFound();
  }

  const otherMarkets = denverMetro.filter((market) => market.slug !== location.slug);

  return (
    <article>
      <header className="border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-semibold tracking-[0.28em] text-brandRed">
            {location.county.toUpperCase()} · FRONT RANGE
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Local SEO for service businesses in {location.cityName}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            {location.neighborhoodHook}
          </p>
          <a
            href="/#audit"
            className="mt-8 inline-flex bg-brandRed px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brandRedHover"
          >
            Get Free Video Audit
          </a>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-2xl font-bold text-white">
          What we integrate in {location.cityName}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="border border-white/10 bg-brandCard p-6">
            <h3 className="text-lg font-bold text-white">Map pack</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              A Google Business Profile built for {location.cityName} categories,
              photos, and the queries homeowners and managers type before they
              call.
            </p>
          </article>
          <article className="border border-white/10 bg-brandCard p-6">
            <h3 className="text-lg font-bold text-white">Technical foundation</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              One indexable {location.cityName} hub in {location.county}, with
              schema, internal links, and templates that do not compete with
              each other.
            </p>
          </article>
          <article className="border border-white/10 bg-brandCard p-6">
            <h3 className="text-lg font-bold text-white">Call conversion</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Click-to-call tracking from the map result through the landing
              page, so {location.cityName} rank is tied to jobs, not vanity
              traffic.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="text-2xl font-bold text-white">
            Trades we rank from {location.cityName}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/seo/${industry.slug}`}
                  className="block border border-white/10 bg-brandCard p-6 transition-colors hover:border-brandRed"
                >
                  <h3 className="text-lg font-bold text-white">{industry.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {industry.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="text-2xl font-bold text-white">Other Front Range markets</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {otherMarkets.map((market) => (
              <li key={market.slug}>
                <Link
                  href={`/local-seo/${market.slug}`}
                  className="inline-flex border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-brandRed hover:text-white"
                >
                  {market.cityName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
