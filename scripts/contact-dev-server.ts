import { createServer } from "node:http";
import { handleContactRequest } from "../cloudflare/contact-handler.ts";

const realFetch = globalThis.fetch.bind(globalThis);

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (url.startsWith("https://api.resend.com/")) {
    console.info("Local contact server intercepted Resend and did not send email.");
    return new Response(JSON.stringify({ id: "local-test" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
  return realFetch(input, init);
}) as typeof fetch;

const port = Number(process.env.CONTACT_DEV_PORT || 8787);

const server = createServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const body = Buffer.concat(chunks);
  const host = req.headers.host || `127.0.0.1:${port}`;
  const request = new Request(`http://${host}${req.url}`, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
  });
  const response = await handleContactRequest(request, {
    RESEND_API_KEY: "local-test-key",
    CONTACT_TO: "info@meridianintegrations.com",
    CONTACT_FROM: "Meridian Integrations <website@meridianintegrations.com>",
  });
  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  res.end(Buffer.from(await response.arrayBuffer()));
});

server.listen(port, "127.0.0.1", () => {
  console.info(`Contact dev server listening on http://127.0.0.1:${port}/api/contact`);
  console.info("Resend is mocked. This process does not deliver email.");
});
