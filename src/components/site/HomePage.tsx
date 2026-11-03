import Image from "next/image";
import Link from "next/link";
import { ConsultationLink } from "@/components/site/ConsultationLink";
import { ReviewFrame } from "@/components/site/ReviewFrame";
import {
  contactEmail,
  fullSiteHomePath,
  heroEyebrow,
  heroHeadline,
  heroLocation,
  heroParagraph,
  heroPoints,
  principles,
  processIntro,
  processSteps,
  featuredProjects,
  services,
  showPortfolio,
  type ServiceInclude,
  whyIntro,
} from "@/data/homepage";

const buttonClass =
  "inline-flex min-h-11 items-center justify-center bg-brandRed px-6 text-sm font-bold tracking-[0.12em] text-white transition-colors hover:bg-brandRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const quietButtonClass =
  "inline-flex min-h-11 items-center justify-center border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-brandRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function includeKey(item: ServiceInclude) {
  return typeof item === "string" ? item : item.title;
}

export function HomePage() {
  return (
    <ReviewFrame>
      <main id="content">
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.18),transparent_55%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_75%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
            <p className="max-w-md text-balance text-[11px] font-semibold tracking-[0.16em] text-brandRedInk sm:max-w-none sm:text-xs sm:tracking-[0.22em]">
              {heroEyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-[1.75rem] font-bold leading-[1.08] tracking-tight text-white min-[420px]:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block">{heroHeadline[0]}</span>
              <span className="block">{heroHeadline[1]}</span>
              <span className="block">
                <span className="sr-only">{heroHeadline[2]}</span>
                <span aria-hidden="true">
                  {heroHeadline[2].slice(0, -1)}<span className="text-brandRedInk">.</span>
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              {heroParagraph}
            </p>
            <p className="mt-4 text-sm font-medium text-zinc-200 sm:text-base">
              {heroLocation}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ConsultationLink className={buttonClass} />
              <Link href={`${fullSiteHomePath}#services`} className={quietButtonClass}>
                Explore Our Services
              </Link>
            </div>
            <div className="mt-14 grid gap-4 border border-white/10 bg-brandCard/80 sm:grid-cols-3">
              {heroPoints.map((point, index) => (
                <div
                  key={point.title}
                  className={`px-5 py-5 ${index > 0 ? "sm:border-l sm:border-white/10" : ""}`}
                >
                  <h2 className="text-lg font-bold text-white">{point.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 border-b border-white/10">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <p className="text-xs font-semibold tracking-[0.28em] text-brandRedInk">
              OUR SERVICES
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Digital Services That Help Your Business Grow
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
              From your website to Google search, social media, and AI-powered
              automation, Meridian Integrations brings technology and marketing
              expertise together to help you attract customers and grow your
              business.
            </p>
            <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`${fullSiteHomePath}#${service.id}`}
                  className="group flex h-full min-h-44 flex-col border border-white/10 bg-brandCard p-6 transition-colors hover:border-brandRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <p className="font-mono text-[11px] tracking-[0.18em] text-brandRedInk">
                    {service.index}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white group-hover:text-brandRedInk">
                    {service.cardTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{service.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {services.map((service) => (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-28 border-b border-white/10"
          >
            <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] lg:py-20">
              <div>
                <p className="font-mono text-[11px] tracking-[0.18em] text-brandRedInk">
                  {service.index}
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {service.title}
                </h2>
                <div className="mt-5 max-w-2xl space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
                  {service.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="border border-white/10 bg-brandCard p-6">
                <h3 className="text-sm font-semibold tracking-wide text-brandRedInk">
                  {service.includesHeading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.includes.map((item) =>
                    typeof item === "string" ? (
                      <li key={includeKey(item)} className="text-sm leading-6 text-zinc-200">
                        {item}
                      </li>
                    ) : (
                      <li key={includeKey(item)}>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-zinc-300">{item.body}</p>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <section id="why" className="scroll-mt-28 border-b border-white/10">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <p className="text-xs font-semibold tracking-[0.28em] text-brandRedInk">
              WHY MERIDIAN
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              More Than Marketing. Real Technical Expertise.
            </h2>
            <div className="mt-4 max-w-2xl space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
              {whyIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {principles.map((principle) => (
                <article key={principle.title} className="border border-white/10 bg-brandCard p-6">
                  <h3 className="text-xl font-bold text-white">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-we-work" className="scroll-mt-28 border-b border-white/10">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <p className="text-xs font-semibold tracking-[0.28em] text-brandRedInk">
              HOW WE WORK
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From First Conversation to Lasting Results.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
              {processIntro}
            </p>
            <ol className="mt-10 grid gap-4 lg:grid-cols-4">
              {processSteps.map((step) => (
                <li key={step.index} className="flex h-full flex-col border border-white/10 bg-brandCard p-6">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-brandRedInk">
                    {step.index}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-300">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {showPortfolio ? (
        <section id="work" className="scroll-mt-28 border-b border-white/10">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <p className="text-xs font-semibold tracking-[0.28em] text-brandRedInk">
              OUR WORK
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Real Projects. Thoughtful Solutions.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
              Every business has its own challenges, goals, and customers.
              Here&apos;s a look at some of the website and digital projects
              we&apos;ve worked on.
            </p>
            {featuredProjects.length > 0 ? (
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {featuredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="flex h-full flex-col border border-white/10 bg-brandCard"
                  >
                    <div className="relative aspect-[16/10] border-b border-white/10 bg-brandDark">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.imageAlt ?? ""}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-white">{project.name}</h3>
                      {project.description ? (
                        <p className="mt-3 text-sm leading-6 text-zinc-300">
                          {project.description}
                        </p>
                      ) : null}
                      {project.href ? (
                        <Link
                          href={project.href}
                          className="mt-auto inline-flex min-h-11 items-center pt-6 text-xs font-semibold tracking-[0.16em] text-zinc-200 underline decoration-brandRed decoration-2 underline-offset-4"
                        >
                          View Project
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
        ) : null}

        <section className="scroll-mt-28 border-b border-white/10">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-brandRedInk sm:tracking-[0.28em]">
                SMARTER BUSINESS OPERATIONS
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let Technology Handle the Busywork.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                From AI-powered receptionists and website chat to automated
                follow-ups and connected business systems, we build practical
                solutions around the way your business operates.
              </p>
            </div>
            <Link
              href={`${fullSiteHomePath}#automation`}
              className={quietButtonClass}
            >
              Explore AI & Automation
            </Link>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
            <div className="border border-white/10 bg-brandCard px-6 py-10 sm:px-10 sm:py-14">
              <p className="max-w-xl text-balance text-xs font-semibold tracking-[0.18em] text-brandRedInk sm:tracking-[0.28em]">
                LET&apos;S TALK ABOUT YOUR BUSINESS
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Build Something Better?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                Tell us a little about your business, and let&apos;s explore
                how Meridian Integrations can help.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ConsultationLink className={buttonClass} />
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex min-h-11 items-center text-sm font-bold text-white underline decoration-brandRed decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ReviewFrame>
  );
}
