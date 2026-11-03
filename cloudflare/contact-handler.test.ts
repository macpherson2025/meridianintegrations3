import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { handleContactRequest } from "./contact-handler.ts";

const now = 1_700_000_000_000;

function requestFor(
  body: Record<string, string>,
  init: { accept?: string; origin?: string; ip?: string; method?: string; contentType?: string } = {},
) {
  const params = new URLSearchParams(body);
  const headers = new Headers({
    "content-type": init.contentType ?? "application/x-www-form-urlencoded",
    accept: init.accept ?? "application/json",
  });
  if (init.origin) headers.set("origin", init.origin);
  if (init.ip) headers.set("cf-connecting-ip", init.ip);
  return new Request("https://meridianintegrations.com/api/contact", {
    method: init.method ?? "POST",
    headers,
    body: init.method === "GET" ? undefined : params,
  });
}

function validBody(age = 5_000) {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "We need a new website.",
    company_fax: "",
    form_started: String(now - age),
  };
}

describe("contact handler", () => {
  it("rejects non-POST requests", async () => {
    const response = await handleContactRequest(requestFor({}, { method: "GET" }), {}, { now: () => now });
    assert.equal(response.status, 405);
  });

  it("returns field errors and preserves values in HTML", async () => {
    const response = await handleContactRequest(
      requestFor(
        { name: '<script>alert("x")</script>', email: "not-an-email", message: "" },
        { accept: "text/html", ip: "203.0.113.10" },
      ),
      {},
      { now: () => now, store: new Map() },
    );
    const html = await response.text();
    assert.equal(response.status, 400);
    assert.equal(html.includes("<script>alert"), false);
    assert.equal(html.includes("&lt;script&gt;"), true);
    assert.equal(html.includes("not-an-email"), true);
    assert.equal(html.includes('method="post"'), true);
    assert.equal(html.includes('action="/api/contact"'), true);
  });

  it("does not send when email delivery is not configured", async () => {
    let called = false;
    const response = await handleContactRequest(
      requestFor(validBody(), { ip: "203.0.113.11" }),
      {},
      {
        now: () => now,
        store: new Map(),
        fetchImpl: async () => {
          called = true;
          return new Response("nope");
        },
      },
    );
    const payload = await response.json();
    assert.equal(response.status, 503);
    assert.equal(payload.code, "not_configured");
    assert.equal(called, false);
    assert.equal(JSON.stringify(payload).includes("re_"), false);
  });

  it("sends through Resend without exposing the API key", async () => {
    let captured: { url: string; init: RequestInit } | null = null;
    const response = await handleContactRequest(
      requestFor(validBody(), { origin: "https://meridianintegrations.com", ip: "203.0.113.12" }),
      {
        RESEND_API_KEY: "re_test_secret",
        CONTACT_TO: "info@meridianintegrations.com",
        CONTACT_FROM: "Meridian Integrations <website@meridianintegrations.com>",
      },
      {
        now: () => now,
        store: new Map(),
        fetchImpl: async (input, init) => {
          captured = { url: String(input), init: init ?? {} };
          return new Response(JSON.stringify({ id: "email_123" }), { status: 200 });
        },
      },
    );
    const payload = await response.json();
    assert.equal(response.status, 200);
    assert.equal(payload.ok, true);
    assert.equal(captured?.url, "https://api.resend.com/emails");
    const headers = captured?.init.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer re_test_secret");
    assert.equal(headers["User-Agent"], "MeridianIntegrations/1.0");
    const body = JSON.parse(String(captured?.init.body));
    assert.deepEqual(body.to, ["info@meridianintegrations.com"]);
    assert.equal(body.reply_to, "ada@example.com");
    assert.equal(body.subject.includes("Ada Lovelace"), true);
    assert.equal(JSON.stringify(payload).includes("re_test_secret"), false);
  });

  it("accepts a honeypot submission without sending mail", async () => {
    let called = false;
    const response = await handleContactRequest(
      requestFor({ ...validBody(), company_fax: "https://spam.example" }, { ip: "203.0.113.13" }),
      { RESEND_API_KEY: "re_test_secret" },
      {
        now: () => now,
        store: new Map(),
        fetchImpl: async () => {
          called = true;
          return new Response("sent", { status: 200 });
        },
      },
    );
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(called, false);
  });

  it("drops an instant scripted submission without sending mail", async () => {
    let called = false;
    const response = await handleContactRequest(
      requestFor(validBody(100), { ip: "203.0.113.14" }),
      { RESEND_API_KEY: "re_test_secret" },
      {
        now: () => now,
        store: new Map(),
        fetchImpl: async () => {
          called = true;
          return new Response("sent", { status: 200 });
        },
      },
    );
    assert.equal(response.status, 200);
    assert.equal(called, false);
  });

  it("rejects an oversized body before delivery", async () => {
    const response = await handleContactRequest(
      new Request("https://meridianintegrations.com/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "content-length": "20001",
          accept: "application/json",
          "cf-connecting-ip": "203.0.113.15",
        },
        body: "name=Ada",
      }),
      { RESEND_API_KEY: "re_test_secret" },
      { now: () => now, store: new Map() },
    );
    assert.equal(response.status, 413);
  });

  it("rate limits repeated valid submissions", async () => {
    const store = new Map();
    const deps = {
      now: () => now,
      store,
      sendLimit: 1,
      fetchImpl: async () => new Response(JSON.stringify({ id: "email_1" }), { status: 200 }),
    };
    const env = { RESEND_API_KEY: "re_test_secret" };
    const first = await handleContactRequest(requestFor(validBody(), { ip: "203.0.113.16" }), env, deps);
    const second = await handleContactRequest(requestFor(validBody(), { ip: "203.0.113.16" }), env, deps);
    assert.equal(first.status, 200);
    assert.equal(second.status, 429);
  });

  it("rejects a foreign origin", async () => {
    const response = await handleContactRequest(
      requestFor(validBody(), { origin: "https://evil.example", ip: "203.0.113.17" }),
      { RESEND_API_KEY: "re_test_secret" },
      { now: () => now, store: new Map() },
    );
    assert.equal(response.status, 403);
  });

  it("keeps a failed delivery response free of the submitted secret-looking text", async () => {
    const response = await handleContactRequest(
      requestFor(
        { ...validBody(), message: "The key is re_should_not_echo" },
        { ip: "203.0.113.18" },
      ),
      { RESEND_API_KEY: "re_test_secret" },
      {
        now: () => now,
        store: new Map(),
        fetchImpl: async () => new Response("no", { status: 401 }),
      },
    );
    const text = await response.text();
    assert.equal(response.status, 502);
    assert.equal(text.includes("re_test_secret"), false);
  });
});
