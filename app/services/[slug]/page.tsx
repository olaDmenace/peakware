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
        image={service.image}
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
                  className="flex gap-3 rounded-xl border border-line/60 p-4"
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

        {service.slug === "training-enablement" ? (
          <Reveal>
            <Link
              href="/courses"
              className="card group mt-12 flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="lni lni-graduation-cap-1 card-icon" aria-hidden />
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    Peakware Academy
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">
                    Browse the full course catalogue
                  </h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                    Project management, cloud, cybersecurity, data, AI and more
                    — with globally recognised certifications.
                  </p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-accent">
                View courses
                <span
                  className="lni lni-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          </Reveal>
        ) : null}
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
