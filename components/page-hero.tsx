import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b keyline">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute -top-40 right-[-15%] h-[28rem] w-[28rem] rounded-full bg-navy/30 blur-[130px]"
          aria-hidden
        />
      )}
      <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />
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
