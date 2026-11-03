"use client";

import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/site/ContactForm";

type ContactPanelContextValue = {
  openPanel: (trigger: HTMLElement) => void;
};

const ContactPanelContext = createContext<ContactPanelContextValue | null>(null);

export function useContactPanel() {
  return useContext(ContactPanelContext);
}

export function ContactPanelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const restoreFocus = useRef(false);
  const titleId = useId();
  const descriptionId = useId();

  function openPanel(trigger: HTMLElement) {
    triggerRef.current = trigger;
    restoreFocus.current = false;
    setOpen(true);
  }

  function closePanel() {
    restoreFocus.current = true;
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      if (restoreFocus.current) {
        restoreFocus.current = false;
        triggerRef.current?.focus();
      }
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <ContactPanelContext.Provider value={{ openPanel }}>
      <div id="review-page" className="flex min-h-svh flex-col" inert={open ? true : undefined}>
        {children}
      </div>
      {open ? (
        <ContactDialog titleId={titleId} descriptionId={descriptionId} onClose={closePanel} />
      ) : null}
    </ContactPanelContext.Provider>
  );
}

function ContactDialog({
  titleId,
  descriptionId,
  onClose,
}: {
  titleId: string;
  descriptionId: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function focusable() {
      if (!dialog) return [];
      return [...dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), textarea, input:not([type='hidden'])")].filter(
        (element) => element.tabIndex !== -1 && !element.hasAttribute("disabled"),
      );
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!dialog?.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div>
      <div className="contact-backdrop fixed inset-0 z-[70] bg-black/70" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="contact-panel fixed inset-y-0 right-0 z-[80] flex w-[420px] max-w-full flex-col border-l border-white/10 bg-brandDark shadow-[-24px_0_60px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5">
          <div>
            <h2 id={titleId} className="text-xl font-bold text-white">
              Request a Free Consultation
            </h2>
            <p id={descriptionId} className="mt-2 text-sm leading-6 text-zinc-300">
              Tell us a little about your business, and let&apos;s explore how Meridian
              Integrations can help.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 shrink-0 items-center px-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5">
          <ContactForm idPrefix="panel" focusOnMount />
        </div>
      </div>
    </div>
  );
}
