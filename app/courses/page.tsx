import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import {
  academy,
  vision,
  mission,
  coreValues,
  courseCategories,
  totalCourseCount,
} from "@/content/courses";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Peakware Academy delivers employer-led training across project management, cloud, cybersecurity, data, AI, business analysis and more — with globally recognised certifications.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  const total = totalCourseCount();

  const academySchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: academy.name,
    url: `${site.url}/courses`,
    description: academy.intro[0],
    parentOrganization: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };

  const catalogueSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Peakware Academy course catalogue",
    numberOfItems: total,
    itemListElement: courseCategories
      .flatMap((category) => category.courses)
      .map((course, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: course,
      })),
  };

  return (
    <main>
      <JsonLd data={[academySchema, catalogueSchema]} />
      <PageHero
        eyebrow="Peakware Academy"
        title="Future-ready skills, industry-recognised certifications."
        intro={academy.intro[0]}
        image="/images/code.jpg"
      />

      {/* Positioning */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {academy.intro[1]}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {academy.intro[2]}
            </p>
            <p className="mt-6 text-base leading-relaxed text-cream sm:text-lg">
              {academy.delivery}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-t keyline bg-surface/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Stagger className="grid gap-5 md:grid-cols-2">
            <StaggerItem className="card p-8">
              <span className="lni lni-eye card-icon" aria-hidden />
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                Our vision
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {vision}
              </p>
            </StaggerItem>
            <StaggerItem className="card p-8">
              <span className="lni lni-flag-1 card-icon" aria-hidden />
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                Our mission
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {mission}
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Core values */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="What we stand for"
          title="Six values behind every programme."
        />
        <Stagger className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value) => (
            <StaggerItem key={value.name}>
              <span className={`lni ${value.icon} card-icon`} aria-hidden />
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {value.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {value.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Course catalogue */}
      <section className="border-t keyline bg-surface/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Course catalogue"
            title="Seven disciplines. One academy."
            intro={`${total}+ courses spanning project management, cloud, security, data, AI, business analysis and emerging technologies — delivered instructor-led, virtual, blended or in-house.`}
          />
          <div className="mt-12 space-y-5">
            {courseCategories.map((category, i) => (
              <Reveal key={category.slug} delay={Math.min(i * 0.05, 0.2)}>
                <div className="card p-7 sm:p-8">
                  <div className="flex flex-col gap-5 border-b border-line/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className={`lni ${category.icon} card-icon`}
                        aria-hidden
                      />
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">
                          {category.name}
                        </h3>
                        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                          {category.blurb}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-faint">
                      {category.courses.length} courses
                    </span>
                  </div>
                  <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                    {category.courses.map((course) => (
                      <li
                        key={course}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-sm leading-relaxed text-muted">
              Looking for a course that isn&apos;t listed, or a programme
              tailored to your team? See how training fits our wider work in{" "}
              <Link
                href="/services/training-enablement"
                className="text-accent underline-offset-4 hover:underline"
              >
                Training &amp; Enablement
              </Link>
              , or{" "}
              <Link
                href="/contact"
                className="text-accent underline-offset-4 hover:underline"
              >
                talk to us
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
