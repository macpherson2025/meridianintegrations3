import { Logo } from "@/components/Logo";

export function LaunchHeader() {
  return (
    <header className="relative z-20 border-b border-white/10">
      <div className="h-0.5 bg-brandRed" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-6xl items-center px-5 py-4 sm:px-8">
        <Logo className="min-h-11" />
      </div>
    </header>
  );
}
