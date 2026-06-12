import Image from "next/image";
import Link from "next/link";
import { ctaBand } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t keyline">
      <Image
        src="/images/earth.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-ink/70" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink"
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
            className="btn btn-primary mt-10 px-7 py-3.5"
          >
            {ctaBand.cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
