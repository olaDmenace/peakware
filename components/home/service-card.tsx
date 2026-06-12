import Link from "next/link";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card group flex h-full flex-col p-6"
    >
      <div className="flex items-center justify-between">
        <span className={`lni ${service.icon} card-icon`} aria-hidden />
        <p className="font-mono text-xs text-faint">
          {service.number} <span className="text-accent">/</span>
        </p>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">
        {service.name}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {service.tagline}
      </p>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium text-accent opacity-0 transition-all duration-300 [transition-delay:120ms] group-hover:opacity-100">
        Explore
        <span className="lni lni-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </p>
    </Link>
  );
}
