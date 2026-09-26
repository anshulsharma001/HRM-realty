export const CONTACT = {
  hero: {
    title: "Let's build the next chapter of Sonipat",
    paragraph:
      "Whether you are looking for an industrial opportunity, a commercial space, a future investment or a place to call home, HRM Realty is building for the next generation.",
  },
  cityWhere: {
    lead: "A city where",
    lines: ["People can work.", "People can learn.", "Businesses can grow.", "Families can build their future."],
  },
  details: {
    lead: "Tell us what you are looking for, and our team will help you explore the right opportunity.",
    labels: { phone: "Phone", email: "Email", address: "Corporate Office", hours: "Office Hours" },
    /** Deck value. Flagged as a placeholder number; replace before launch. */
    phone: "+91-9999988888",
    emails: ["info@hrmrealty.com", "sales@hrmrealty.com"],
    address: "D11, Prashant Vihar, Sector 14, Rohini, Delhi – 110085",
    /** Two lines; the deck separates them with a middle dot, which is not rendered. */
    hours: ["Monday–Saturday 9:00 AM–7:00 PM", "Sunday 10:00 AM–5:00 PM"],
  },
} as const;

export const INTERESTS = ["Industrial", "Commercial", "Residential", "Investment Opportunities", "Other"] as const;
export type Interest = (typeof INTERESTS)[number];

/** Field labels exactly as the deck writes them, required marks included. */
export const FORM = {
  fields: {
    firstName: "First Name*",
    lastName: "Last Name*",
    phone: "Phone Number*",
    email: "Email Address*",
    interest: "I am interested in:",
    message: "Message*",
  },
  // Deck says "Submit Enquiry"; changed per the copy guidance that a CTA names what happens. Flagged.
  submit: "Send enquiry",
} as const;

/** Phone as a tel: href (digits and leading plus only). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
