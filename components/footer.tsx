import Link from "next/link";
import { nav, site } from "@/content/site";
import { services } from "@/content/services";

export function Footer() {
  return (
    <footer className="border-t keyline bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-semibold tracking-tight text-lg">
            Peakware<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {site.oneLiner}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            Services
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  {s.navName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            Company
          </p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t keyline">
        <p className="mx-auto max-w-6xl px-5 py-6 font-mono text-xs text-faint sm:px-8">
          {site.footerTagline}
        </p>
      </div>
    </footer>
  );
}
