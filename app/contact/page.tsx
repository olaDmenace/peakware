import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { contact, ctaBand } from "@/content/site";

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
        image="/images/hero-laptop.jpg"
      />
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  Email
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-3 block text-sm text-muted transition-colors hover:text-cream"
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  Phone
                </p>
                <a
                  href={contact.phoneHref}
                  className="mt-3 block text-sm text-muted transition-colors hover:text-cream"
                >
                  {contact.phone}
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  Address
                </p>
                <address className="mt-3 text-sm leading-relaxed text-muted not-italic">
                  {contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
