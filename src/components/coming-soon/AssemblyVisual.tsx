import type { CSSProperties } from "react";

const ink = "rgba(255,255,255,0.78)";
const guide = "rgba(255,255,255,0.28)";
const muted = "rgba(255,255,255,0.42)";
const crimson = "#dc2626";

function draw(delay: string) {
  return {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    vectorEffect: "non-scaling-stroke" as const,
    className: "assembly-draw",
    style: { animationDelay: delay } satisfies CSSProperties,
  };
}

export function AssemblyField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.16),transparent_54%)]" />
      <div className="absolute left-1/2 top-[38%] h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.045),transparent_68%)] sm:h-[48rem] sm:w-[48rem]" />
      <div className="assembly-grid absolute inset-0" />
      <div className="meridian-sweep absolute inset-y-0 left-0 w-full">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-brandRed/15 to-transparent sm:w-32" />
        <div className="absolute inset-y-10 left-12 w-px bg-gradient-to-b from-transparent via-brandRed/80 to-transparent sm:left-16" />
      </div>
    </div>
  );
}

export function AssemblyBlueprint() {
  return (
    <div className="w-full" aria-hidden="true">
      <svg
        viewBox="0 0 640 300"
        className="h-auto w-full"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <path d="M34 16H18V32" stroke={guide} {...draw("0s")} />
        <path d="M606 16H622V32" stroke={guide} {...draw("0.05s")} />
        <path d="M18 268V284H34" stroke={guide} {...draw("0.08s")} />
        <path d="M622 268V284H606" stroke={guide} {...draw("0.12s")} />

        <rect x="36" y="32" width="568" height="236" stroke={ink} {...draw("0.15s")} />

        <line x1="36" y1="78" x2="604" y2="78" stroke={ink} {...draw("0.48s")} />
        <path d="M54 68V50l8 9 8-9v18" stroke={crimson} {...draw("0.62s")} />
        <line x1="430" y1="55" x2="478" y2="55" stroke={muted} {...draw("0.7s")} />
        <line x1="492" y1="55" x2="540" y2="55" stroke={muted} {...draw("0.78s")} />
        <line x1="554" y1="55" x2="586" y2="55" stroke={muted} {...draw("0.86s")} />

        <line x1="228" y1="78" x2="228" y2="268" stroke={ink} {...draw("0.72s")} />

        <line x1="54" y1="108" x2="204" y2="108" stroke={ink} strokeWidth="1.5" {...draw("0.9s")} />
        <line x1="54" y1="124" x2="168" y2="124" stroke={crimson} strokeWidth="1.5" {...draw("1.02s")} />
        <line x1="54" y1="168" x2="198" y2="168" stroke={muted} {...draw("1.12s")} />
        <line x1="54" y1="182" x2="164" y2="182" stroke={muted} {...draw("1.2s")} />
        <line x1="54" y1="196" x2="142" y2="196" stroke={muted} {...draw("1.28s")} />
        <rect x="54" y="214" width="104" height="32" stroke={crimson} {...draw("1.4s")} />

        <rect x="248" y="98" width="336" height="72" stroke={ink} {...draw("1.05s")} />
        <line x1="268" y1="122" x2="430" y2="122" stroke={muted} {...draw("1.28s")} />
        <line x1="268" y1="138" x2="380" y2="138" stroke={muted} {...draw("1.36s")} />
        <rect x="248" y="186" width="336" height="64" stroke={ink} {...draw("1.2s")} />
        <line x1="268" y1="208" x2="456" y2="208" stroke={muted} {...draw("1.42s")} />
        <line x1="268" y1="224" x2="392" y2="224" stroke={muted} {...draw("1.5s")} />

        <line
          x1="228"
          y1="78"
          x2="228"
          y2="268"
          stroke={crimson}
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray="0.2 0.8"
          vectorEffect="non-scaling-stroke"
          className="meridian-travel"
        />

        <text
          x="36"
          y="14"
          fill="#a1a1aa"
          fontSize="10"
          letterSpacing="1.6"
          className="assembly-fade"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace", animationDelay: "0.3s" } satisfies CSSProperties}
        >
          FIG. 01  /  SITE ASSEMBLY
        </text>
        <text
          x="604"
          y="14"
          fill="#a1a1aa"
          fontSize="10"
          letterSpacing="1.6"
          textAnchor="end"
          className="assembly-fade"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace", animationDelay: "0.45s" } satisfies CSSProperties}
        >
          DENVER
        </text>
      </svg>
    </div>
  );
}
