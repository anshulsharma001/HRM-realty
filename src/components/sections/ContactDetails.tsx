import { Chapter } from "@/components/primitives/Chapter";
import { LineIcon } from "@/components/primitives/LineIcon";
import { Placeholder } from "@/components/primitives/Placeholder";
import { CONTACT, image, telHref } from "@/content";
import { iconFor } from "@/content/icons";

/** Phone, emails, office address and hours from the deck, each led by a line icon; the office beside. */
export function ContactDetails() {
  const { lead, labels, phone, emails, address, hours } = CONTACT.details;
  const row = "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 sm:grid-cols-[auto_9rem_1fr]";
  const icon = (label: string) => <LineIcon name={iconFor(label)} className="mt-0.5 h-6 w-6 text-soil" />;
  return (
    <Chapter id="details" marker="Details" pad="tight">
      <div className="grid-site gap-y-10">
        <div className="col-span-12 lg:col-start-2 lg:col-span-4">
          <p className="type-lead">{lead}</p>
          <Placeholder image={image("office-building")} sizes="(min-width: 1024px) 30vw, 100vw" className="mt-8" />
        </div>
        <dl className="col-span-12 flex flex-col gap-y-6 lg:col-start-7 lg:col-span-6">
          <div className={row}>
            {icon(labels.phone)}
            <dt className="type-small text-steel">{labels.phone}</dt>
            <dd className="col-start-2 sm:col-start-3">
              <a href={telHref(phone)} className="link-rule type-h3 tnum">
                {phone}
              </a>
            </dd>
          </div>
          <div className={row}>
            {icon(labels.email)}
            <dt className="type-small text-steel">{labels.email}</dt>
            <dd className="col-start-2 flex flex-col gap-1 sm:col-start-3">
              {emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="link-rule type-h3 self-start">
                  {e}
                </a>
              ))}
            </dd>
          </div>
          <div className={row}>
            {icon(labels.address)}
            <dt className="type-small text-steel">{labels.address}</dt>
            <dd className="col-start-2 type-body sm:col-start-3">{address}</dd>
          </div>
          <div className={row}>
            {icon(labels.hours)}
            <dt className="type-small text-steel">{labels.hours}</dt>
            <dd className="col-start-2 type-body sm:col-start-3">
              {hours.map((h) => (
                <span key={h} className="block">
                  {h}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </Chapter>
  );
}
