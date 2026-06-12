"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/content/site";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero-peak.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/25"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent"
        aria-hidden
      />
      <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-mono text-xs uppercase tracking-widest text-accent"
        >
          UK technology consultancy
        </motion.p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {hero.headline.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: "0.5em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 + i * 0.045, ease: EASE }}
              className="inline-block whitespace-pre"
            >
              {word}{" "}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {hero.subheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href={hero.primaryCta.href}
            className="btn btn-primary px-7 py-3.5"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="btn btn-ghost px-7 py-3.5"
          >
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
