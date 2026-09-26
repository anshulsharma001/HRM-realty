import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
import { Chapter } from "@/components/primitives/Chapter";
import { Rule } from "@/components/primitives/Rule";
import { LineIcon } from "@/components/primitives/LineIcon";
import { CONTACT, FOOTER_COLUMNS, SITE, telHref } from "@/content";
import { iconFor } from "@/content/icons";

export function Footer() {
  const { phone, emails, address } = CONTACT.details;
  const fc = SITE.footerContact;
  const [primaryEmail] = emails;
  return (
    <Chapter as="footer" id="footer" marker="HRM Realty" tone="ink" pad="tight">
      <div className="grid-site gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <Image src="/brand/hrm-wordmark-light.png" alt={SITE.name} width={1200} height={444} className="h-auto w-44 lg:w-52" />
          <p className="type-micro mt-4 uppercase tracking-[0.18em] text-paper/60">{SITE.brand.tagline}</p>
          <p className="type-h2 mt-10 uppercase tracking-[0.01em]">{SITE.brand.names}</p>
          <p className="type-lead mt-3 text-paper/80">{SITE.brand.line}</p>
          <p className="type-body mt-5 max-w-[44ch] text-paper/75">{SITE.brand.paragraph}</p>
        </div>
        <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 lg:col-start-6 lg:col-span-7 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="type-micro text-paper/60">{col.title}</h2>
              <ul className="mt-3 flex flex-col gap-1.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <TransitionLink href={l.href} className="link-rule type-small">
                      {l.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="type-micro text-paper/60">{fc.title}</h2>
            <dl className="mt-3 flex flex-col gap-2.5 type-small">
              <div>
                <dt className="flex items-center gap-2 text-paper/60">
                  <LineIcon name={iconFor(fc.call)} className="h-4 w-4 text-wheat" />
                  {fc.call}
                </dt>
                <dd>
                  <a href={telHref(phone)} className="link-rule tnum">
                    {phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-paper/60">
                  <LineIcon name={iconFor(fc.email)} className="h-4 w-4 text-wheat" />
                  {fc.email}
                </dt>
                <dd>
                  <a href={`mailto:${primaryEmail}`} className="link-rule">
                    {primaryEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-paper/60">
                  <LineIcon name={iconFor(fc.visit)} className="h-4 w-4 text-wheat" />
                  {fc.visit}
                </dt>
                <dd className="text-paper/85">{address}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <Rule className="mt-12" />
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
        <p className="type-small text-paper/80">{SITE.sinceLine}</p>
        <p className="type-micro text-paper/60">{SITE.legal}</p>
      </div>
    </Chapter>
  );
}
