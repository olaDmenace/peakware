# Peakware Consulting

Marketing website for [Peakware Consulting](https://peakwareconsulting.co.uk) — a UK
technology consultancy (cloud, data, AI, software, security) and the Peakware
Academy training arm.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (CSS-first tokens in `app/globals.css`)
- **Motion** (animations) + **Lenis** (smooth scrolling)
- **Nodemailer** SMTP (contact-form email — configured for Zoho Mail)
- Fonts via `next/font`: Sora (headings), Inter (body), Geist Mono (labels)
- Icons: self-hosted Lineicons (`app/lineicons.css`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (Turbopack)
npm start        # serve the production build
npx tsc --noEmit # typecheck
npx eslint .     # lint
```

## Project structure

```
app/                Routes (home, services, services/[slug], courses, about,
                    industries, contact), plus sitemap.ts, robots.ts,
                    manifest.ts, icon.png, opengraph-image.png
components/         Header, Footer, Logo, CTA band, motion primitives, JSON-LD
content/            Editable copy as typed data:
                      services.ts  — the 8 service pillars
                      courses.ts   — Peakware Academy catalogue
                      site.ts      — nav, hero, contact details, value props
                      seo.ts       — Organization/WebSite structured data
lib/actions.ts      Contact-form server action (email via Resend)
public/images/      Photography, logo, generated marks
```

Most text changes are edits to the files in `content/` — no component changes needed.

## Environment variables

The contact form emails submissions over SMTP via Nodemailer, configured for
Zoho Mail. Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `SMTP_HOST` | optional | `smtp.zoho.com` (default), or `smtp.zoho.eu` for Zoho EU accounts |
| `SMTP_PORT` | optional | `465` (SSL, default) or `587` (STARTTLS) |
| `SMTP_USER` | for live email | Zoho mailbox address (e.g. `info@peakwareconsulting.co.uk`) |
| `SMTP_PASSWORD` | for live email | A Zoho **app-specific password** (Settings → Security → App Passwords) |
| `CONTACT_TO_EMAIL` | optional | Inbox for requests (default `info@peakwareconsulting.co.uk`) |
| `CONTACT_FROM_EMAIL` | optional | Sender; for Zoho Mail must be the authenticated mailbox (defaults to `SMTP_USER`) |

**Zoho Mail setup:** in Zoho Mail, generate an app-specific password (required
when 2FA is on), then set `SMTP_USER` to your mailbox and `SMTP_PASSWORD` to that
app password. The visitor's address is set as `Reply-To`, so you can reply
straight from the notification. To use **ZeptoMail** (Zoho's transactional
relay) instead, point `SMTP_HOST` at its relay, set `SMTP_USER=emailapikey` and
`SMTP_PASSWORD` to the ZeptoMail SMTP token.

These are **server-only** secrets (read at request time) — they are never sent
to the browser and are **not** baked into the build. If SMTP credentials are
absent, the form still works: submissions are logged server-side instead of
emailed, so missing config never breaks the site.

> Only variables prefixed `NEXT_PUBLIC_` are inlined into the client bundle at
> build time. Never give a secret that prefix.

## Deployment

### Vercel (recommended)

Push to the connected repo, or `vercel --prod`. Add the environment variables in
**Project → Settings → Environment Variables**, then redeploy.

### Self-hosting

Build once, then run the Node server:

```bash
npm ci
npm run build
npm start            # listens on PORT (default 3000); put Nginx/Caddy in front
```

**Adding environment variables without breaking it.** Next.js loads env files in
this order (highest priority first): real shell/OS env → `.env.production.local`
→ `.env.local` → `.env.production` → `.env`. Pick one approach:

- **Env file on the server:** create `.env.production.local` in the project root
  (git-ignored) with the keys above.
- **Process environment (preferred for secrets):**
  - **systemd:** `EnvironmentFile=/path/to/peakware/.env.production.local`
  - **PM2:** set them under `env` in `ecosystem.config.js`
  - **Docker:** `docker run --env-file .env.production.local …` (or `environment:` in compose)
  - **Coolify / Dokku / Railway / Render:** paste them into the platform's env panel

**The one rule:** after changing any variable, **restart the Node process**
(`npm start` / your PM2 / systemd service / container). Server-side variables are
read at process startup, not hot-reloaded. A `NEXT_PUBLIC_*` change additionally
requires a **rebuild** (`npm run build`), since it is compiled into the client
bundle.

## SEO

Per-page metadata, canonical URLs, Open Graph + Twitter cards, a generated social
share image (`app/opengraph-image.png`), a PWA manifest, `sitemap.xml`,
`robots.txt`, and JSON-LD structured data (Organization, WebSite, Service,
EducationalOrganization + course ItemList) are all built in. After deploying,
submit `https://peakwareconsulting.co.uk/sitemap.xml` in Google Search Console.
