import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

const title = "Website Design & Development";

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: "/services/website-design-development",
  },
  openGraph: {
    title,
    url: "/services/website-design-development",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function WebsiteDesignDevelopmentPage() {
  return <PlaceholderPage title={title} />;
}
