"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { contactPagePath } from "@/data/homepage";
import { siteNavGroups, siteNavLinks } from "@/data/site-navigation";

const menuLinkClass =
  "inline-flex min-h-11 w-full items-center px-1 text-sm font-medium text-zinc-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const toggleClass =
  "inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const MENU_WIDTH_PX = 320; // 20rem
const VIEWPORT_PAD_PX = 20; // 1.25rem each side → calc(100vw - 2.5rem)

type SiteHamburgerMenuProps = {
  className?: string;
};

export function SiteHamburgerMenu({ className = "" }: SiteHamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const [headerEl, setHeaderEl] = useState<HTMLElement | null>(null);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const syncPanelPosition = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    const width = Math.min(MENU_WIDTH_PX, window.innerWidth - VIEWPORT_PAD_PX * 2);

    const cta = root.parentElement?.querySelector<HTMLElement>(
      `a[href="${contactPagePath}"]`,
    );
    const ctaVisible =
      !!cta && window.getComputedStyle(cta).display !== "none";

    let viewportLeft: number;

    if (ctaVisible && cta) {
      // Desktop: align dropdown left edge with the CTA left edge.
      viewportLeft = cta.getBoundingClientRect().left;
    } else {
      // Mobile / narrow: keep right-aligned to the toggle, then clamp.
      viewportLeft = rootRect.right - width;
    }

    const maxLeft = window.innerWidth - VIEWPORT_PAD_PX - width;
    viewportLeft = Math.min(Math.max(viewportLeft, VIEWPORT_PAD_PX), maxLeft);

    setPanelStyle({
      left: `${viewportLeft - rootRect.left}px`,
      right: "auto",
      width: `${width}px`,
    });
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setHeaderEl(null);
  }, []);

  const openMenu = useCallback(() => {
    setHeaderEl(rootRef.current?.closest("header") ?? null);
    setOpen(true);
  }, []);

  const closeAndRestoreFocus = useCallback(() => {
    closeMenu();
    toggleRef.current?.focus();
  }, [closeMenu]);

  const toggleMenu = useCallback(() => {
    if (open) {
      closeMenu();
      return;
    }
    openMenu();
  }, [closeMenu, open, openMenu]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndRestoreFocus();
      }
    }

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node | null;
      if (!target || !rootRef.current?.contains(target)) {
        closeMenu();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, closeAndRestoreFocus, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    let frame = requestAnimationFrame(() => {
      syncPanelPosition();
    });

    function onReposition() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        syncPanelPosition();
      });
    }

    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open, syncPanelPosition]);

  function onToggleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" && !open) {
      event.preventDefault();
      openMenu();
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {open && headerEl
        ? createPortal(
            <div
              aria-hidden="true"
              className="contact-backdrop absolute inset-x-0 top-full z-40 min-h-screen bg-black/45"
              onClick={closeMenu}
            />,
            headerEl,
          )
        : null}

      <button
        ref={toggleRef}
        type="button"
        className={toggleClass}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggleMenu}
        onKeyDown={onToggleKeyDown}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="flex flex-col gap-1.5" aria-hidden="true">
          <span
            className={`block h-px w-5 bg-white transition-transform duration-200 ease-out ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-white transition-opacity duration-200 ease-out ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-px w-5 bg-brandRed transition-transform duration-200 ease-out ${
              open ? "-translate-y-[7px] -rotate-45 bg-white" : ""
            }`}
          />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        style={open ? panelStyle : undefined}
        className={`absolute right-0 z-50 mt-3 w-[min(20rem,calc(100vw-2.5rem))] origin-top-right border border-white/10 bg-brandDark/80 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="h-0.5 bg-brandRed" aria-hidden="true" />
        <nav className="flex flex-col px-4 py-4" aria-label="Site">
          {siteNavGroups.map((group) => (
            <div key={group.label} className="mb-3 border-b border-white/10 pb-3">
              <p className="px-1 text-xs font-semibold tracking-[0.22em] text-brandRedInk">
                {group.label.toUpperCase()}
              </p>
              <ul className="mt-2 flex flex-col">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={menuLinkClass}
                      tabIndex={open ? undefined : -1}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <ul className="flex flex-col">
            {siteNavLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={menuLinkClass}
                  tabIndex={open ? undefined : -1}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
