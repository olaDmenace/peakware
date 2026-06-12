import Link from "next/link";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border keyline bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-raised"
    >
      <p className="font-mono text-xs text-faint">
        {service.number} <span className="text-accent">/</span>
      </p>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">
        {service.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {service.tagline}
      </p>
      <p className="mt-5 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Explore →
      </p>
    </Link>
  );
}
