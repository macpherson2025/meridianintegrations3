import type { MouseEventHandler } from "react";
import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string;
  label?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Logo({
  className = "",
  href = "/",
  label = "Meridian Integrations home",
  onClick,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
        aria-hidden="true"
        shapeRendering="geometricPrecision"
      >
        <path
          fill="#262626"
          d="M7 56V11h10l13 22h-7L16 20.5V56H7z"
        />
        <path fill="#dc2626" d="M27 36.5 44 12h8v44h-9V28.5L34 40.5 30 56h-8l5-19.5z" />
        <path fill="#dc2626" d="M47 13 63 2 55 18z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[13px] font-bold tracking-[0.22em] text-white sm:text-sm">
          MERIDIAN
        </span>
        <span className="mt-1 text-[9px] font-semibold tracking-[0.32em] text-brandRedInk sm:text-[10px]">
          INTEGRATIONS
        </span>
      </span>
    </Link>
  );
}
