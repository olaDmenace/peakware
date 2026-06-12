import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { ctaBand } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you're trying to build, fix or secure. We'll give you a straight assessment of what it takes.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={ctaBand.headline}
        intro={ctaBand.body}
      />
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>
    </main>
  );
}
