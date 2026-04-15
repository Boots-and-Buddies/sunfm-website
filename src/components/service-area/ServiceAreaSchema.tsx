import type { ServiceArea } from "@/lib/service-areas";

const OTHER_CITIES = [
  "San Jose",
  "Sunnyvale",
  "Cupertino",
  "Santa Clara",
  "Mountain View",
  "Campbell",
];

export default function ServiceAreaSchema({ area }: { area: ServiceArea }) {
  const baseUrl = "https://www.sunfm.fitness";
  const pageUrl = `${baseUrl}${area.urlPath}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${pageUrl}#business`,
    name: `SunFM — Personal Trainer in ${area.city}`,
    description: area.metaDescription,
    url: pageUrl,
    image: `${baseUrl}/images/jeffrey-headshot-final.jpg`,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1401 Parkmoor Ave, Suite 100",
      addressLocality: "San Jose",
      addressRegion: "CA",
      postalCode: "95126",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.3115,
      longitude: -121.9192,
    },
    areaServed: OTHER_CITIES.map((name) => ({
      "@type": "City",
      name,
    })),
    sameAs: [
      "https://www.instagram.com/jeffsunfitness/",
      "https://www.yelp.com/biz/sun-functional-movement-san-jose",
      "https://maps.app.goo.gl/XyrnsHXu9K1xYqXw5",
    ],
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${area.city} Personal Trainer`,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
