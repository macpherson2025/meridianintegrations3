import Image from "next/image";
import { ConsultationLink } from "@/components/site/ConsultationLink";
import { ReviewFrame } from "@/components/site/ReviewFrame";
import { HomeHashSync } from "@/components/site/HomeSectionLink";
import {
  contactEmail,
  conversationLabel,
  heroEyebrow,
  heroHeadline,
  heroParagraph,
  heroPresence,
  processIntro,
  processSteps,
  publishedProjects,
  services,
  whoWeAre,
  type PortfolioProject,
} from "@/data/homepage";

const conversationClass =
  "inline-flex min-h-11 items-center justify-center bg-brandRed px-6 text-sm font-bold text-white transition-colors hover:bg-brandRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function portfolioForThisBuild(): PortfolioProject[] {
  if (process.env.NODE_ENV === "development") {
    return [
      {
        id: "internal-preview-1",
        name: "Internal placeholder",
        description: "Not a client project. This frame is hidden in production.",
      },
      {
        id: "internal-preview-2",
        name: "Internal placeholder",
        description: "Not a client project. This frame is hidden in production.",
      },
    ];
  }
  return publishedProjects;
}

export function HomePage() {
  const projects = portfolioForThisBuild();

  return (
    <ReviewFrame>
      <HomeHashSync />
      <main id="content">
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.16),transparent_52%)]"
            aria-hidden="true"
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col px-5 py-24 sm:px-8 sm:py-32 lg:min-h-[78vh] lg:justify-end lg:py-36">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brandRedInk sm:text-xs sm:tracking-[0.22em]">
              {heroEyebrow}
            </p>
            <h1 className="mt-6 max-w-5xl text-[1.85rem] font-bold leading-[1.02] tracking-tight text-white min-[420px]:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              <span className="block">{heroHeadline[0]}</span>
              <span className="block">{heroHeadline[1]}</span>
              <span className="block">
                <span className="sr-only">{heroHeadline[2]}</span>
                <span aria-hidden="true">
                  {heroHeadline[2].slice(0, -1)}
                  <span className="text-brandRedInk">.</span>
                </span>
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              {heroParagraph}
            </p>
            <p className="mt-4 text-sm text-zinc-400">{heroPresence}</p>
            <div className="mt-10">
              <ConsultationLink className={conversationClass} label={conversationLabel} />
            </div>
          </div>
        </section>

        {projects.length > 0 ? (
          <section id="work" className="scroll-mt-28 border-b border-white/10">
            <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
              <p className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">SELECTED WORK</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Selected work
              </h2>
              <div className="mt-14 flex flex-col gap-16 sm:gap-24">
                {projects.map((project) => (
                  <article key={project.id} className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] lg:items-end lg:gap-12">
                    <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-brandCard">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.imageAlt ?? ""}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 70vw, 100vw"
                          className="object-cover"
                        />
                      ) : process.env.NODE_ENV === "development" ? (
                        <p className="absolute inset-0 flex items-end p-6 text-sm text-zinc-500">
                          Internal placeholder
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {project.name}
                      </h3>
                      <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-300">{project.description}</p>
                      {project.href ? (
                        <a
                          href={project.href}
                          className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-white underline decoration-brandRed decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="who-we-are" className="scroll-mt-28 border-b border-white/10">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">WHO WE ARE</h2>
            <div className="max-w-2xl space-y-5">
              {whoWeAre.map((paragraph) => (
                <p key={paragraph} className="text-xl leading-8 text-zinc-200 sm:text-2xl sm:leading-9">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 border-b border-white/10">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">WHAT WE DO</h2>
            <ol className="mt-10 border-t border-white/10">
              {services.map((service) => (
                <li
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-28 grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-8 sm:py-8"
                >
                  <span className="font-mono text-xs tracking-[0.18em] text-brandRedInk">{service.index}</span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{service.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">{service.short}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="how-we-work" className="scroll-mt-28 border-b border-white/10">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <h2 className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">HOW WE WORK</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">{processIntro}</p>
            <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
              {processSteps.map((step) => (
                <li key={step.index}>
                  <p className="font-mono text-xs tracking-[0.18em] text-brandRedInk">{step.index}</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-300">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28">
          <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
            <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s build something worth showing.
            </h2>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ConsultationLink className={conversationClass} label={conversationLabel} />
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex min-h-11 items-center text-sm font-bold text-white underline decoration-brandRed decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {contactEmail}
              </a>
            </div>
          </div>
        </section>
      </main>
    </ReviewFrame>
  );
}
