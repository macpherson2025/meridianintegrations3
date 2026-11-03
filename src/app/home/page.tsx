import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";

const title = "Meridian Integrations | Websites, Search, and Marketing";
const description =
  "We design high-performance websites, help businesses get found on Google and AI-powered search, and build marketing and automation solutions that generate leads and support growth.";

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Meridian Integrations",
  description,
  email: "info@meridianintegrations.com",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "CO",
    addressCountry: "US",
  },
  knowsAbout: [
    "Website design",
    "Web development",
    "Search engine optimization",
    "Generative engine optimization",
    "Google Ads",
    "Social media marketing",
    "Business automation",
  ],
};

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function HomeRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <HomePage />
    </>
  );
}
