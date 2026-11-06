import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

const title = "Our Story";

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: "/our-story",
  },
  openGraph: {
    title,
    url: "/our-story",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function OurStoryPage() {
  return <PlaceholderPage title={title} />;
}
