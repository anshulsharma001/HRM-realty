import type { Metadata } from "next";
import { Chapter } from "@/components/primitives/Chapter";
import { ContactHero } from "@/components/sections/ContactHero";
import { ACityWhere } from "@/components/sections/ACityWhere";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { CONTACT, FORM } from "@/content";

export const metadata: Metadata = {
  title: `Contact | ${CONTACT.hero.title}`,
  description: `${CONTACT.hero.title} ${CONTACT.cityWhere.lead} ${CONTACT.cityWhere.lines.join(" ")}`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ACityWhere />
      <ContactDetails />
      <Chapter id="enquiry" marker="Enquiry">
        <div className="grid-site gap-y-8">
          <div className="col-span-12 lg:col-start-2 lg:col-span-3">
            <h2 className="type-h2">{FORM.submit}</h2>
          </div>
          <div className="col-span-12 lg:col-start-6 lg:col-span-6">
            <EnquiryForm />
          </div>
        </div>
      </Chapter>
    </>
  );
}
