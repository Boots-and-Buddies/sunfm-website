import type { Metadata } from "next";
import ServiceAreaPage from "@/components/service-area/ServiceAreaPage";
import { serviceAreas } from "@/lib/service-areas";

const area = serviceAreas["cupertino"];
const canonical = `https://www.sunfm.fitness${area.urlPath}`;

export const metadata: Metadata = {
  title: area.metaTitle,
  description: area.metaDescription,
  alternates: { canonical },
  openGraph: {
    title: area.metaTitle,
    description: area.metaDescription,
    type: "website",
    url: canonical,
    images: [
      {
        url: "https://www.sunfm.fitness/images/jeffrey-headshot-final.jpg",
        width: 1200,
        height: 900,
        alt: `Jeffrey Sun, personal trainer serving ${area.city}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: area.metaTitle,
    description: area.metaDescription,
  },
};

export default function Page() {
  return <ServiceAreaPage area={area} />;
}
