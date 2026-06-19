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
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Eight disciplines, one roof."
        intro="Cloud, data, AI, software and security that actually fit together — instead of fighting each other."
        image="/images/servers.jpg"
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
