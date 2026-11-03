"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { contactEmail, contactEndpoint } from "@/data/homepage";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-2 w-full border border-white/15 bg-brandDark px-3 py-3 text-base text-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function ContactForm({
  idPrefix,
  focusOnMount = false,
}: {
  idPrefix: string;
  focusOnMount?: boolean;
}) {
  const reactId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formKey, setFormKey] = useState(0);
  const successRef = useRef<HTMLDivElement>(null);
  const errorId = `${idPrefix}-form-error`;
  const statusId = `${idPrefix}-status-${reactId}`;

  useEffect(() => {
    const started = document.getElementById(`${idPrefix}-started`);
    if (started instanceof HTMLInputElement && !started.value) {
      started.value = String(Date.now());
    }
    if (!focusOnMount) return;
    const name = document.getElementById(`${idPrefix}-name`);
    if (name instanceof HTMLInputElement) name.focus();
  }, [focusOnMount, idPrefix, formKey]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    event.preventDefault();
    setStatus("submitting");
    setFormError("");
    setFieldErrors({});

    const params = new URLSearchParams();
    for (const [key, value] of new FormData(form)) {
      params.set(key, String(value));
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fields?: FieldErrors;
      } | null;

      if (response.ok && payload?.ok) {
        setStatus("success");
        return;
      }

      setFieldErrors(payload?.fields ?? {});
      setFormError(
        payload?.error ||
          `We couldn't send your message. Your draft is still here. You can try again, or email ${contactEmail}.`,
      );
      setStatus("error");
    } catch {
      setFormError(
        `We couldn't send your message. Your draft is still here. You can try again, or email ${contactEmail}.`,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} role="status" aria-live="polite" id={statusId} tabIndex={-1} className="focus:outline-none">
        <h2 className="text-2xl font-bold text-white">Your message has been sent.</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Thanks for telling us about your business.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex min-h-11 items-center justify-center border border-white/15 px-5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => {
            setStatus("idle");
            setFormKey((current) => current + 1);
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      key={formKey}
      action={contactEndpoint}
      method="post"
      onSubmit={onSubmit}
      aria-busy={status === "submitting" ? true : undefined}
    >
      <input type="hidden" id={`${idPrefix}-started`} name="form_started" defaultValue="" />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var el=document.getElementById(${JSON.stringify(`${idPrefix}-started`)});if(el&&!el.value)el.value=String(Date.now());})();`,
        }}
      />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${idPrefix}-company`}>Company fax</label>
        <input
          id={`${idPrefix}-company`}
          name="company_fax"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {formError ? (
        <p id={errorId} role="alert" className="mb-4 text-sm leading-6 text-brandRedInk">
          {formError}
        </p>
      ) : null}

      <Field
        id={`${idPrefix}-name`}
        label="Name"
        name="name"
        autoComplete="name"
        maxLength={100}
        error={fieldErrors.name}
        describedBy={formError ? errorId : undefined}
      />
      <Field
        id={`${idPrefix}-email`}
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        maxLength={254}
        error={fieldErrors.email}
      />
      <div className="mt-4">
        <label htmlFor={`${idPrefix}-message`} className="text-sm font-semibold text-white">
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          maxLength={4000}
          rows={7}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? `${idPrefix}-message-error` : undefined}
          className={`${inputClass} min-h-36 resize-y`}
        />
        {fieldErrors.message ? (
          <p id={`${idPrefix}-message-error`} className="mt-2 text-sm text-brandRedInk">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-brandRed px-6 text-sm font-bold text-white transition-colors hover:bg-brandRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
      <p className="mt-4 text-sm leading-6 text-zinc-400">
        Or email{" "}
        <a
          href={`mailto:${contactEmail}`}
          className="font-bold text-white underline decoration-brandRed decoration-2 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {contactEmail}
        </a>
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  maxLength,
  error,
  describedBy,
}: {
  id: string;
  label: string;
  name: FieldName;
  type?: string;
  autoComplete: string;
  maxLength: number;
  error?: string;
  describedBy?: string;
}) {
  const errorId = `${id}-error`;
  const described = [error ? errorId : "", describedBy || ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className="mt-4">
      <label htmlFor={id} className="text-sm font-semibold text-white">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={described}
        className={inputClass}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-brandRedInk">
          {error}
        </p>
      ) : null}
    </div>
  );
}
