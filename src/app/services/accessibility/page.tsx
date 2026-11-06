import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

const title = "Accessibility";

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: "/services/accessibility",
  },
  openGraph: {
    title,
    url: "/services/accessibility",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function AccessibilityPage() {
  return <PlaceholderPage title={title} />;
}
