import type { ReactNode } from "react";
import { ReviewFrame } from "@/components/site/ReviewFrame";

type PlaceholderSectionProps = {
  label: string;
  children?: ReactNode;
};

function PlaceholderSection({ label, children }: PlaceholderSectionProps) {
  return (
    <section
      aria-label={label}
      className="border border-dashed border-white/15 bg-brandCard/40 px-5 py-8 sm:px-6"
    >
      <p className="text-xs font-semibold tracking-[0.22em] text-zinc-500">
        {label}
      </p>
      {children ?? null}
    </section>
  );
}

type PlaceholderPageProps = {
  title: string;
  showFutureArticles?: boolean;
};

export function PlaceholderPage({
  title,
  showFutureArticles = false,
}: PlaceholderPageProps) {
  return (
    <ReviewFrame>
      <main id="content" className="flex-1">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>

          <PlaceholderSection label="Hero" />
          <PlaceholderSection label="Introduction" />
          <PlaceholderSection label="Primary content" />
          <PlaceholderSection label="Supporting content" />

          {showFutureArticles ? (
            <PlaceholderSection label="Future articles">
              <div
                aria-label="Future articles area"
                className="mt-4 min-h-24 border border-white/10 bg-brandDark/40"
              />
            </PlaceholderSection>
          ) : null}

          <PlaceholderSection label="CTA" />
        </div>
      </main>
    </ReviewFrame>
  );
}
