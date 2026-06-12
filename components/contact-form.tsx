"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { submitContact, type ContactState } from "@/lib/actions";

const initialState: ContactState = { status: "idle", errors: {} };

const inputClasses =
  "w-full rounded-xl border keyline bg-surface px-4 py-3 text-sm text-cream placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-2 block text-xs text-accent">{error}</span>
      ) : null}
    </label>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  );

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-accent/40 bg-surface p-8 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Message received
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          Thanks — we&apos;ll be in touch shortly.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          A senior consultant will read your message and reply with a straight
          assessment. No sales script.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={state.errors.name}>
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            className={inputClasses}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" error={state.errors.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClasses}
            placeholder="you@company.co.uk"
          />
        </Field>
      </div>
      <Field label="Company (optional)">
        <input
          name="company"
          type="text"
          autoComplete="organization"
          className={inputClasses}
          placeholder="Company name"
        />
      </Field>
      <Field
        label="What are you trying to build, fix or secure?"
        error={state.errors.message}
      >
        <textarea
          name="message"
          rows={5}
          required
          className={inputClasses}
          placeholder="A sentence or two is plenty."
        />
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary w-full px-7 py-3.5 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Book a discovery call"}
      </button>
    </form>
  );
}
