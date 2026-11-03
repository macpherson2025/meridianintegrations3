"use client";

import { consultationHref, consultationLabel } from "@/data/homepage";
import { useContactPanel } from "@/components/site/ContactPanel";
import { isPlainActivation } from "@/components/site/useHomeNavigation";
import type { MouseEvent } from "react";

const desktopPanelQuery = "(min-width: 1024px)";

export function ConsultationLink({
  className,
  onNavigate,
  label = consultationLabel,
}: {
  className: string;
  onNavigate?: () => void;
  label?: string;
}) {
  const panel = useContactPanel();

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();
    if (!panel || !isPlainActivation(event)) return;
    if (!window.matchMedia(desktopPanelQuery).matches) return;
    event.preventDefault();
    panel.openPanel(event.currentTarget);
  }

  return (
    <a href={consultationHref} className={className} onClick={onClick}>
      {label}
    </a>
  );
}
