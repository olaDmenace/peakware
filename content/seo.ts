import { contact, site } from "@/content/site";

// Reusable structured-data objects (JSON-LD / schema.org).

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/peakware-logo.png`,
  image: `${site.url}/opengraph-image.png`,
  description: site.metaDescription,
  email: contact.email,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "C/O Aacsl Accountant Limited, 1st Floor North Westgate House",
    addressLocality: "Harlow",
    addressRegion: "Essex",
    postalCode: "CM20 1YS",
    addressCountry: "GB",
  },
  areaServed: "GB",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: contact.email,
    telephone: contact.phone,
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};
