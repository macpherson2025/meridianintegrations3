import type { Metadata } from "next";
import { AssemblyBlueprint, AssemblyField } from "@/components/coming-soon/AssemblyVisual";
import { LaunchFooter } from "@/components/coming-soon/LaunchFooter";
import { LaunchHeader } from "@/components/coming-soon/LaunchHeader";

const description =
  "We're building a new digital experience for Meridian Integrations. Engineered for performance, designed with purpose, and built to help businesses grow.";

export const metadata: Metadata = {
  title: {
    absolute: "Meridian Integrations | Coming Soon",
  },
  description,
  openGraph: {
    title: "Meridian Integrations | Coming Soon",
    description,
    url: "/",
    siteName: "Meridian Integrations",
  },
};

export default function ComingSoonPage() {
  return (
    <>
      <LaunchHeader />
      <main id="content" className="relative flex flex-1 flex-col overflow-x-clip">
        <AssemblyField />
        <section className="relative z-10 mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-20">
          <p className="max-w-xs text-balance text-[11px] font-semibold tracking-[0.22em] text-brandRedInk sm:max-w-none sm:text-xs sm:tracking-[0.28em]">
            DENVER, COLORADO · IN DEVELOPMENT
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-[1.65rem] font-bold leading-[1.08] tracking-tight text-white min-[420px]:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="sr-only">Something Exceptional Is Taking Shape.</span>
            <span aria-hidden="true">
              Something Exceptional Is Taking Shape<span className="text-brandRedInk">.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
            We&apos;re building a new digital experience for Meridian Integrations.
            Engineered for performance, designed with purpose, and built to help
            businesses grow.
          </p>
          <div className="mt-9 flex w-full flex-col items-center gap-4 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center sm:gap-5">
            <p className="inline-flex min-h-11 items-center gap-3 border border-white/15 bg-white/[0.03] px-4 text-[11px] font-semibold tracking-[0.24em] text-zinc-100 sm:tracking-[0.28em]">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="status-glow absolute inset-0 bg-brandRed" />
                <span className="relative h-2 w-2 bg-brandRed" />
              </span>
              COMING SOON
            </p>
            <a
              href="mailto:info@meridianintegrations.com"
              className="inline-flex min-h-11 w-full max-w-xs items-center justify-center bg-brandRed px-6 text-sm font-bold tracking-[0.14em] text-white transition-colors hover:bg-brandRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto sm:min-w-44"
            >
              GET IN TOUCH
            </a>
          </div>
          <p className="mt-6 text-sm tracking-wide text-zinc-400">
            Local expertise. Technical precision. Built in Colorado.
          </p>
        </section>
        <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="mx-auto mb-8 h-px w-12 bg-brandRed sm:mb-10" aria-hidden="true" />
          <AssemblyBlueprint />
        </div>
      </main>
      <LaunchFooter />
    </>
  );
}
