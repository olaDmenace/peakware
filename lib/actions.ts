"use server";

import nodemailer from "nodemailer";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors: Partial<Record<"name" | "email" | "message", string>>;
  formError?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// SMTP transport — defaults target Zoho Mail. For Zoho EU accounts use
// smtp.zoho.eu; for ZeptoMail use its SMTP host with user "emailapikey".
const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.zoho.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

// Where discovery-call requests are delivered.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@peakwareconsulting.co.uk";
// Sender must be an address the SMTP account is allowed to send as — for Zoho
// Mail that's the mailbox itself (defaults to SMTP_USER).
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? SMTP_USER ?? TO_EMAIL;

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

  // No SMTP credentials (e.g. local dev): log and accept so the site stays
  // functional. Set SMTP_USER and SMTP_PASSWORD to enable real delivery.
  if (!SMTP_USER || !SMTP_PASSWORD) {
    console.warn(
      "[contact] SMTP not configured — logging submission instead of emailing.",
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
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // SSL on 465, STARTTLS otherwise
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] SMTP send failure", err);
    return {
      status: "error",
      errors: {},
      formError:
        "Something went wrong sending your message. Please email us directly at info@peakwareconsulting.co.uk.",
    };
  }

  return { status: "success", errors: {} };
}
