import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

const title = "News + Insights";

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title,
    url: "/insights",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function InsightsPage() {
  return <PlaceholderPage title={title} showFutureArticles />;
}
