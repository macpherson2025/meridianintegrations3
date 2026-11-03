export function LaunchFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-white">
            MERIDIAN INTEGRATIONS
          </p>
          <p className="mt-2 text-sm text-zinc-400">Denver Metro, Colorado</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href="mailto:info@meridianintegrations.com"
            className="inline-flex min-h-11 items-center text-sm text-zinc-200 underline decoration-brandRed decoration-2 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            info@meridianintegrations.com
          </a>
          <p className="text-xs tracking-wide text-zinc-400">
            © {year} Meridian Integrations
          </p>
        </div>
      </div>
    </footer>
  );
}
