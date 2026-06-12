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
