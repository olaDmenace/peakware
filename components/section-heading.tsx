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
