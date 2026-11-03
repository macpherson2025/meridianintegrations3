import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { denverMetro } from "@/data/denverMetro";
import { getIndustry, industries } from "@/data/industries";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return { title: "Industry not found" };
  }

  return {
    title: `${industry.name} SEO Blueprint`,
    description: `${industry.summary} Keyword targets include ${industry.keywordTargets.slice(0, 3).join(", ")}.`,
    openGraph: {
      title: `${industry.name} SEO Blueprint | Meridian Integrations`,
      description: industry.summary,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  return (
    <article>
      <header className="border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-semibold tracking-[0.28em] text-brandRedInk">
            TECHNICAL SEO BLUEPRINT
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {industry.name} SEO for the Denver metro
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            {industry.summary}
          </p>
          <Link
            href="/#audit"
            className="mt-8 inline-flex bg-brandRed px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brandRedHover"
          >
            Get Free Video Audit
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-2xl font-bold text-white">High-value keyword targets</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {industry.keywordTargets.map((keyword) => (
            <li
              key={keyword}
              className="border border-white/15 bg-brandCard px-3 py-2 text-sm text-zinc-200"
            >
              {keyword}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="text-2xl font-bold text-white">Three-step technical blueprint</h2>
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {industry.blueprint.map((step, index) => (
              <li key={step.title} className="border border-white/10 bg-brandCard p-6">
                <p className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">
                  STEP 0{index + 1}
                </p>
                <h3 className="mt-3 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="text-2xl font-bold text-white">Deployed across these markets</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {denverMetro.map((location) => (
              <li key={location.slug}>
                <Link
                  href={`/local-seo/${location.slug}`}
                  className="inline-flex border border-white/15 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-brandRed hover:text-white"
                >
                  {location.cityName}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-zinc-400">
            Related blueprints:{" "}
            {industries
              .filter((item) => item.slug !== industry.slug)
              .map((item, index, list) => (
                <span key={item.slug}>
                  <Link
                    href={`/seo/${item.slug}`}
                    className="text-white underline decoration-brandRed underline-offset-4"
                  >
                    {item.name}
                  </Link>{index < list.length - 1 ? ", " : null}
                </span>
              ))}
          </p>
        </div>
      </section>
    </article>
  );
}
