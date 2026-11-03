import Image from "next/image";
import { ConsultationLink } from "@/components/site/ConsultationLink";
import { ReviewFrame } from "@/components/site/ReviewFrame";
import { HomeHashSync } from "@/components/site/HomeSectionLink";
import {
  contactEmail,
  conversationLabel,
  heroHeadline,
  heroSubheading,
  publishedProjects,
  type PortfolioProject,
} from "@/data/homepage";

const conversationClass =
  "inline-flex min-h-11 items-center justify-center bg-brandRed px-6 text-sm font-bold text-white transition-colors hover:bg-brandRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function portfolioForThisBuild(): PortfolioProject[] {
  if (publishedProjects.length > 0) return publishedProjects;
  if (process.env.NODE_ENV !== "development") return publishedProjects;
  return [
    {
      id: "internal-preview-1",
      name: "Internal placeholder",
      category: "Internal",
      description: "Not a client project. This frame is hidden in production.",
      href: "",
      image: "",
      imageAlt: "",
    },
  ];
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
          <div className="relative mx-auto flex w-full max-w-6xl flex-col px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[calc(100svh-12rem)] lg:justify-end lg:pb-[98px] lg:pt-16">
            <h1 className="max-w-4xl text-3xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl sm:leading-[1.15] lg:text-5xl">
              <span className="sr-only">{heroHeadline}</span>
              <span aria-hidden="true">
                {heroHeadline.slice(0, -1)}
                <span className="text-brandRedInk">.</span>
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              {heroSubheading}
            </p>
            <div className="mt-10">
              <ConsultationLink className={conversationClass} label={conversationLabel} />
            </div>
          </div>
        </section>

        {projects.length > 0 ? (
          <section id="work" className="scroll-mt-28 border-b border-white/10">
            <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pb-28 lg:pt-6">
              <p className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">SELECTED WORK</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Selected work
              </h2>
              <div className="mt-10 flex flex-col gap-16 sm:mt-12 sm:gap-24">
                {projects.map((project) => (
                  <article key={project.id} className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.55fr)] lg:items-end lg:gap-14">
                    <div className="group relative">
                      <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-brandCard">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.imageAlt}
                            fill
                            unoptimized
                            sizes="(min-width: 1024px) 68vw, 100vw"
                            className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
                          />
                        ) : (
                          <p className="absolute inset-0 flex items-end p-6 text-sm text-zinc-500">
                            Internal placeholder
                          </p>
                        )}
                      </div>
                      {project.mobileImage ? (
                        <div className="absolute bottom-4 right-4 hidden w-[7.5rem] overflow-hidden border border-white/20 bg-brandDark shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:block lg:bottom-6 lg:right-6 lg:w-36">
                          <Image
                            src={project.mobileImage}
                            alt={project.mobileImageAlt ?? ""}
                            width={780}
                            height={900}
                            unoptimized
                            className="h-auto w-full"
                          />
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-[0.16em] text-brandRedInk">{project.category}</p>
                      <h3 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {project.name}
                      </h3>
                      <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-300">{project.description}</p>
                      {project.mobileImage ? (
                        <div className="mt-6 w-36 overflow-hidden border border-white/15 sm:hidden">
                          <Image
                            src={project.mobileImage}
                            alt={project.mobileImageAlt ?? ""}
                            width={780}
                            height={900}
                            unoptimized
                            className="h-auto w-full"
                          />
                        </div>
                      ) : null}
                      {project.href ? (
                        <a
                          href={project.href}
                          className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-white underline decoration-brandRed decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Website
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
