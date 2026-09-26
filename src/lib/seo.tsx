import { CONTACT, SITE, SITE_URL } from "@/content";

/** Organization + LocalBusiness. Registered office is Delhi; service area is Sonipat (§4.8). */
export function organizationJsonLd() {
  const areaServed = [
    { "@type": "City", name: "Sonipat", containedInPlace: { "@type": "State", name: "Haryana" } },
    { "@type": "State", name: "Haryana" },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE.name,
        url: SITE_URL,
        slogan: SITE.tagline,
        foundingDate: "1994",
        founder: { "@type": "Person", "@id": `${SITE_URL}/founder#person`, name: "Hari Parkash Mangla" },
        telephone: CONTACT.details.phone,
        areaServed,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: SITE.name,
        url: SITE_URL,
        telephone: CONTACT.details.phone,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        areaServed,
        knowsAbout: ["Industrial land development", "Commercial development", "Residential development", "Sonipat"],
      },
    ],
  };
}

export function founderJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/founder#person`,
    name: "Hari Parkash Mangla",
    honorificPrefix: "Shri",
    honorificSuffix: "Ji",
    url: `${SITE_URL}/founder`,
    affiliation: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: ["Sonipat industrial development"],
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
