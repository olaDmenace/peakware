# Peakware Consulting Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full multi-page Peakware Consulting marketing site (Home, Services index + 8 detail pages, About, Industries, Contact) with a dark premium theme, orange `#F4830B` accent, and mature motion design.

**Architecture:** Next.js 16 App Router; all pages are server components rendering from typed content modules (`content/services.ts`, `content/site.ts`). Small client components handle motion (`motion` lib), smooth scrolling (`lenis`), the header, and the contact form (server action stub). Tailwind v4 CSS-first tokens in `globals.css`.

**Tech Stack:** Next.js 16.2.9, React 19, Tailwind v4, `motion` ^12, `lenis` ^1.3, TypeScript, `next/font` (Instrument Sans + Geist Mono).

**Spec:** `docs/superpowers/specs/2026-06-12-peakware-website-design.md`

## Next.js 16 facts the executor MUST respect (verified against `node_modules/next/dist/docs/`)

- `params` in pages/layouts is a **Promise**: `const { slug } = await props.params`.
- `next dev`/`next build` use Turbopack by default; dev output goes to `.next/dev`. Don't run two dev servers (lockfile).
- `next build` does NOT lint. Lint with `npx eslint .` (script `npm run lint` runs bare `eslint` — pass `.`).
- No `middleware.ts` (renamed `proxy.ts`) — we don't need either.
- Smooth scrolling is handled by Lenis, NOT CSS `scroll-behavior` — do not add `data-scroll-behavior`.
- Fonts via `next/font/google` with `variable` option (existing layout already shows the pattern).
- There is no test framework in this project and the site is static marketing content: verification = typecheck (`npx tsc --noEmit`), lint, `next build`, and visual checks. Do not introduce a test framework.

## Verification commands (used throughout)

```bash
npx tsc --noEmit          # typecheck
npx eslint .              # lint
npm run build             # production build (Turbopack)
```

---

### Task 1: Dependencies, design tokens, fonts, root layout

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Install motion + lenis**

```bash
npm install motion lenis
```

Expected: both appear in `package.json` dependencies.

- [ ] **Step 2: Replace `app/globals.css` with the design tokens**

```css
@import "tailwindcss";

@theme {
  --color-ink: #0a0d14;
  --color-surface: #10141d;
  --color-raised: #151b27;
  --color-line: #222a39;
  --color-cream: #f4f1ea;
  --color-muted: #97a0af;
  --color-faint: #6b7484;
  --color-accent: #f4830b;
  --color-accent-bright: #ff9a2e;
  --color-navy: #1f3d7e;

  --font-sans: var(--font-instrument-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}

body {
  background: var(--color-ink);
  color: var(--color-cream);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: color-mix(in srgb, var(--color-accent) 80%, transparent);
  color: var(--color-ink);
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Thin keyline used across sections */
.keyline {
  border-color: color-mix(in srgb, var(--color-line) 80%, transparent);
}

/* Subtle background grid for hero/CTA zones */
.bg-grid {
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--color-line) 35%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--color-line) 35%, transparent) 1px, transparent 1px);
  background-size: 56px 56px;
}
```

- [ ] **Step 3: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peakwareconsulting.co.uk"),
  title: {
    default: "Peakware Consulting — Technology that earns its place",
    template: "%s — Peakware Consulting",
  },
  description:
    "Peakware Consulting designs, builds and secures cloud, data, AI and software systems for UK organisations. Senior expertise, straight answers, lasting results.",
  openGraph: {
    siteName: "Peakware Consulting",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        {children}
      </body>
    </html>
  );
}
```

(Header/Footer/providers are added to this layout in Task 4 — this task keeps it minimal so the build stays green.)

- [ ] **Step 4: Update `app/page.tsx` to a placeholder so the build passes**

```tsx
export default function HomePage() {
  return <main className="flex-1" />;
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

Expected: all pass. (Old scaffold page referenced removed CSS vars — replaced above.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: design tokens, fonts and root layout for Peakware site"
```

---

### Task 2: Content modules (single source of truth)

**Files:**
- Create: `content/services.ts`
- Create: `content/site.ts`

All copy below is verbatim from `peakware-website-content.docx` (British English — do not Americanise).

- [ ] **Step 1: Create `content/services.ts`**

```ts
export type Service = {
  slug: string;
  number: string; // "01".."08" for mono eyebrows
  name: string;
  navName: string; // shorter label for nav/footer
  tagline: string; // the hook line
  narrative: string[]; // body paragraphs
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "cloud-data-management",
    number: "01",
    name: "Cloud & Data Management",
    navName: "Cloud & Data",
    tagline:
      "Your cloud spend and your data are usually your two largest, least-understood assets. We bring both under control.",
    narrative: [
      "We architect, migrate and optimise cloud environments across AWS, Azure and Google Cloud, then put the data layer on top of it: pipelines, warehouses, governance and the controls that keep it clean and compliant. The result is infrastructure you can reason about and data you can trust.",
    ],
    deliverables: [
      "Cloud migration and modernisation (lift-and-shift through to full re-architecture)",
      "Multi-cloud and hybrid architecture design",
      "Cost optimisation and FinOps — stop paying for capacity you don't use",
      "Data platforms, pipelines and warehousing",
      "Data governance, quality and compliance (UK GDPR-aligned)",
    ],
  },
  {
    slug: "infrastructure-virtualization",
    number: "02",
    name: "Infrastructure & Virtualization",
    navName: "Infrastructure",
    tagline:
      "The unglamorous layer that everything else depends on. When it's right, nobody notices. When it's wrong, everyone does.",
    narrative: [
      "We design and run resilient infrastructure — virtualised, containerised or bare metal — with the automation and observability to keep it stable at scale. Whether you're consolidating servers, standing up Kubernetes, or building a disaster-recovery posture you can actually rely on, we make the foundation solid.",
    ],
    deliverables: [
      "Virtualisation and server consolidation (VMware, Hyper-V, Proxmox)",
      "Containerisation and orchestration (Docker, Kubernetes)",
      "Infrastructure-as-Code and automation (Terraform, Ansible)",
      "High availability, backup and disaster recovery",
      "Monitoring, observability and performance tuning",
    ],
  },
  {
    slug: "agentic-ai",
    number: "03",
    name: "Agentic AI",
    navName: "Agentic AI",
    tagline:
      "AI that does the work, not just talks about it. Agentic systems can plan, use tools, call your APIs and complete multi-step tasks — but only when they're built with real guardrails.",
    narrative: [
      "We design and deploy AI agents that automate genuine workflows: research, support, operations, internal tooling. We handle the unglamorous parts that make agents trustworthy — tool integration, permissions, monitoring and human oversight — so you ship something dependable, not a demo that breaks the first time a customer touches it.",
    ],
    deliverables: [
      "Custom AI agents and multi-agent workflows",
      "Tool, API and system integration (including MCP-based architectures)",
      "Workflow and process automation",
      "Retrieval-augmented generation (RAG) over your own knowledge",
      "Guardrails, evaluation and human-in-the-loop controls",
    ],
  },
  {
    slug: "machine-learning",
    number: "04",
    name: "Machine Learning",
    navName: "Machine Learning",
    tagline:
      "Models are easy to build and hard to operate. We focus on the ones that survive contact with production.",
    narrative: [
      "We help you find the problems where ML actually pays off, then build, train and deploy models that hold up under real data and real load. Just as importantly, we put the monitoring in place to catch drift before it costs you — because a model that was accurate six months ago isn't a strategy.",
    ],
    deliverables: [
      "ML opportunity assessment and feasibility",
      "Model development, training and fine-tuning",
      "Predictive analytics and forecasting",
      "MLOps — deployment, monitoring and retraining pipelines",
      "Computer vision and natural language processing",
    ],
  },
  {
    slug: "custom-software-development",
    number: "05",
    name: "Custom Software Development",
    navName: "Software",
    tagline:
      "Off-the-shelf software fits the average company. It rarely fits yours.",
    narrative: [
      "We build web applications, internal platforms and integrations that map to how your business actually runs. Modern stack, clean architecture, and code your own team can read and extend. We sweat the things that determine whether software lasts: maintainability, testing, documentation and a sensible deployment pipeline.",
    ],
    deliverables: [
      "Web and SaaS application development",
      "Internal tools, dashboards and admin platforms",
      "API design and third-party integration",
      "Legacy system modernisation",
      "Maintainable, well-documented, test-covered delivery",
    ],
  },
  {
    slug: "cybersecurity",
    number: "06",
    name: "Cybersecurity",
    navName: "Cybersecurity",
    tagline:
      "Security isn't a product you buy — it's a posture you maintain. We help you build one that matches your actual risk, not someone else's checklist.",
    narrative: [
      "We assess where you're exposed, fix what matters first, and put the controls and monitoring in place to keep you protected as you grow. From access management to incident response planning, we make security something your business runs with, rather than something it works around.",
    ],
    deliverables: [
      "Security audits and vulnerability assessments",
      "Penetration testing and threat modelling",
      "Identity and access management (IAM)",
      "Cloud and infrastructure hardening",
      "Compliance support (ISO 27001, Cyber Essentials, UK GDPR)",
      "Incident response planning and monitoring",
    ],
  },
  {
    slug: "analytics",
    number: "07",
    name: "Analytics",
    navName: "Analytics",
    tagline:
      "Dashboards everywhere, decisions nowhere. The problem is rarely a shortage of data — it's a shortage of clarity.",
    narrative: [
      "We turn your data into reporting that people actually use to make decisions. We connect the sources, build the models, and design the dashboards around the questions your team keeps asking — so the answer is a glance, not a meeting.",
    ],
    deliverables: [
      "Business intelligence and reporting (Power BI, Looker, Tableau)",
      "KPI design and metrics frameworks",
      "Data modelling and self-serve analytics",
      "Real-time and operational dashboards",
      "Advanced and predictive analytics",
    ],
  },
  {
    slug: "training-enablement",
    number: "08",
    name: "Training & Enablement",
    navName: "Training",
    tagline:
      "The best system in the world is worthless if your team can't run it. We make sure they can.",
    narrative: [
      "We don't hand over a solution and disappear. We train your people on the tools, platforms and practices we've put in place — cloud, data, AI, security, development — so the capability stays in-house. Practical, hands-on, and pitched at your team's actual level.",
    ],
    deliverables: [
      "Hands-on workshops and bootcamps",
      "Cloud, data and AI upskilling",
      "Secure development and DevOps practices",
      "Tailored enablement for the systems we deliver",
      "Ongoing advisory and team mentoring",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
```

- [ ] **Step 2: Create `content/site.ts`**

```ts
export const site = {
  name: "Peakware Consulting",
  domain: "peakwareconsulting.co.uk",
  url: "https://peakwareconsulting.co.uk",
  tagline: "Technology that earns its place in your business.",
  oneLiner:
    "UK technology consultancy for cloud, data, AI, software and security — built to work and built to last.",
  metaDescription:
    "Peakware Consulting designs, builds and secures cloud, data, AI and software systems for UK organisations. Senior expertise, straight answers, lasting results.",
  footerTagline: "Peakware Consulting — technology that earns its place.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  headline: "Technology that earns its place in your business.",
  subheadline:
    "Peakware is a UK technology consultancy. We design, build and secure the cloud, data and AI systems that move organisations forward — and we stay long enough to make sure they actually work.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  secondaryCta: { label: "Explore our services", href: "/services" },
};

export const valueProp = [
  "Most technology problems aren't really technology problems. They're decisions made without enough context, systems bolted together under deadline, and roadmaps that drift from what the business needs.",
  "We work the other way round. We start with the outcome you're after, then engineer the shortest credible path to it — across cloud, data, infrastructure, AI and security. No oversized programmes, no vendor theatre, no jargon used to hide a thin answer.",
  "You get senior people who've done the work, clear recommendations you can act on, and systems built to be maintained by your team long after we've gone.",
];

export const whyPeakware = [
  {
    title: "Senior people, not a sales pipeline",
    body: "The people who scope your work are the people who do it. You won't be sold by an expert and delivered by a junior.",
  },
  {
    title: "We commit to the outcome",
    body: "We're judged on whether the system works and the business moves — not on hours billed or slides produced.",
  },
  {
    title: "Built to be handed over",
    body: "Everything we deliver is documented, maintainable and owned by your team. No dependency you didn't ask for.",
  },
  {
    title: "Straight answers",
    body: "If something's a bad idea, you'll hear it from us early — when it's cheap to change — not after it's built.",
  },
  {
    title: "Genuinely cross-disciplinary",
    body: "Cloud, data, AI, software and security under one roof, so the pieces actually fit together instead of fighting each other.",
  },
];

export const howWeWork = [
  {
    step: "Discover",
    body: "We get into the detail of what you're trying to achieve and where the real constraints are. No assumptions, no boilerplate proposal.",
  },
  {
    step: "Design",
    body: "We map the shortest credible path to the outcome, with the trade-offs laid out plainly so you can make the call.",
  },
  {
    step: "Build",
    body: "We deliver in focused increments you can see and use, not a six-month black box.",
  },
  {
    step: "Hand over",
    body: "We document, train and transfer ownership so your team can run and extend what we've built.",
  },
  {
    step: "Support",
    body: "We stay available for the things that come up after launch, on terms that suit you.",
  },
];

// Sector blurbs below are new connective copy (not in the docx) — flagged for user review.
export const industries = [
  {
    name: "Financial services & fintech",
    blurb:
      "Systems where accuracy, auditability and uptime aren't negotiable — from data platforms to secure cloud foundations.",
  },
  {
    name: "Healthcare & life sciences",
    blurb:
      "Compliant data handling and dependable infrastructure for organisations where the stakes are higher than dashboards.",
  },
  {
    name: "Retail & e-commerce",
    blurb:
      "The analytics, integrations and platforms that turn transaction volume into decisions and margin.",
  },
  {
    name: "Professional services",
    blurb:
      "Internal tooling, automation and reporting that free senior people from work a system should be doing.",
  },
  {
    name: "Startups & scale-ups",
    blurb:
      "First serious infrastructure, built right the first time — so growth doesn't mean a rebuild.",
  },
];

export const ctaBand = {
  headline: "Let's talk about the actual problem.",
  body: "Tell us what you're trying to build, fix or secure. We'll give you a straight assessment of what it takes — no obligation, no sales script.",
  cta: { label: "Book a discovery call", href: "/contact" },
};
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint .
```

Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add content
git commit -m "feat: typed content modules from website content document"
```

---

### Task 3: Motion primitives + smooth scroll provider

**Files:**
- Create: `components/motion/reveal.tsx`
- Create: `components/providers.tsx`

- [ ] **Step 1: Create `components/motion/reveal.tsx`**

```tsx
"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `components/providers.tsx`** (MotionConfig honours `prefers-reduced-motion`; Lenis skipped for reduced-motion users)

```tsx
"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  const content = (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );

  if (reducedMotion) return content;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.15 }}>
      {content}
    </ReactLenis>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint .
```

Expected: pass. If `lenis/react` types fail, check `node_modules/lenis/dist` for the actual export name (`ReactLenis` is correct for lenis ^1.3).

- [ ] **Step 4: Commit**

```bash
git add components
git commit -m "feat: motion primitives and smooth-scroll provider"
```

---

### Task 4: Header, footer, CTA band, section heading; wire into layout

**Files:**
- Create: `components/header.tsx`
- Create: `components/footer.tsx`
- Create: `components/cta-band.tsx`
- Create: `components/section-heading.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/header.tsx`** — fixed, transparent at top, glassy + condensed after scroll; mobile overlay menu

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b keyline py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Peakware<span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-cream ${
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
                  ? "text-cream"
                  : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-bright"
          >
            Book a discovery call
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`block h-px w-5 bg-cream transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-cream transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-b keyline bg-ink/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-3 text-base text-muted transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 rounded-full bg-accent px-4 py-3 text-center font-medium text-ink"
              >
                Book a discovery call
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Create `components/footer.tsx`**

```tsx
import Link from "next/link";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";

export function Footer() {
  return (
    <footer className="border-t keyline bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-semibold tracking-tight text-lg">
            Peakware<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {site.oneLiner}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            Services
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  {s.navName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            Company
          </p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t keyline">
        <p className="mx-auto max-w-6xl px-5 py-6 font-mono text-xs text-faint sm:px-8">
          {site.footerTagline}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create `components/section-heading.tsx`**

```tsx
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
```

- [ ] **Step 4: Create `components/cta-band.tsx`**

```tsx
import Link from "next/link";
import { ctaBand } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t keyline">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute -top-1/2 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-navy/30 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl text-balance">
            {ctaBand.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {ctaBand.body}
          </p>
          <Link
            href={ctaBand.cta.href}
            className="mt-10 inline-block rounded-full bg-accent px-7 py-3.5 font-medium text-ink transition-colors hover:bg-accent-bright"
          >
            {ctaBand.cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Wire into `app/layout.tsx`** — replace the `<body>` contents:

```tsx
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
```

```tsx
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <Providers>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
```

- [ ] **Step 6: Verify** — typecheck, lint, build, then start dev server and confirm header/footer render and the mobile menu toggles:

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

Expected: pass.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: header, footer, CTA band and section heading components"
```

---

### Task 5: Homepage

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/hero.tsx`
- Create: `components/home/service-card.tsx`

- [ ] **Step 1: Create `components/home/hero.tsx`** — staggered headline entrance, grid + navy/orange atmosphere, subtle parallax accent

```tsx
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content/site";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
        aria-hidden
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute -top-32 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-navy/35 blur-[140px]"
        aria-hidden
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-mono text-xs uppercase tracking-widest text-accent"
        >
          UK technology consultancy
        </motion.p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {hero.headline.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "0.5em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 + i * 0.045, ease: EASE }}
              className="inline-block whitespace-pre"
            >
              {word}{" "}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {hero.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href={hero.primaryCta.href}
            className="rounded-full bg-accent px-7 py-3.5 font-medium text-ink transition-colors hover:bg-accent-bright"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="rounded-full border keyline px-7 py-3.5 font-medium text-cream transition-colors hover:border-accent hover:text-accent"
          >
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/home/service-card.tsx`**

```tsx
import Link from "next/link";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border keyline bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-raised"
    >
      <p className="font-mono text-xs text-faint">
        {service.number} <span className="text-accent">/</span>
      </p>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        {service.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {service.tagline}
      </p>
      <p className="mt-5 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Explore →
      </p>
    </Link>
  );
}
```

- [ ] **Step 3: Replace `app/page.tsx`** — composes hero + value prop + services grid + why + how + industries + CTA

```tsx
import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { ServiceCard } from "@/components/home/service-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { services } from "@/content/services";
import {
  valueProp,
  whyPeakware,
  howWeWork,
  industries,
} from "@/content/site";

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* Value proposition */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          eyebrow="The way we work"
          title="Most technology problems aren't really technology problems."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {valueProp[0]}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {valueProp[1]}
            </p>
            <p className="mt-6 text-base leading-relaxed text-cream sm:text-lg">
              {valueProp[2]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-t keyline bg-surface/50">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            eyebrow="Services"
            title="Eight disciplines, one roof."
            intro="Cloud, data, AI, software and security that actually fit together — instead of fighting each other."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Peakware */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading eyebrow="Why Peakware" title="Built on straight answers." />
        <Stagger className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {whyPeakware.map((item, i) => (
            <StaggerItem key={item.title}>
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How we work */}
      <section className="border-t keyline bg-surface/50">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <SectionHeading
            eyebrow="How we work"
            title="From discovery to handover — no black boxes."
          />
          <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {howWeWork.map((item, i) => (
              <StaggerItem key={item.step}>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <span className="h-px flex-1 bg-line" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold tracking-tight">
                  {item.step}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Industries strip */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionHeading
          eyebrow="Industries"
          title="Depth where it matters."
          intro="We work across sectors, with particular depth in:"
        />
        <Stagger className="mt-10 flex flex-wrap gap-3">
          {industries.map((ind) => (
            <StaggerItem key={ind.name}>
              <Link
                href="/industries"
                className="inline-block rounded-full border keyline bg-surface px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-cream"
              >
                {ind.name}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CtaBand />
    </main>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

Expected: pass. Then `npm run dev`, open `http://localhost:3000`, confirm: hero words stagger in, sections reveal on scroll, smooth scrolling feels inertial, service cards hover-lift, layout holds at 390px width.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: homepage with hero, services grid and story sections"
```

---

### Task 6: Services index + 8 detail pages

**Files:**
- Create: `app/services/page.tsx`
- Create: `app/services/[slug]/page.tsx`
- Create: `components/page-hero.tsx`

- [ ] **Step 1: Create `components/page-hero.tsx`** — shared interior-page hero

```tsx
import { Reveal } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b keyline">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute -top-40 right-[-15%] h-[28rem] w-[28rem] rounded-full bg-navy/30 blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 pt-40 pb-20 sm:px-8 sm:pt-48 sm:pb-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {intro}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `app/services/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight service pillars: cloud & data, infrastructure, agentic AI, machine learning, custom software, cybersecurity, analytics and training.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Eight disciplines, one roof."
        intro="Cloud, data, AI, software and security that actually fit together — instead of fighting each other."
      />
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="divide-y divide-line border-y keyline">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={Math.min(i * 0.04, 0.2)}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid gap-4 py-10 transition-colors md:grid-cols-[6rem_1fr_auto] md:items-baseline"
              >
                <p className="font-mono text-sm text-faint transition-colors group-hover:text-accent">
                  {service.number}
                </p>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                    {service.name}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {service.tagline}
                  </p>
                </div>
                <p
                  className="hidden text-2xl text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:block"
                  aria-hidden
                >
                  →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
```

- [ ] **Step 3: Create `app/services/[slug]/page.tsx`** — NOTE the async `params` (Next 16)

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { getService, services } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.tagline };
}

export default async function ServicePage(props: Props) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((s) => s.slug === service.slug);
  const prev = services[(index + services.length - 1) % services.length];
  const next = services[(index + 1) % services.length];

  return (
    <main>
      <PageHero
        eyebrow={`Service ${service.number} / 08`}
        title={service.name}
        intro={service.tagline}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              The approach
            </p>
            {service.narrative.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="mt-6 text-lg leading-relaxed text-cream/90"
              >
                {para}
              </p>
            ))}
          </Reveal>
          <div>
            <Reveal delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                What we deliver
              </p>
            </Reveal>
            <Stagger className="mt-6 space-y-3">
              {service.deliverables.map((item) => (
                <StaggerItem
                  key={item}
                  className="flex gap-3 rounded-xl border keyline bg-surface p-4"
                >
                  <span className="mt-0.5 text-accent" aria-hidden>
                    ▪
                  </span>
                  <p className="text-sm leading-relaxed text-muted">{item}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="border-t keyline">
        <div className="mx-auto grid max-w-6xl gap-px sm:grid-cols-2">
          <Link
            href={`/services/${prev.slug}`}
            className="group px-5 py-10 transition-colors hover:bg-surface sm:px-8"
          >
            <p className="font-mono text-xs text-faint">← Previous</p>
            <p className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-accent">
              {prev.name}
            </p>
          </Link>
          <Link
            href={`/services/${next.slug}`}
            className="group px-5 py-10 text-right transition-colors hover:bg-surface sm:px-8"
          >
            <p className="font-mono text-xs text-faint">Next →</p>
            <p className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-accent">
              {next.name}
            </p>
          </Link>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

Expected: build output lists all 8 `/services/[slug]` routes as static (●/SSG). Visit `/services/agentic-ai` in dev; confirm 404 for `/services/nope`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: services index and eight static service detail pages"
```

---

### Task 7: About + Industries pages

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/industries/page.tsx`

- [ ] **Step 1: Create `app/about/page.tsx`** — value-prop narrative + Why Peakware + scroll-revealed How We Work timeline

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { valueProp, whyPeakware, howWeWork } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior people, straight answers, systems built to be handed over. How Peakware Consulting works.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="Senior people. Straight answers. Systems that last."
        intro={valueProp[0]}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {valueProp[1]}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-cream sm:text-lg">
              {valueProp[2]}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t keyline bg-surface/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading eyebrow="Why Peakware" title="What you can hold us to." />
          <Stagger className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {whyPeakware.map((item, i) => (
              <StaggerItem key={item.title}>
                <p className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="How we work"
          title="Five steps, no black boxes."
        />
        <div className="relative mt-14 space-y-12 border-l keyline pl-8 sm:pl-12">
          {howWeWork.map((item, i) => (
            <Reveal key={item.step} delay={Math.min(i * 0.05, 0.2)}>
              <div className="relative">
                <span
                  className="absolute -left-8 top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-accent/50 bg-ink font-mono text-[10px] text-accent sm:-left-12"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="text-xl font-semibold tracking-tight">
                  {item.step}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
```

- [ ] **Step 2: Create `app/industries/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { industries } from "@/content/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Financial services, healthcare, retail, professional services and scale-ups — sectors where Peakware has particular depth.",
};

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industries"
        title="Depth where it matters."
        intro="We work across sectors, with particular depth in the ones below."
      />
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <StaggerItem
              key={ind.name}
              className="rounded-2xl border keyline bg-surface p-7"
            >
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-lg font-semibold tracking-tight">
                {ind.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {ind.blurb}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <CtaBand />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

Expected: pass; `/about` and `/industries` listed in build output.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: about and industries pages"
```

---

### Task 8: Contact page with server action stub

**Files:**
- Create: `lib/actions.ts`
- Create: `components/contact-form.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create `lib/actions.ts`** — validated server action, stub delivery (logs server-side; swap for Resend/CRM later)

```ts
"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10)
    errors.message = "Tell us a little more — a sentence or two is plenty.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  // Delivery stub: replace with Resend/CRM integration when credentials exist.
  console.log("[contact] discovery call request", { name, email, company, message });

  return { status: "success", errors: {} };
}
```

- [ ] **Step 2: Create `components/contact-form.tsx`** — `useActionState` + pending state + success panel

```tsx
"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { submitContact, type ContactState } from "@/lib/actions";

const initialState: ContactState = { status: "idle", errors: {} };

const inputClasses =
  "w-full rounded-xl border keyline bg-surface px-4 py-3 text-sm text-cream placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      {children}
      {error ? <span className="mt-2 block text-xs text-accent">{error}</span> : null}
    </label>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  );

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-accent/40 bg-surface p-8 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Message received
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Thanks — we&apos;ll be in touch shortly.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          A senior consultant will read your message and reply with a straight
          assessment. No sales script.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={state.errors.name}>
          <input name="name" type="text" autoComplete="name" required className={inputClasses} placeholder="Your name" />
        </Field>
        <Field label="Email" error={state.errors.email}>
          <input name="email" type="email" autoComplete="email" required className={inputClasses} placeholder="you@company.co.uk" />
        </Field>
      </div>
      <Field label="Company (optional)">
        <input name="company" type="text" autoComplete="organization" className={inputClasses} placeholder="Company name" />
      </Field>
      <Field label="What are you trying to build, fix or secure?" error={state.errors.message}>
        <textarea name="message" rows={5} required className={inputClasses} placeholder="A sentence or two is plenty." />
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-7 py-3.5 font-medium text-ink transition-colors hover:bg-accent-bright disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Book a discovery call"}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Create `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { ctaBand } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're trying to build, fix or secure. We'll give you a straight assessment of what it takes.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={ctaBand.headline}
        intro={ctaBand.body}
      />
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Verify** — typecheck/lint/build, then in dev: submit empty form (inline errors appear, no navigation), submit valid form (success panel animates in, submission logged in the dev server terminal).

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: contact page with validated server-action form stub"
```

---

### Task 9: 404, sitemap, robots, polish

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` (scaffold leftovers)

- [ ] **Step 1: Create `app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The link may be out of date. Everything we do is reachable from the
        homepage.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-7 py-3.5 font-medium text-ink transition-colors hover:bg-accent-bright"
      >
        Back to home
      </Link>
    </main>
  );
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/about", "/industries", "/contact"];
  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
```

- [ ] **Step 3: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Remove scaffold SVGs**

```bash
git rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

Expected: pass; `/sitemap.xml` and `/robots.txt` in build output.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: 404 page, sitemap and robots"
```

---

### Task 10: Full QA sweep

**Files:** none new — fixes only, applied wherever QA finds issues.

- [ ] **Step 1: Production build + lint + typecheck**

```bash
npx tsc --noEmit && npx eslint . && npm run build
```

- [ ] **Step 2: Start dev server, screenshot every route at 3 widths**

Routes: `/`, `/services`, `/services/agentic-ai`, `/services/cybersecurity`, `/about`, `/industries`, `/contact`, `/missing-page` (404).
Widths: 390 (mobile), 768 (tablet), 1440 (desktop).
Use the Playwright browser tools (`browser_navigate`, `browser_resize`, `browser_take_screenshot`) or the gstack `browse` skill.

Check: no horizontal overflow, readable contrast, header condenses on scroll, mobile menu works, hover states on cards/rows, form error + success states, footer links resolve.

- [ ] **Step 3: Reduced-motion spot check**

Emulate `prefers-reduced-motion: reduce` (Playwright `browser_run_code_unsafe` with `page.emulateMedia({ reducedMotion: 'reduce' })` or DevTools). Confirm content is fully visible without animation and scrolling is native.

- [ ] **Step 4: Fix anything found, re-verify, commit**

```bash
git add -A
git commit -m "fix: QA polish across breakpoints and motion preferences"
```

---

## Self-review notes

- Spec coverage: tokens/fonts (T1), content single-source (T2), motion + Lenis + reduced-motion (T3), header/footer/CTA (T4), homepage sections incl. industries strip (T5), services index + 8 static pages with async params (T6), about + industries (T7), contact form server action with validation/pending/success (T8), 404 + sitemap + robots + SEO metadata (T1, T9), QA breakpoints + reduced motion (T10).
- Page transitions via `template.tsx` were considered and dropped (YAGNI): per-section reveals already animate every navigation, and a global fade fights Lenis scroll restoration.
- Industries sector blurbs in `content/site.ts` are new copy — flag to user for review after launch QA.
