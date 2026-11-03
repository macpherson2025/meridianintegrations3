# Contact form

The site is a Next.js static export (`output: "export"`). It has no Node server and no Next.js API route in production. The contact form posts to a Cloudflare Pages Function that lives beside the exported site.

`/` stays the public Coming Soon page. `/home` stays the review homepage. `/contact` is the normal contact page and is included in the static export.

## What the browser does

Every consultation button is a real link to `/contact`.

- At 1024px and wider, an unmodified click opens a 420px panel from the right. The panel does not open on page load.
- Below 1024px, the same link goes to `/contact`.
- Without JavaScript, every button goes to `/contact`.
- Modified clicks (new tab, for example) keep the normal link behavior.

Both the panel and `/contact` render the same form: `method="post"` and `action="/api/contact"` unless `NEXT_PUBLIC_CONTACT_ENDPOINT` is set at build time. Name, email, and message are required. JavaScript shows loading, success, and error states without clearing the fields after a failure. With JavaScript disabled, the browser posts the form and the Pages Function returns a full HTML page. An error page includes the entered values and a form that can be submitted again.

## Pages Function

`functions/api/contact.ts` handles `/api/contact`. The processing code is in `cloudflare/contact-handler.ts`, outside `functions`, so Cloudflare does not treat it as its own route.

The function:

- Accepts `POST` bodies of type `application/x-www-form-urlencoded`, up to 20 KB.
- Validates name, email, and message on the server.
- Rejects requests whose `Origin` or `Referer` is outside the allow list.
- Hides a honeypot field named `company_fax`. A filled honeypot returns the success page and does not send mail.
- Drops submissions that arrive less than 400ms after the form timestamp. A missing timestamp is allowed so the form still works if that script does not run.
- Limits each `CF-Connecting-IP` to 30 requests and 5 deliverable messages per 10 minutes. This counter lives in the Worker isolate, so it is a basic control rather than a global firewall.
- Sends mail only when `RESEND_API_KEY` is set. Otherwise it returns HTTP 503 and keeps the draft. It never reports success for mail that was not accepted by Resend.

The recipient is `info@meridianintegrations.com` unless `CONTACT_TO` overrides it. `reply_to` is the address the visitor entered. The API key is read from the Worker environment and is not included in client code or in the JSON response.

## Environment

Set these in the Cloudflare Pages project. Do not prefix them with `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for delivery | Resend API key. Mail is not sent when this is absent. |
| `CONTACT_FROM` | Yes, for delivery | Verified sender, for example `Meridian Integrations <website@meridianintegrations.com>`. |
| `CONTACT_TO` | No | Recipient. Defaults to `info@meridianintegrations.com`. |
| `ALLOWED_ORIGINS` | No | Extra origins, comma-separated. Matching is exact: scheme, host, and port only. No wildcards, paths, or trailing slashes. `https://meridianintegrations.com`, `https://www.meridianintegrations.com`, `http://localhost:3000`, and `http://127.0.0.1:3000` are already allowed. |

Set this only at **build** time if the form should post somewhere other than `/api/contact`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Form `action`. Use a path or absolute URL. This value is public. Do not put an API key in it. |

Resend must have the sender domain verified. The function sends `User-Agent: MeridianIntegrations/1.0` because Resend rejects requests that omit a user agent. No email has been delivered from this project until a real key and a verified domain are in place and a production submission is checked in the inbox.

## Deploy

Use a Git-connected Cloudflare Pages project or Wrangler. Dashboard drag-and-drop of the `out` folder does not compile `functions`.

1. Production branch and build command: `npm run build` (or `npx next build`).
2. Build output directory: `out`.
3. Project root: the repository root, so `functions/` is beside `out/` and not inside it.
4. Add the environment variables above to Production.
5. Deploy with the Git integration, or from the repository root run `npx wrangler pages deploy out` when you are ready. That command uploads `functions` if it is present in the working directory.
6. Submit one real message and confirm it arrives at `info@meridianintegrations.com`.

Do not deploy this branch as the public site until that check is done. `/` remains Coming Soon. `/home` remains the review page and is disallowed in `robots.txt`. `/contact` is exported and reachable, and it is intentionally absent from `sitemap.xml` while the public homepage is still Coming Soon.

## Local checks

`npm run dev` serves the pages only. `POST /api/contact` returns a Next 404 there, and the form stays on the page with the entered text and an error. That is the expected local failure.

Handler tests, with no network and no API key:

```bash
npm run test:contact
```

To exercise the success state in a browser without sending mail, start the mock server and point a dev build at it:

```bash
node --experimental-strip-types scripts/contact-dev-server.ts
NEXT_PUBLIC_CONTACT_ENDPOINT=http://127.0.0.1:8787/api/contact npm run dev
```

The mock server intercepts Resend and does not deliver email. Stop it before using a real key.

A Pages preview form posts to that preview host. The browser sends that host as `Origin`, and the function rejects it until the Preview environment has the exact origin. After the preview exists, set this on Preview only, using the project name from the Pages dashboard:

```text
ALLOWED_ORIGINS=https://feature-full-website.<PROJECT>.pages.dev
```

Cloudflare turns the slash in `feature/full-website` into a hyphen for the branch alias. If the page is opened at the unique deployment URL instead, add that origin too, with no path or trailing slash:

```text
ALLOWED_ORIGINS=https://feature-full-website.<PROJECT>.pages.dev,https://<deployment-id>.<PROJECT>.pages.dev
```

Leave `NEXT_PUBLIC_CONTACT_ENDPOINT` unset so the form keeps posting to `/api/contact` on the same host. Do not put the preview origin in the Production environment.
