const locksmithCaseStudy = {
  client: "High-volume Denver locksmith",
  metric: "340%",
  metricLabel: "more click-to-call mobile leads",
  columns: [
    {
      key: "problem",
      label: "The Problem",
      title: "Buried under national directories",
      body: "A high-volume Denver locksmith was losing emergency calls to Angi, Yelp, and three better-positioned independents. The Google Business Profile was thin, service-area pages competed with each other, and mobile click-to-call never fired from the map pack.",
    },
    {
      key: "integration",
      label: "The Integration",
      title: "Map-pack architecture, wired to the phone",
      body: "We rebuilt the entity: one primary profile, neighborhood service hubs, locksmith schema, and call tracking on every map and organic landing URL. Review velocity, photo cadence, and citation consistency moved onto a weekly operating rhythm.",
    },
    {
      key: "results",
      label: "The Results",
      title: "Map pack dominance",
      body: "The profile moved into the Denver map pack for core emergency and automotive lockout terms. Click-to-call mobile leads rose 340%, and the jobs that followed were the high-ticket after-hours calls the shop is built to win.",
    },
  ],
} as const;

export function CaseStudy() {
  return (
    <section id="case-study" className="scroll-mt-24 border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.28em] text-brandRedInk">
          CASE STUDY
        </p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How a Denver locksmith took the map pack
          </h2>
          <p className="max-w-md text-sm leading-6 text-zinc-400">
            {locksmithCaseStudy.client}. One integration. Measured on the only
            number that pays the trucks: the phone.
          </p>
        </div>
        <p className="mt-8 font-bold tracking-tight text-brandRedInk">
          <span className="text-5xl sm:text-6xl">{locksmithCaseStudy.metric}</span>
          <span className="ml-3 text-base font-semibold text-zinc-200">
            {locksmithCaseStudy.metricLabel}
          </span>
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {locksmithCaseStudy.columns.map((column, index) => (
            <article
              key={column.key}
              className="flex flex-col border border-white/10 bg-brandCard p-6"
            >
              <p className="text-xs font-semibold tracking-[0.22em] text-brandRedInk">
                0{index + 1} / {column.label.toUpperCase()}
              </p>
              <h3 className="mt-4 text-xl font-bold text-white">{column.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{column.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
