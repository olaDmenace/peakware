import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { ServiceCard } from "@/components/home/service-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { services } from "@/content/services";
import { valueProp, whyPeakware, howWeWork, industries } from "@/content/site";

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
