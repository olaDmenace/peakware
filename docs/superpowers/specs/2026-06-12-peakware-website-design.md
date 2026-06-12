# Peakware Consulting Website — Design Spec

**Date:** 2026-06-12
**Status:** Approved by user (structure, theme, contact approach, palette source)

## Purpose

Marketing website for Peakware Consulting (peakwareconsulting.co.uk), a UK
technology consultancy with eight service pillars: Cloud & Data Management,
Infrastructure & Virtualization, Agentic AI, Machine Learning, Custom Software
Development, Cybersecurity, Analytics, Training & Enablement.

All copy comes from `peakware-website-content.docx` (extracted; British
English). The site must read "senior consultancy", not "startup template":
responsive, mature motion design, refined typography, smooth scrolling.

## Decisions (user-approved)

1. **Structure: full multi-page.** Nav: Home | Services | About | Industries | Contact.
   Services index plus 8 statically generated detail pages.
2. **Theme: dark premium tech.** Near-black base, light text, single accent.
3. **Contact: form with server-action stub.** No external service at launch;
   ready to wire to Resend/CRM later.
4. **Palette accents from peakwaregroup.com:** primary accent orange
   `#F4830B` (their `--primary`), supporting navy `#1F3D7E`, ink `#101828`,
   cream `#FEF9F3` influence for light text.

## Tech stack

- Next.js 16.2.9 App Router (existing scaffold). **Read
  `node_modules/next/dist/docs/` before writing code — this version has
  breaking changes (per AGENTS.md).**
- Tailwind CSS v4 (CSS-first tokens via `@theme` in `globals.css`).
- `motion` (Framer Motion successor) for animations; `lenis` for smooth
  scrolling. Chosen over GSAP (overkill, imperative) and CSS scroll-driven
  animations (uneven support).
- Fonts via `next/font`: Instrument Sans (display + body), Geist Mono
  (eyebrows, section numbers, technical labels).

## Design system

- **Colour:** base ink `#0A0D14` (navy-tinted near-black, derived from brand
  navy), surfaces slightly lighter, 1px borders at low opacity. Text:
  cream-tinted off-white. Accent orange `#F4830B` used sparingly: CTAs, active
  states, key highlights, occasional glow. Navy `#1F3D7E` for deep gradients
  and atmospheric backgrounds. No multi-colour gradients.
- **Type scale:** large confident display sizes with tight tracking; mono
  eyebrows like `01 — Cloud & Data Management`.
- **Motion language:** calm, physical. 400–700ms eased reveals (fade +
  20–30px rise), staggered children, scroll-linked progress on the
  How-We-Work timeline, subtle hero parallax, glassy header that condenses on
  scroll. All animation gated behind `prefers-reduced-motion`.

## Site map

| Route | Content |
|---|---|
| `/` | Hero, value proposition, 8-service overview grid, Why Peakware, How We Work, industries strip, CTA band |
| `/services` | Index of 8 pillars with taglines |
| `/services/[slug]` | Static pages per pillar: hero, narrative, What-we-deliver list, adjacent-service nav, CTA band |
| `/about` | Value-prop narrative + Why Peakware + How We Work (scroll-linked steps) |
| `/industries` | Five sectors, lightly expanded (new connective copy in doc's voice — flag for user review) |
| `/contact` | "Let's talk about the actual problem" + validated form → server action stub with success state |

Service slugs: `cloud-data-management`, `infrastructure-virtualization`,
`agentic-ai`, `machine-learning`, `custom-software-development`,
`cybersecurity`, `analytics`, `training-enablement`.

## Architecture

```
app/             layout.tsx (fonts, Header, Footer, SmoothScrollProvider),
                 page.tsx, services/page.tsx, services/[slug]/page.tsx,
                 about/page.tsx, industries/page.tsx, contact/page.tsx,
                 sitemap.ts, robots.ts
components/      header.tsx, footer.tsx, section primitives (cta-band, etc.)
components/motion/  Reveal, Stagger, Parallax — small client components
content/         services.ts (typed data for all 8 pillars — single source of
                 truth for index, homepage cards, detail pages), site.ts
                 (nav, meta description, taglines, why/how/industries copy)
lib/actions.ts   contact server action (zod or manual validation, stub send)
```

Pages remain server components; only motion primitives, header scroll
behaviour, Lenis provider, and the contact form are client components.

## Error handling & states

- Contact form: client + server validation, inline field errors, pending
  state on submit, success confirmation state. Server action returns typed
  result; stub logs submission server-side.
- `not-found.tsx` for unknown service slugs and global 404, on-brand.

## SEO & a11y

- Metadata from the doc: title template, meta description (~155 chars
  provided), OpenGraph tags. `sitemap.ts` + `robots.ts`.
- Semantic landmarks, focus-visible styles, contrast ≥ 4.5:1 for body text
  (orange accent reserved for large text/non-text where contrast is short),
  `prefers-reduced-motion` respected everywhere.

## Verification

- `next build` clean, `eslint` clean.
- Visual QA at mobile (390px), tablet (768px), desktop (1440px) via headless
  browser screenshots of every route.
- Reduced-motion spot check.

## Execution phases

1. Foundations — Next 16 docs read, tokens, fonts, header/footer, smooth
   scroll + motion primitives
2. Homepage — all sections, responsive
3. Services — data module, index, 8 detail pages
4. About, Industries, Contact (incl. server action)
5. Polish & QA — page transitions, SEO, a11y, reduced motion, visual QA,
   production build

## Out of scope (launch)

- Real email/CRM integration (stub only), blog/case studies, CMS, analytics
  tooling, cookie banner, multi-language.
