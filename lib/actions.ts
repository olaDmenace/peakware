"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // Delivery stub: replace with Resend/CRM integration when credentials exist.
  console.log("[contact] discovery call request", {
    name,
    email,
    company,
    message,
  });

  return { status: "success", errors: {} };
}
