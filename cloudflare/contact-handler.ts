export const contactRecipient = "info@meridianintegrations.com";

const defaultFrom = "Meridian Integrations <website@meridianintegrations.com>";
const maxBodyBytes = 20_000;
const minHumanMs = 400;
const maxAgeMs = 14 * 24 * 60 * 60 * 1000;
const clockSkewMs = 5 * 60 * 1000;
const defaultWindowMs = 10 * 60 * 1000;
const defaultFloodLimit = 30;
const defaultSendLimit = 5;
const resendUrl = "https://api.resend.com/emails";

const defaultOrigins = [
  "https://meridianintegrations.com",
  "https://www.meridianintegrations.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export const fieldMessages = {
  name: "Enter your name.",
  email: "Enter a valid email address.",
  message: "Enter a message.",
} as const;

const deliveryError =
  "We couldn't send your message. Your draft is still here. You can try again, or email info@meridianintegrations.com.";

export type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  ALLOWED_ORIGINS?: string;
};

type RateBucket = { flood: number[]; send: number[] };

export type ContactDeps = {
  now?: () => number;
  fetchImpl?: typeof fetch;
  floodLimit?: number;
  sendLimit?: number;
  windowMs?: number;
  store?: Map<string, RateBucket>;
};

type FieldName = keyof typeof fieldMessages;
type FieldErrors = Partial<Record<FieldName, string>>;
type Submission = { name: string; email: string; message: string };

const sharedStore = new Map<string, RateBucket>();

export async function handleContactRequest(
  request: Request,
  env: ContactEnv = {},
  deps: ContactDeps = {},
): Promise<Response> {
  const now = deps.now ?? Date.now;
  const allowed = allowedOrigins(env);
  const origin = requestOrigin(request);
  const headers = corsHeaders(origin, allowed);

  if (origin && !allowed.has(origin)) {
    return finish(
      request,
      403,
      { ok: false, code: "bad_origin", error: deliveryError },
      headers,
    );
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: baseHeaders(headers) });
  }

  if (request.method !== "POST") {
    headers.set("allow", "POST, OPTIONS");
    return finish(
      request,
      405,
      { ok: false, code: "method", error: deliveryError },
      headers,
    );
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBodyBytes) {
    return finish(
      request,
      413,
      { ok: false, code: "too_large", error: "That message is too large to send." },
      headers,
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/x-www-form-urlencoded")) {
    return finish(
      request,
      415,
      { ok: false, code: "unsupported", error: deliveryError },
      headers,
    );
  }

  const rawBody = await request.text();
  if (rawBody.length > maxBodyBytes) {
    return finish(
      request,
      413,
      { ok: false, code: "too_large", error: "That message is too large to send." },
      headers,
    );
  }

  const current = now();
  const client = clientKey(request);
  const store = deps.store ?? sharedStore;
  const windowMs = deps.windowMs ?? defaultWindowMs;
  if (
    !consume(store, client, "flood", deps.floodLimit ?? defaultFloodLimit, windowMs, current)
  ) {
    return finish(
      request,
      429,
      {
        ok: false,
        code: "rate_limited",
        error:
          "Too many messages were sent from this network. Please wait a few minutes, or email info@meridianintegrations.com.",
      },
      headers,
    );
  }

  const params = new URLSearchParams(rawBody);
  const trap = (params.get("company_fax") || "").trim();
  if (trap) {
    return success(request, headers);
  }

  const started = Number((params.get("form_started") || "").trim());
  if ((params.get("form_started") || "").trim()) {
    if (!Number.isFinite(started)) return success(request, headers);
    const age = current - started;
    if (started > current + clockSkewMs || age > maxAgeMs) {
      return invalidPage(request, headers, 400, {
        ok: false,
        code: "stale",
        error: "This form expired. Your draft is still here. Send it again.",
        fields: {},
        values: valuesFrom(params),
        now: current,
      });
    }
    if (age >= 0 && age < minHumanMs) return success(request, headers);
  }

  const values = valuesFrom(params);
  const fields = validate(values);
  if (Object.keys(fields).length > 0) {
    return invalidPage(request, headers, 400, {
      ok: false,
      code: "invalid",
      error: "Check the highlighted fields.",
      fields,
      values,
      now: current,
    });
  }

  if (
    !consume(store, client, "send", deps.sendLimit ?? defaultSendLimit, windowMs, current)
  ) {
    return invalidPage(request, headers, 429, {
      ok: false,
      code: "rate_limited",
      error:
        "Too many messages were sent from this network. Please wait a few minutes, or email info@meridianintegrations.com.",
      fields: {},
      values,
      now: current,
    });
  }

  const apiKey = env.RESEND_API_KEY?.trim();
  const to = resolveRecipient(env.CONTACT_TO);
  const from = resolveFrom(env.CONTACT_FROM);
  if (!apiKey || !to || !from) {
    console.info(JSON.stringify({ source: "contact", result: "not_configured" }));
    return invalidPage(request, headers, 503, {
      ok: false,
      code: "not_configured",
      error: deliveryError,
      fields: {},
      values,
      now: current,
    });
  }

  const fetchImpl = deps.fetchImpl ?? fetch;
  let delivered = false;
  try {
    const mail = await fetchImpl(resendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "MeridianIntegrations/1.0",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Free Consultation Request from ${values.name.replace(/[\r\n]+/g, " ")}`,
        text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
    });
    delivered = mail.ok;
    if (!delivered) {
      console.info(
        JSON.stringify({ source: "contact", result: "delivery_failed", status: mail.status }),
      );
    }
  } catch {
    console.info(JSON.stringify({ source: "contact", result: "delivery_error" }));
  }

  if (!delivered) {
    return invalidPage(request, headers, 502, {
      ok: false,
      code: "delivery_failed",
      error: deliveryError,
      fields: {},
      values,
      now: current,
    });
  }

  console.info(JSON.stringify({ source: "contact", result: "accepted" }));
  return success(request, headers);
}

function valuesFrom(params: URLSearchParams): Submission {
  return {
    name: (params.get("name") || "").trim(),
    email: (params.get("email") || "").trim(),
    message: (params.get("message") || "").trim(),
  };
}

function validate(values: Submission): FieldErrors {
  const fields: FieldErrors = {};
  if (!values.name || values.name.length > 100 || hasUnsafeControl(values.name)) {
    fields.name = fieldMessages.name;
  }
  if (!isEmail(values.email)) fields.email = fieldMessages.email;
  if (!values.message || values.message.length > 4000 || hasUnsafeControl(values.message)) {
    fields.message = fieldMessages.message;
  }
  return fields;
}

function isEmail(value: string): boolean {
  return (
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
    !hasUnsafeControl(value)
  );
}

function hasUnsafeControl(value: string): boolean {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value);
}

function resolveRecipient(value: string | undefined): string | null {
  const recipient = value?.trim() || contactRecipient;
  return isEmail(recipient) ? recipient : null;
}

function resolveFrom(value: string | undefined): string | null {
  const from = value?.trim() || defaultFrom;
  if (from.length > 200) return null;
  const match = from.match(/<([^>]+)>\s*$/);
  const email = (match ? match[1] : from).trim();
  return isEmail(email) ? from : null;
}

function allowedOrigins(env: ContactEnv): Set<string> {
  const extras = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return new Set([...defaultOrigins, ...extras]);
}

function requestOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const referer = request.headers.get("referer");
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

function clientKey(request: Request): string {
  return request.headers.get("cf-connecting-ip")?.trim() || "unknown";
}

function consume(
  store: Map<string, RateBucket>,
  key: string,
  kind: keyof RateBucket,
  limit: number,
  windowMs: number,
  now: number,
): boolean {
  const entry = store.get(key) ?? { flood: [], send: [] };
  const recent = entry[kind].filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    entry[kind] = recent;
    store.set(key, entry);
    return false;
  }
  recent.push(now);
  entry[kind] = recent;
  store.set(key, entry);
  return true;
}

function corsHeaders(origin: string | null, allowed: Set<string>): Headers {
  const headers = new Headers();
  if (origin && allowed.has(origin)) {
    headers.set("access-control-allow-origin", origin);
    headers.set("vary", "Origin");
    headers.set("access-control-allow-methods", "POST, OPTIONS");
    headers.set("access-control-allow-headers", "Content-Type, Accept");
  }
  return headers;
}

function baseHeaders(headers: Headers): Headers {
  const next = new Headers(headers);
  next.set("cache-control", "no-store");
  next.set("x-content-type-options", "nosniff");
  return next;
}

function wantsJson(request: Request): boolean {
  return (request.headers.get("accept") || "").includes("application/json");
}

function finish(
  request: Request,
  status: number,
  payload: { ok: false; code: string; error: string },
  headers: Headers,
): Response {
  if (wantsJson(request)) {
    const responseHeaders = baseHeaders(headers);
    responseHeaders.set("content-type", "application/json; charset=utf-8");
    return new Response(JSON.stringify(payload), { status, headers: responseHeaders });
  }
  return htmlResponse(
    status,
    "Contact Meridian Integrations",
    `<h1>Message not sent</h1><p>${escapeHtml(payload.error)}</p><p><a href="/contact">Back to the contact form</a></p>`,
    headers,
  );
}

function success(request: Request, headers: Headers): Response {
  if (wantsJson(request)) {
    const responseHeaders = baseHeaders(headers);
    responseHeaders.set("content-type", "application/json; charset=utf-8");
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: responseHeaders });
  }
  return htmlResponse(
    200,
    "Message sent",
    `<h1>Your message has been sent.</h1>
     <p>Thanks for telling us about your business.</p>
     <p><a href="mailto:${contactRecipient}">${contactRecipient}</a></p>
     <p><a href="/contact">Send another message</a></p>`,
    headers,
  );
}

function invalidPage(
  request: Request,
  headers: Headers,
  status: number,
  payload: {
    ok: false;
    code: string;
    error: string;
    fields: FieldErrors;
    values: Submission;
    now: number;
  },
): Response {
  if (wantsJson(request)) {
    const responseHeaders = baseHeaders(headers);
    responseHeaders.set("content-type", "application/json; charset=utf-8");
    return new Response(
      JSON.stringify({
        ok: false,
        code: payload.code,
        error: payload.error,
        fields: payload.fields,
      }),
      { status, headers: responseHeaders },
    );
  }

  const action = new URL(request.url).pathname || "/api/contact";
  const started = String(payload.now - 5_000);
  const field = (name: FieldName, label: string, control: string) => {
    const error = payload.fields[name];
    return `<label for="fallback-${name}">${label}</label>
      ${error ? `<p id="fallback-${name}-error" class="error">${escapeHtml(error)}</p>` : ""}
      ${control}`;
  };

  return htmlResponse(
    status,
    "Contact Meridian Integrations",
    `<h1>Message not sent</h1>
     <p class="error">${escapeHtml(payload.error)}</p>
     <form method="post" action="${escapeHtml(action)}">
       <input type="hidden" name="form_started" value="${started}">
       <div class="trap" aria-hidden="true">
         <label for="fallback-company">Company fax</label>
         <input id="fallback-company" name="company_fax" tabindex="-1" autocomplete="off" value="">
       </div>
       ${field("name", "Name", `<input id="fallback-name" name="name" required maxlength="100" autocomplete="name" value="${escapeHtml(payload.values.name)}" ${payload.fields.name ? 'aria-invalid="true" aria-describedby="fallback-name-error"' : ""}>`)}
       ${field("email", "Email", `<input id="fallback-email" name="email" type="email" required maxlength="254" autocomplete="email" value="${escapeHtml(payload.values.email)}" ${payload.fields.email ? 'aria-invalid="true" aria-describedby="fallback-email-error"' : ""}>`)}
       ${field("message", "Message", `<textarea id="fallback-message" name="message" required maxlength="4000" rows="8" ${payload.fields.message ? 'aria-invalid="true" aria-describedby="fallback-message-error"' : ""}>${escapeHtml(payload.values.message)}</textarea>`)}
       <button type="submit">Send Message</button>
     </form>
     <p><a href="mailto:${contactRecipient}">${contactRecipient}</a></p>`,
    headers,
  );
}

function htmlResponse(status: number, title: string, body: string, headers: Headers): Response {
  const responseHeaders = baseHeaders(headers);
  responseHeaders.set("content-type", "text/html; charset=utf-8");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${escapeHtml(title)}</title>
  <style>
    body { margin: 0; background: #0a0a0a; color: #f4f4f5; font-family: system-ui, sans-serif; }
    main { max-width: 32rem; margin: 0 auto; padding: 3rem 1.25rem; }
    a { color: #fff; }
    .error { color: #f03028; }
    label { display: block; font-weight: 700; margin-top: 1rem; }
    input, textarea { width: 100%; box-sizing: border-box; margin-top: 0.4rem; background: #0a0a0a; color: #fff; border: 1px solid rgba(255,255,255,0.15); padding: 0.75rem; font: inherit; }
    button { margin-top: 1.25rem; background: #dc2626; color: #fff; border: 0; font-weight: 700; min-height: 2.75rem; padding: 0 1.25rem; }
    .trap { position: absolute; left: -9999px; height: 0; overflow: hidden; }
  </style>
</head>
<body>
  <main>${body}</main>
</body>
</html>`;
  return new Response(html, { status, headers: responseHeaders });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
