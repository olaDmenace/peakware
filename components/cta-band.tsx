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
