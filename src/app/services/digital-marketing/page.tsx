import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

const title = "Digital Marketing";

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: "/services/digital-marketing",
  },
  openGraph: {
    title,
    url: "/services/digital-marketing",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function DigitalMarketingPage() {
  return <PlaceholderPage title={title} />;
}
