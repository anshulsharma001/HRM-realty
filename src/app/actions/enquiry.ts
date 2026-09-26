"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { INTERESTS } from "@/content/contact";

export type FieldName = "firstName" | "lastName" | "phone" | "email" | "interest" | "message";

export type EnquiryState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<FieldName, string>> };

const schema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/),
  email: z.email().max(160),
  interest: z.enum(INTERESTS),
  message: z.string().trim().min(1).max(4000),
  company: z.string().max(0), // honeypot: must be empty
  startedAt: z.coerce.number().int().nonnegative(),
  source: z.string().max(40).optional(),
});

/** System strings for the form, not deck copy. Flagged for client approval. */
const FIELD_MESSAGES: Record<FieldName, string> = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  phone: "Enter a phone number.",
  email: "Enter a valid email address.",
  interest: "Choose an interest.",
  message: "Enter a message.",
};

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

async function rateLimited(): Promise<boolean> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const raw = Object.fromEntries(
    (["firstName", "lastName", "phone", "email", "interest", "message", "company", "startedAt", "source"] as const).map((k) => [
      k,
      formData.get(k) ?? "",
    ]),
  );
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<FieldName, string>> = {};
    let botSignal = false;
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "company" || key === "startedAt") botSignal = true;
      else if (typeof key === "string" && key in FIELD_MESSAGES) fieldErrors[key as FieldName] = FIELD_MESSAGES[key as FieldName];
    }
    // Honeypot filled or timing field tampered: answer as if sent, deliver nothing.
    if (botSignal && Object.keys(fieldErrors).length === 0) return { status: "success" };
    return { status: "error", message: "Check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;
  if (Date.now() - data.startedAt < MIN_FILL_MS) return { status: "success" }; // too fast to be a person
  if (await rateLimited()) return { status: "error", message: "Too many enquiries from this connection. Please try again later or call us." };

  const subject = `[${data.interest}] Enquiry from ${data.firstName} ${data.lastName}`;
  const text = [
    `Name: ${data.firstName} ${data.lastName}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Interest: ${data.interest}`,
    data.source ? `Source: ${data.source}` : null,
    "",
    data.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO; // sales@ address: routed by interest in the subject (§4.7)
  const from = process.env.ENQUIRY_FROM ?? "HRM Realty <onboarding@resend.dev>";

  if (apiKey && to) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to, replyTo: data.email, subject, text });
    if (error) return { status: "error", message: "We could not send your enquiry." };
    return { status: "success" };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[enquiry] RESEND_API_KEY / ENQUIRY_TO not set; not delivered:\n" + text);
    return { status: "success" };
  }
  return { status: "error", message: "We could not send your enquiry." };
}
