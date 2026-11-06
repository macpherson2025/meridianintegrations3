import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

const title = "Hosting and Maintenance";

export const metadata: Metadata = {
  title,
  alternates: {
    canonical: "/services/hosting-maintenance",
  },
  openGraph: {
    title,
    url: "/services/hosting-maintenance",
    siteName: "Meridian Integrations",
    locale: "en_US",
    type: "website",
  },
};

export default function HostingMaintenancePage() {
  return <PlaceholderPage title={title} />;
}
