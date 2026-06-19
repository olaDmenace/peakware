import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { industries } from "@/content/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Financial services, healthcare, retail, professional services and scale-ups — sectors where Peakware has particular depth.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industries"
        title="Depth where it matters."
        intro="We work across sectors, with particular depth in the ones below."
        image="/images/earth.jpg"
      />
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <StaggerItem key={ind.name} className="card p-7">
              <div className="flex items-center justify-between">
                <span className={`lni ${ind.icon} card-icon`} aria-hidden />
                <p className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-tight">
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
