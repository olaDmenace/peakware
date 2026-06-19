"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors: Partial<Record<"name" | "email" | "message", string>>;
  formError?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Where discovery-call requests are delivered.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@peakwareconsulting.co.uk";
// Must be an address on a domain verified in Resend. The resend.dev sender
// works out of the box for testing; swap for a peakwareconsulting.co.uk
// address once the domain is verified.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Peakware Website <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10)
    errors.message = "Tell us a little more — a sentence or two is plenty.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No key configured (e.g. local dev without secrets): log and accept so the
  // site stays functional. Set RESEND_API_KEY to enable real delivery.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — logging submission instead of emailing.",
      { name, email, company, message }
    );
    return { status: "success", errors: {} };
  }

  const subject = `New discovery call request — ${name}${
    company ? ` (${company})` : ""
  }`;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : "Company: —",
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#10141d">
      <h2 style="margin:0 0 16px">New discovery call request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${company ? escapeHtml(company) : "—"}</p>
      <p style="margin-top:16px"><strong>Message:</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return {
        status: "error",
        errors: {},
        formError:
          "Something went wrong sending your message. Please email us directly at info@peakwareconsulting.co.uk.",
      };
    }
  } catch (err) {
    console.error("[contact] unexpected send failure", err);
    return {
      status: "error",
      errors: {},
      formError:
        "Something went wrong sending your message. Please email us directly at info@peakwareconsulting.co.uk.",
    };
  }

  return { status: "success", errors: {} };
}
