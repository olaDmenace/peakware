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
        image="/images/team.jpg"
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
        <SectionHeading eyebrow="How we work" title="Five steps, no black boxes." />
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
