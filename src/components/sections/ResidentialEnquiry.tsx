import { Chapter } from "@/components/primitives/Chapter";
import { CONTACT } from "@/content";
import { EnquiryForm } from "./EnquiryForm";

/**
 * No project is attached to this route yet (no name, location, size or HRERA
 * number), so it ends in a registration-interest capture posting to the same
 * endpoint as /contact with interest pre-set to Residential.
 */
export function ResidentialEnquiry() {
  return (
    <Chapter id="enquire" marker="Register interest" tone="ink" temperature="warm">
      <div className="grid-site gap-y-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-4">
          <h2 className="type-h2">{CONTACT.hero.title}</h2>
          <p className="type-body mt-5 text-paper/80">{CONTACT.hero.paragraph}</p>
          <p className="type-body mt-4 text-paper/80">{CONTACT.details.lead}</p>
        </div>
        <div className="col-span-12 lg:col-start-6 lg:col-span-7">
          <EnquiryForm defaultInterest="Residential" source="residential" onInk />
        </div>
      </div>
    </Chapter>
  );
}
