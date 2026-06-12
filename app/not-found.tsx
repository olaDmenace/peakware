import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The link may be out of date. Everything we do is reachable from the
        homepage.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-7 py-3.5 font-medium text-ink transition-colors hover:bg-accent-bright"
      >
        Back to home
      </Link>
    </main>
  );
}
